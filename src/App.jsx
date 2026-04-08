import React, { useMemo, useState } from 'react'
import { MoonStar, Sparkles, Search, RotateCcw, Brain, SendHorizontal, BookOpen, UserRound } from 'lucide-react'

const thematicData = {
  sabar: [
    {
      surah: 'QS. Al-Baqarah: 153',
      text: 'Sesungguhnya Allah beserta orang-orang yang sabar.',
      lesson: 'Ayat ini menegaskan bahwa sabar bukan pasif, tetapi kekuatan untuk tetap taat, tenang, dan bertahan dalam ujian.'
    },
    {
      surah: 'QS. Az-Zumar: 10',
      text: 'Hanya orang-orang yang bersabarlah yang disempurnakan pahalanya tanpa batas.',
      lesson: 'Sabar memiliki nilai spiritual yang sangat tinggi karena melatih iman, konsistensi, dan pengendalian diri.'
    }
  ],
  rezeki: [
    {
      surah: 'QS. At-Talaq: 2-3',
      text: 'Barangsiapa bertakwa kepada Allah niscaya Dia akan membukakan jalan keluar dan memberinya rezeki dari arah yang tidak disangka-sangka.',
      lesson: 'Rezeki berkaitan erat dengan takwa, ikhtiar, dan tawakal.'
    },
    {
      surah: 'QS. Hud: 6',
      text: 'Tidak satu pun makhluk bergerak di bumi melainkan semuanya dijamin Allah rezekinya.',
      lesson: 'Ayat ini menumbuhkan rasa tenang bahwa Allah mengetahui kebutuhan seluruh makhluk-Nya.'
    }
  ],
  ilmu: [
    {
      surah: "QS. Al-'Alaq: 1-5",
      text: 'Bacalah dengan nama Tuhanmu yang menciptakan.',
      lesson: 'Wahyu pertama menekankan pentingnya membaca, belajar, dan mencari ilmu sebagai fondasi peradaban.'
    },
    {
      surah: 'QS. Taha: 114',
      text: 'Ya Tuhanku, tambahkanlah kepadaku ilmu.',
      lesson: 'Doa ini menunjukkan bahwa ilmu harus dicari dengan rendah hati dan terus-menerus.'
    }
  ],
  syukur: [
    {
      surah: 'QS. Ibrahim: 7',
      text: 'Jika kamu bersyukur, niscaya Aku akan menambah nikmat kepadamu.',
      lesson: 'Syukur bukan hanya ucapan, tetapi kesadaran dan penggunaan nikmat untuk kebaikan.'
    }
  ]
}

const ayahData = {
  'al-baqarah 3': {
    surah: 'QS. Al-Baqarah: 3',
    translation: 'Mereka beriman kepada yang gaib, mendirikan salat, dan menginfakkan sebagian rezeki yang Kami berikan.',
    tafsir: 'Ayat ini menjelaskan ciri orang bertakwa: memiliki iman pada perkara gaib, menjaga ibadah, dan peduli sosial melalui infak.',
    wisdom: [
      'Iman melahirkan kepatuhan.',
      'Salat menjaga hubungan dengan Allah.',
      'Infak menumbuhkan kepedulian kepada sesama.'
    ]
  },
  'al-ikhlas': {
    surah: 'QS. Al-Ikhlas: 1-4',
    translation: 'Katakanlah: Dialah Allah Yang Maha Esa.',
    tafsir: 'Surah ini menegaskan tauhid yang murni: Allah Esa, tempat bergantung, tidak beranak, dan tidak diperanakkan.',
    wisdom: [
      'Tauhid adalah inti ajaran Islam.',
      'Allah tidak menyerupai makhluk.',
      'Kebergantungan tertinggi hanya kepada Allah.'
    ]
  }
}

const motivationRules = [
  {
    keywords: ['capek', 'lelah', 'letih'],
    title: 'Untuk hati yang sedang lelah',
    ayah: 'QS. Al-Insyirah: 5-6',
    text: 'Karena sesungguhnya bersama kesulitan ada kemudahan.',
    message: 'Rasa lelah tidak selalu berarti gagal. Dalam Islam, setiap proses, kesabaran, dan niat baik bernilai di sisi Allah.'
  },
  {
    keywords: ['cemas', 'takut', 'khawatir'],
    title: 'Untuk rasa cemas',
    ayah: "QS. Ar-Ra'd: 28",
    text: 'Ingatlah, hanya dengan mengingat Allah hati menjadi tenteram.',
    message: 'Saat pikiran terasa penuh, kembalilah pada dzikir, doa, dan langkah kecil yang bisa kamu lakukan hari ini.'
  },
  {
    keywords: ['sedih', 'galau', 'kecewa'],
    title: 'Untuk hati yang sedih',
    ayah: 'QS. Yusuf: 87',
    text: 'Janganlah kamu berputus asa dari rahmat Allah.',
    message: 'Islam mengajarkan harapan. Kesedihan boleh dirasakan, tetapi jangan sampai mematikan harap pada rahmat Allah.'
  }
]

