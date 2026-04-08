# TafsirAI – Chatbot Edukasi Tafsir & Tematik Al-Qur'an Berbasis AI

TafsirAI adalah project chatbot edukasi yang membantu pengguna memahami Al-Qur'an secara lebih mudah, interaktif, dan kontekstual. Aplikasi ini dirancang untuk use case pendidikan Islam, dengan fokus pada pencarian ayat tematik, penjelasan ayat, motivasi Islami, dan refleksi kontekstual.

## Fitur Utama
- **Tafsir Ayat**: Menjelaskan ayat tertentu dengan terjemahan, tafsir ringkas, dan hikmah.
- **Tafsir Tematik**: Menampilkan ayat-ayat berdasarkan tema seperti sabar, rezeki, ilmu, dan syukur.
- **Motivasi Islami**: Memberikan ayat dan penguatan saat pengguna merasa lelah, cemas, atau sedih.
- **Refleksi Kontekstual**: Menjelaskan hubungan tema ayat dengan refleksi ilmiah secara sederhana.
- **Memory Sesi**: Menyimpan topik terakhir dan preferensi user selama percakapan.

## Parameter Kreatif
- **Gaya Bahasa**: santai, formal, bernuansa Islami
- **Kedalaman Jawaban**: singkat, sedang, mendalam
- **Mode Interaktif**: tafsir, tematik, motivasi, refleksi
- **Personalisasi**: memory sederhana berbasis sesi

## Teknologi
- React + Vite
- CSS custom
- Lucide React icons

## Cara Menjalankan
```bash
npm install
npm run dev
```

Lalu buka URL lokal yang muncul di terminal, biasanya `http://localhost:5173`.

## Contoh Prompt
- `Ayat tentang sabar`
- `Jelaskan QS Al-Baqarah ayat 3`
- `Saya sedang capek`
- `Jelaskan penciptaan manusia dalam Al-Qur'an`

## Catatan
Versi ini adalah **demo frontend interaktif** dengan knowledge base lokal agar bisa langsung dicoba tanpa API key. Kalau ingin benar-benar memakai model LLM, kamu bisa lanjutkan dengan integrasi OpenAI API, Gemini API, atau Hugging Face API pada backend.

## Disclaimer
TafsirAI adalah chatbot edukasi untuk pembelajaran Al-Qur'an. Jawaban yang diberikan bersifat informatif dan ringkas, bukan pengganti rujukan kepada ulama, guru, atau kitab tafsir otoritatif.
