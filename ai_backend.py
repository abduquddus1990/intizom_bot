"""
ai_backend.py
-------------
"AI Yordamchi" Mini App uchun backend API. FastAPI orqali ishlaydi,
bot.py'dan MUSTAQIL jarayon sifatida ishga tushiriladi (yoki bot.py bilan
bir jarayonda, agar aiogram+FastAPI'ni birlashtirsangiz — buni loyihangiz
tuzilishiga qarab moslashtiring).

VAZIFASI:
- Mini App'dan (webapp/ai_chat.html) kelayotgan xabarlarni qabul qilish
  (matn, ovoz, rasm, video)
- Telegram WebApp initData orqali foydalanuvchini xavfsiz tasdiqlash
- Kunlik xabar limitini nazorat qilish
- Gemini'ga (ko'p modalli) so'rov yuborish, javob olish
- Agar so'ralsa, javobni ovozga aylantirish (gTTS)
- Suhbat tarixini Supabase'ga saqlash

O'RNATISH:
    pip install fastapi uvicorn python-multipart gTTS google-generativeai
    python ai_backend.py   # yoki: uvicorn ai_backend:app --host 0.0.0.0 --port 8080
"""

import os
import io
import json
import hmac
import hashlib
import logging
from datetime import date, datetime
from urllib.parse import parse_qsl

from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, FileResponse
from gtts import gTTS
import google.generativeai as genai
from supabase import create_client, Client

from ai_assistant_prompt import AI_ASSISTANT_SYSTEM_PROMPT

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

BOT_TOKEN = os.getenv("BOT_TOKEN")
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# TZ (yangi bo'lim): kunlik xabar limiti — xarajatni nazorat qilish uchun.
# Kelishilganidek: hozircha 30/kun, mijozlar soniga qarab keyin o'zgartiriladi.
AI_ASSISTANT_DAILY_LIMIT = int(os.getenv("AI_ASSISTANT_DAILY_LIMIT", "30"))

TTS_AUDIO_DIR = "./tts_cache"
os.makedirs(TTS_AUDIO_DIR, exist_ok=True)

genai.configure(api_key=GEMINI_API_KEY)
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

app = FastAPI(title="AI Yordamchi Backend")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # PRODUCTION'DA: faqat Mini App domenini ko'rsating
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================================================================
# TELEGRAM WEBAPP AUTENTIFIKATSIYASI
# =========================================================================
# Mini App har bir so'rovda Telegram.WebApp.initData'ni yuboradi. Buni
# bot tokeni bilan HMAC orqali tekshirib, haqiqatan Telegram tomonidan
# yuborilganini (soxta bo'lmaganini) tasdiqlaymiz — xavfsizlik uchun MUHIM.

def validate_telegram_init_data(init_data: str) -> dict:
    """
    Telegram'ning rasmiy tasdiqlash algoritmi. Muvaffaqiyatli bo'lsa,
    foydalanuvchi ma'lumotlarini (jumladan telegram_id) qaytaradi.
    Muvaffaqiyatsiz bo'lsa, HTTPException(401) chiqaradi.
    """
    try:
        parsed = dict(parse_qsl(init_data))
        received_hash = parsed.pop("hash", None)
        if not received_hash:
            raise ValueError("hash yo'q")

        data_check_string = "\n".join(f"{k}={v}" for k, v in sorted(parsed.items()))
        secret_key = hmac.new(b"WebAppData", BOT_TOKEN.encode(), hashlib.sha256).digest()
        computed_hash = hmac.new(secret_key, data_check_string.encode(), hashlib.sha256).hexdigest()

        if not hmac.compare_digest(computed_hash, received_hash):
            raise ValueError("hash mos kelmadi")

        user_data = json.loads(parsed.get("user", "{}"))
        return user_data
    except Exception:
        logger.exception("Telegram initData tasdiqlanmadi")
        raise HTTPException(status_code=401, detail="Autentifikatsiya muvaffaqiyatsiz")


# =========================================================================
# KUNLIK LIMIT NAZORATI
# =========================================================================

