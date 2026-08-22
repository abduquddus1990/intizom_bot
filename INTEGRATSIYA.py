# INTEGRATSIYA QO'LLANMASI — AI Yordamchini mavjud bot.py'ga ulash
# =========================================================================
# Siz loyihani Antigravity'da mustaqil rivojlantirayotganingiz uchun,
# mavjud bot.py'ni to'liq qayta yubormayman — faqat QO'SHISH kerak bo'lgan
# qismlarni ko'rsataman. O'zingizning bot.py'ingizga shu qismlarni moslab
# kiriting.

# 1) .env fayliga qo'shing:
#    AI_ASSISTANT_WEBAPP_URL=https://sizning-domen.uz/ai_chat.html
#    AI_ASSISTANT_DAILY_LIMIT=30

# 2) bot.py'dagi build_main_menu() funksiyasiga (yoki unga o'xshash joyga)
#    yangi tugma qo'shing:
"""
from aiogram.types import WebAppInfo

AI_ASSISTANT_WEBAPP_URL = os.getenv("AI_ASSISTANT_WEBAPP_URL")

# build_main_menu() ichida, boshqa tugmalar qatorida:
if has_permission(role, "ai_assistant"):  # faqat manager/admin uchun tavsiya etiladi
    buttons.append([InlineKeyboardButton(
        text="🤖 AI Yordamchi",
        web_app=WebAppInfo(url=AI_ASSISTANT_WEBAPP_URL),
    )])
"""

# 3) ROLE_PERMISSIONS lug'atiga yangi ruxsat qo'shing:
"""
ROLE_PERMISSIONS = {
    ROLE_MANAGER: {..., "ai_assistant"},
    ROLE_ADMIN: {..., "ai_assistant"},
    # deputy/hr uchun QO'SHMASLIK tavsiya etiladi — chunki AI Yordamchi
    # to'liq moliyaviy/shaxsiy xodim ma'lumotiga kirish huquqiga ega
}
"""

# 4) ai_backend.py'ni ALOHIDA jarayon sifatida ishga tushiring (bot.py bilan
#    bir vaqtda, lekin alohida port'da):
#    python ai_backend.py
#    Bu — Telegram Mini App talab qiladigan HTTPS manzilga ega bo'lishi
#    kerak (Nginx + SSL orqali proxy qilish tavsiya etiladi).

# 5) ai_assistant_schema.sql'ni Supabase'da ishga tushiring (yangi jadvallar
#    uchun).

# 6) ai_chat.html ichidagi API_BASE o'zgaruvchisini haqiqiy backend
#    domeningizga almashtiring.