function detectTopic(input) {
  const lower = input.toLowerCase()
  const candidates = ['sabar', 'rezeki', 'ilmu', 'syukur', 'capek', 'cemas', 'sedih', 'al-baqarah', 'al-ikhlas', 'penciptaan manusia']
  return candidates.find((item) => lower.includes(item)) || input.split(' ').slice(0, 3).join(' ')
}

function formatResponse({ mode, style, detail }, input) {
  const lower = input.toLowerCase()

  if (mode === 'tafsir') {
    const entry = Object.entries(ayahData).find(([key]) => lower.includes(key))
    if (!entry) {
      return 'Aku belum menemukan ayat spesifik itu di basis data demo ini. Coba gunakan contoh seperti: "Jelaskan QS Al-Baqarah ayat 3" atau "Jelaskan QS Al-Ikhlas".'
    }
    const data = entry[1]
    const prefix = style === 'islami'
      ? 'Bismillah, berikut penjelasan singkatnya.'
      : style === 'formal'
      ? 'Berikut penjelasan ayat yang dimaksud.'
      : 'Yuk kita bahas ayatnya dengan sederhana.'
    const extra = detail === 'mendalam'
      ? `\n\nPelajaran utama:\n- ${data.wisdom.join('\n- ')}`
      : `\n\nHikmah: ${data.wisdom[0]}`
    return `${prefix}\n\n${data.surah}\nTerjemahan: ${data.translation}\n\nTafsir ringkas: ${data.tafsir}${extra}\n\nRekomendasi lanjutan: coba telusuri juga tema iman, salat, atau infak.`
  }

  if (mode === 'tematik') {
    const topic = Object.keys(thematicData).find((key) => lower.includes(key))
    if (!topic) {
      return 'Untuk mode tematik, coba topik yang tersedia di demo ini: sabar, rezeki, ilmu, atau syukur.'
    }
    const items = thematicData[topic]
    const intro = style === 'santai'
      ? `Ini beberapa ayat tentang ${topic} yang bisa kamu pelajari:`
      : `Berikut beberapa ayat yang relevan dengan tema ${topic}:`
    const body = items.map((item, index) => `${index + 1}. ${item.surah} — ${item.text}\n   - ${item.lesson}`).join('\n')
    const summary = detail === 'mendalam'
      ? `\n\nKesimpulan tema: Dalam Al-Qur'an, ${topic} tidak hanya dipahami sebagai konsep, tetapi juga sebagai sikap hidup yang membentuk hubungan manusia dengan Allah dan sesama.`
      : `\n\nKesimpulan singkat: Tema ${topic} berkaitan erat dengan keimanan dan sikap hidup sehari-hari.`
    return `${intro}\n\n${body}${summary}\n\nAyat lanjutan yang direkomendasikan: telusuri juga topik syukur, tawakal, dan istiqamah.`
  }

  if (mode === 'motivasi') {
    const match = motivationRules.find((rule) => rule.keywords.some((kw) => lower.includes(kw)))
    if (!match) {
      return 'Ceritakan kondisimu dengan kata sederhana seperti capek, cemas, atau sedih, lalu aku akan memberi ayat dan motivasi yang sesuai.'
    }
    const opening = style === 'islami'
      ? 'Semoga Allah menguatkan hatimu. Ini ayat yang bisa menjadi pengingat.'
      : 'Ini pesan yang mungkin bisa menguatkan kamu.'
    return `${opening}\n\n${match.title}\n${match.ayah}\n"${match.text}"\n\n${match.message}\n\nLangkah kecil hari ini: tarik napas, istighfar, lalu fokus pada satu hal baik yang bisa kamu selesaikan.`
  }

  return `Dalam mode refleksi, TafsirAI membantu menjelaskan hubungan tema ayat dengan refleksi ilmiah secara sederhana, tanpa mengklaim sebagai tafsir ilmiah final. Coba tanyakan: "Jelaskan penciptaan manusia dalam Al-Qur'an" atau "ayat tentang alam semesta".`
}

const initialMessage = {
  role: 'assistant',
  content: "Assalamu'alaikum. Aku TafsirAI, chatbot edukasi Al-Qur'an untuk membantu pencarian ayat tematik, penjelasan ayat, motivasi Islami, dan refleksi kontekstual. Pilih mode di kiri lalu mulai bertanya."
}