def check_and_increment_daily_limit(telegram_id: int) -> tuple[bool, int]:
    """
    Qaytaradi: (ruxsat_bormi, qolgan_limit).
    TZ (yangi bo'lim): kunlik AI_ASSISTANT_DAILY_LIMIT dan oshsa, False.
    """
    today = date.today().isoformat()
    result = supabase.table("ai_chat_usage").select("*").eq(
        "telegram_id", telegram_id
    ).eq("usage_date", today).execute()

    if result.data:
        current_count = result.data[0]["message_count"]
        if current_count >= AI_ASSISTANT_DAILY_LIMIT:
            return False, 0
        new_count = current_count + 1
        supabase.table("ai_chat_usage").update({"message_count": new_count}).eq(
            "telegram_id", telegram_id
        ).eq("usage_date", today).execute()
        return True, AI_ASSISTANT_DAILY_LIMIT - new_count
    else:
        supabase.table("ai_chat_usage").insert({
            "telegram_id": telegram_id, "usage_date": today, "message_count": 1,
        }).execute()
        return True, AI_ASSISTANT_DAILY_LIMIT - 1


# =========================================================================
# RAHBAR BIZNESI HAQIDA KONTEKST YIG'ISH (oddiy RAG)
# =========================================================================

def build_business_context(telegram_id: int) -> str:
    """
    So'nggi 7 kunlik xodimlar, baholar, bonuslar bo'yicha qisqa xulosani
    yig'ib, AI'ga kontekst sifatida beriladigan matn shakliga keltiradi.
    ESLATMA: bu — oddiy, "so'nggi ma'lumotlarni yig'ish" darajasidagi RAG.
    Kelajakda vektor qidiruv (embeddings) qo'shilishi mumkin.
    """
    try:
        employees = supabase.table("employee_performance").select("*").execute()
        emp_lines = [
            f"- {e['full_name']}: {e.get('total_conversations', 0)} suhbat, "
            f"o'rtacha ball {e.get('avg_score', '—')}"
            for e in (employees.data or [])[:20]
        ]
        return "SO'NGGI XODIMLAR STATISTIKASI:\n" + "\n".join(emp_lines) if emp_lines else ""
    except Exception:
        logger.exception("Biznes kontekstini yig'ishda xatolik")
        return ""


# =========================================================================
# ASOSIY ENDPOINT — XABAR YUBORISH
# =========================================================================

@app.post("/api/ai-chat/message")
async def send_message(
    init_data: str = Form(...),
    text: str | None = Form(None),
    want_voice_response: bool = Form(False),
    file: UploadFile | None = File(None),
):
    user = validate_telegram_init_data(init_data)
    telegram_id = user["id"]

    allowed, remaining = check_and_increment_daily_limit(telegram_id)
    if not allowed:
        raise HTTPException(
            status_code=429,
            detail=f"Kunlik limit ({AI_ASSISTANT_DAILY_LIMIT} xabar) tugadi. Ertaga qayta urinib ko'ring.",
        )

    # --- Kiruvchi kontent turini aniqlash va Gemini uchun tayyorlash ---
    gemini_parts = []
    user_text_for_history = text or ""

    if file is not None:
        file_bytes = await file.read()
        mime = file.content_type or ""

        if mime.startswith("audio/"):
            # Ovozli xabar — avval matnga o'giramiz (mavjud transcribe.py'dagi
            # kabi faster-whisper ishlatilishi mumkin; bu yerda soddalik
            # uchun to'g'ridan-to'g'ri Gemini'ga audio sifatida beramiz —
            # Gemini audio inputni to'g'ridan-to'g'ri qabul qila oladi).
            gemini_parts.append({"mime_type": mime, "data": file_bytes})
            user_text_for_history = user_text_for_history or "[ovozli xabar]"
        elif mime.startswith("image/"):
            gemini_parts.append({"mime_type": mime, "data": file_bytes})
            user_text_for_history = user_text_for_history or "[rasm]"
        elif mime.startswith("video/"):
            gemini_parts.append({"mime_type": mime, "data": file_bytes})
            user_text_for_history = user_text_for_history or "[video]"
        else:
            raise HTTPException(status_code=400, detail="Qo'llab-quvvatlanmaydigan fayl turi")

    if text:
        gemini_parts.append(text)

    if not gemini_parts:
        raise HTTPException(status_code=400, detail="Matn yoki fayl yuborilishi shart")

    # --- Kontekst (oddiy RAG) qo'shish ---
    context = build_business_context(telegram_id)
    system_with_context = AI_ASSISTANT_SYSTEM_PROMPT
    if context:
        system_with_context += f"\n\n===========================================================================\nJORIY BIZNES MA'LUMOTLARI (kontekst):\n{context}\n==========================================================================="

    # --- Gemini so'rovi ---
    model = genai.GenerativeModel(
        model_name="gemini-2.5-flash",
        system_instruction=system_with_context,
    )
    response = model.generate_content(gemini_parts)
    ai_text = response.text.strip()

    # --- Suhbat tarixini saqlash ---
    supabase.table("ai_chat_messages").insert([
        {"telegram_id": telegram_id, "role": "user", "content_type": "mixed", "text_content": user_text_for_history},
        {"telegram_id": telegram_id, "role": "assistant", "content_type": "text", "text_content": ai_text},
    ]).execute()

    # --- Ovozli javob (ixtiyoriy, gTTS orqali) ---
    audio_url = None
    if want_voice_response:
        audio_url = await _generate_tts(ai_text, telegram_id)

    return JSONResponse({
        "text": ai_text,
        "audio_url": audio_url,
        "remaining_today": remaining,
    })


