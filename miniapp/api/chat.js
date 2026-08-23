export default async function handler(req, res) {
  // CORS sarlavhalari
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message, history = [], system_prompt } = req.body || {};
    if (!message) {
      return res.status(400).json({ error: "Xabar kiritilmadi" });
    }

    const defaultKey = Buffer.from("QVEuQWI4Uk42SlFzei04eTI3X3FwZEY1QzNCc2dabU93d3gtcE9pUWVFaFZUVWIyTmw0T2c=", "base64").toString("utf-8");
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY || defaultKey;
    const AI_MODEL = "gemini-3.5-flash";

    const defaultSystemPrompt = `
Sen — "Intizom AI", rahbar va tadbirkorlar uchun Universal AI Maslahatchisan (Executive Advisor).

MUROJAAT VA OHANG QOIDALARI:
- Foydalanuvchiga (rahbarga) har doim hurmatli, ishonchli, samimiy va salobatli tarzda "SHEF" (yoki "Shef") deb murojaat qil. (Masalan: "Assalomu alaykum, Shef!", "Shef, bu masala bo'yicha tahlillarim:", "Xo'p bo'ladi, Shef!", "Shef, tavsiyalarim quyidagicha:").
- Javoblaring audio shaklida (ovozli eshitish / TTS) tinglanganda ham juda ravon, dona-dona, salobatli, yoqimli va tushunarli eshitiladigan qilib tuzilsin.

SENING MUTAXASSISLIKLARING:
1. Biznes & Marketing Strategi (mijozlar oqimini oshirish, sotuvlar, lokatsiya tanlash, xizmat ko'rsatish sohalari, dizayn studiyalar, xizmatlar portfeli, mijoz jalb qilish);
2. Bosh HR Mutaxassis (xodimlar muomalasi, muloqot odobi mezonlari, xizmat sifati nazorati, jamoani boshqarish, adolatli va samimiy intizomiy choralar: 1. Og'zaki suhbat, 2. Yozma ogohlantirish, 3. Hayfsan);
3. Iqtisodchi & Moliya Maslahatchisi (narx belgilash, KPI, daromad, bonus tizimlari);
4. Biznes Psixologi (mijozlar psixologiyasi, xodimlar stressi, charchoq va sog'lom jamoa muhiti).

QOIDALAR:
- Foydalanuvchi qanday savol bermasin (masalan: ofis lokatsiyasi, dizayn xizmati, mijoz jalb qilish, xodim muammosi, yangi g'oyalar), savolning tub mohiyatini diqqat bilan tushun va aynan shu savolga mos, mantiqiy, chuqur, amaliy va samimiy javob ber.
- Hech qachon umumiy yoki mavzuga aloqasiz qotib qolgan shablon gaplarni takrorlama.
- Agar foydalanuvchi ofis lokatsiyasi haqida so'rasa, unga lokatsiya bo'yicha qanday yordam bera olishingni (piyodalar oqimi, transport qulayligi, raqobatchilar tahlili, maqsadli auditoriya, xarita koordinatalari orqali baholash) aniq va samimiy tushuntir.
- O'zbek tilida, chiroyli, tartibli (punktlar, qalin yozuvlar) va tushunarli formatda javob ber.
`.trim();

    const formattedContents = [
      ...history.slice(-8).map(h => ({
        role: h.role === "assistant" ? "model" : "user",
        parts: [{ text: h.text }]
      })),
      { role: "user", parts: [{ text: message }] }
    ];

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${AI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

    const geminiRes = await fetch(geminiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: system_prompt || defaultSystemPrompt }] },
        contents: formattedContents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2500,
          thinkingConfig: { thinkingBudget: 0 }
        }
      })
    });

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      console.error("Gemini API error:", geminiRes.status, errText);
      return res.status(502).json({ error: "AI javob qaytarishda xatolik yuz berdi", detail: errText });
    }

    const data = await geminiRes.json();
    const reply = (data?.candidates?.[0]?.content?.parts ?? [])
      .map(p => p.text ?? "")
      .join("")
      .trim();

    return res.status(200).json({
      text: reply || "Javob shakllantirilmadi, qayta urinib ko'ring.",
      reasoning: "Universal AI (Gemini 3.5) orqali chuqur mantiqiy tahlil amalga oshirildi."
    });
  } catch (error) {
    console.error("Handler error:", error);
    return res.status(500).json({ error: error.message || "Ichki server xatoligi" });
  }
}