export default function App() {
  const [mode, setMode] = useState('tematik')
  const [style, setStyle] = useState('islami')
  const [detail, setDetail] = useState('sedang')
  const [memoryOn, setMemoryOn] = useState(true)
  const [input, setInput] = useState('')
  const [memory, setMemory] = useState({ lastTopic: '', preferences: {} })
  const [messages, setMessages] = useState([initialMessage])

  const quickPrompts = useMemo(() => [
    'Ayat tentang sabar',
    'Jelaskan QS Al-Baqarah ayat 3',
    'Saya sedang capek',
    "Jelaskan penciptaan manusia dalam Al-Qur'an"
  ], [])

  function sendMessage(customText) {
    const text = (customText ?? input).trim()
    if (!text) return

    const nextTopic = detectTopic(text)
    const nextMemory = memoryOn
      ? { lastTopic: nextTopic, preferences: { mode, style, detail } }
      : { lastTopic: '', preferences: {} }

    const response = formatResponse({ mode, style, detail }, text)
    setMessages((prev) => [...prev, { role: 'user', content: text }, { role: 'assistant', content: response }])
    setMemory(nextMemory)
    setInput('')
  }

  function resetAll() {
    setMessages([{
      role: 'assistant',
      content: 'Riwayat percakapan direset. Silakan mulai lagi dengan pertanyaan baru tentang ayat, tema, atau kondisi yang sedang kamu rasakan.'
    }])
    setMemory({ lastTopic: '', preferences: {} })
    setInput('')
  }

  return (
    <div className="app-shell">
      <aside className="sidebar card">
        <div className="brand-row">
          <div className="logo-box"><MoonStar size={24} /></div>
          <div>
            <h1>TafsirAI</h1>
            <p>Chatbot edukasi Al-Qur'an</p>
          </div>
        </div>

        <div className="field-group">
          <label>Mode Interaktif</label>
          <select value={mode} onChange={(e) => setMode(e.target.value)}>
            <option value="tafsir">Tafsir Ayat</option>
            <option value="tematik">Tematik</option>
            <option value="motivasi">Motivasi</option>
            <option value="refleksi">Refleksi</option>
          </select>
        </div>

        <div className="field-group">
          <label>Gaya Bahasa</label>
          <select value={style} onChange={(e) => setStyle(e.target.value)}>
            <option value="islami">Bernuansa Islami</option>
            <option value="santai">Santai</option>
            <option value="formal">Formal</option>
          </select>
        </div>

        <div className="field-group">
          <label>Tingkat Detail</label>
          <select value={detail} onChange={(e) => setDetail(e.target.value)}>
            <option value="singkat">Singkat</option>
            <option value="sedang">Sedang</option>
            <option value="mendalam">Mendalam</option>
          </select>
        </div>

        <div className="memory-box">
          <div>
            <strong>Memory sesi</strong>
            <p>Simpan topik terakhir dan preferensi pengguna</p>
          </div>
          <button className={`toggle-btn ${memoryOn ? 'on' : ''}`} onClick={() => setMemoryOn(!memoryOn)}>
            <Brain size={16} /> {memoryOn ? 'Aktif' : 'Nonaktif'}
          </button>
        </div>

        <div className="memory-summary">
          <div className="summary-head"><Search size={16} /> Topik terakhir</div>
          <div className="topic-value">{memory.lastTopic || 'Belum ada'}</div>
          <div className="badge-row">
            <span>{mode}</span>
            <span>{style}</span>
            <span>{detail}</span>
          </div>
        </div>

        <button className="ghost-btn" onClick={resetAll}>
          <RotateCcw size={16} /> Reset Percakapan
        </button>
      </aside>

      <main className="chat-panel card">
        <div className="chat-topbar">
          <div>
            <h2><Sparkles size={20} /> TafsirAI Workspace</h2>
            <p>Eksplorasi ayat, tema, motivasi, dan refleksi Al-Qur'an secara interaktif.</p>
          </div>
          <div className="quick-prompts">
            {quickPrompts.map((prompt) => (
              <button key={prompt} className="chip" onClick={() => sendMessage(prompt)}>{prompt}</button>
            ))}
          </div>
        </div>

        <div className="message-area">
          {messages.map((message, index) => (
            <div key={index} className={`message-row ${message.role}`}>
              <div className={`message-bubble ${message.role}`}>
                <div className="message-meta">
                  {message.role === 'assistant' ? <BookOpen size={14} /> : <UserRound size={14} />}
                  <span>{message.role === 'assistant' ? 'TafsirAI' : 'Pengguna'}</span>
                </div>
                <div className="message-text">{message.content}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="input-panel">
          <div className="input-row">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Tulis pertanyaan, misalnya: Ayat tentang sabar"
            />
            <button className="send-btn" onClick={() => sendMessage()}>
              <SendHorizontal size={18} /> Kirim
            </button>
          </div>
          <p className="disclaimer">
            Disclaimer: demo ini adalah chatbot edukasi untuk pembelajaran Al-Qur'an. Jawaban bersifat informatif dan ringkas, bukan pengganti rujukan kepada ulama atau kitab tafsir otoritatif.
          </p>
        </div>
      </main>
    </div>
  )
}