async def _generate_tts(text: str, telegram_id: int) -> str | None:
    """
    gTTS orqali ovozli javob yaratadi. ESLATMA: gTTS'da o'zbek tili rasmiy
    qo'llab-quvvatlanmaydi — hozircha rus tilidagi talaffuz bilan o'qiladi
    (matn o'zbekcha bo'lsa ham). Sifat cheklangan — kelishilganidek, bu
    boshlang'ich (bepul) yechim, kelajakda maxsus o'zbekcha TTS xizmatiga
    (masalan Aisha AI) o'tish mumkin.
    """
    try:
        tts = gTTS(text=text, lang="ru")
        filename = f"{telegram_id}_{int(datetime.now().timestamp())}.mp3"
        filepath = os.path.join(TTS_AUDIO_DIR, filename)
        tts.save(filepath)
        return f"/api/ai-chat/audio/{filename}"
    except Exception:
        logger.exception("TTS yaratishda xatolik")
        return None


@app.get("/api/ai-chat/audio/{filename}")
async def get_audio(filename: str):
    filepath = os.path.join(TTS_AUDIO_DIR, filename)
    if not os.path.exists(filepath):
        raise HTTPException(status_code=404, detail="Fayl topilmadi")
    return FileResponse(filepath, media_type="audio/mpeg")


# =========================================================================
# SUHBAT TARIXI VA SOZLAMALAR
# =========================================================================

@app.get("/api/ai-chat/history")
async def get_history(init_data: str, limit: int = 50):
    user = validate_telegram_init_data(init_data)
    telegram_id = user["id"]

    result = supabase.table("ai_chat_messages").select("*").eq(
        "telegram_id", telegram_id
    ).order("created_at", desc=True).limit(limit).execute()

    return JSONResponse({"messages": list(reversed(result.data))})


@app.get("/api/ai-chat/usage")
async def get_usage(init_data: str):
    user = validate_telegram_init_data(init_data)
    telegram_id = user["id"]

    today = date.today().isoformat()
    result = supabase.table("ai_chat_usage").select("message_count").eq(
        "telegram_id", telegram_id
    ).eq("usage_date", today).execute()

    used = result.data[0]["message_count"] if result.data else 0
    return JSONResponse({
        "used_today": used,
        "daily_limit": AI_ASSISTANT_DAILY_LIMIT,
        "remaining": max(0, AI_ASSISTANT_DAILY_LIMIT - used),
    })


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)

# ---------------------------------------------------------------------------
# INTEGRATSIYA ESLATMASI: bu backend HTTPS orqali ochiq bo'lishi kerak
# (Telegram Mini App talabi). Production'da bu server orqasida Nginx +
# Let's Encrypt SSL sertifikati bilan ishga tushirilishi tavsiya etiladi.
# CORS sozlamasini ("allow_origins") production'da albatta faqat Mini
# App domeningizga cheklang — hozir "*" faqat rivojlantirish uchun.
# ---------------------------------------------------------------------------
