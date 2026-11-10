# NAVIPUS — Campus Guide Copilot

NAVIPUS (Campus Guide Copilot) adalah asisten AI untuk membantu mahasiswa mendapatkan informasi seputar lingkungan kampus melalui percakapan.

NAVIPUS menggabungkan AI, database kampus, dan Knowledge Base berbasis RAG agar mahasiswa dapat memperoleh informasi akademik, navigasi kampus, dan layanan mahasiswa dalam satu aplikasi.

## 

NAVIPUS berfokus pada tiga area utama:

1. **Akademik**
   - Informasi KRS
   - Dosen wali
   - Jadwal kuliah
   - Informasi akademik mahasiswa
   - Prosedur dan peraturan akademik

2. **Navigasi Kampus**
   - Informasi gedung
   - Ruangan dan laboratorium
   - Lokasi kampus
   - Informasi fasilitas

3. **Layanan Mahasiswa**
   - Informasi layanan administrasi
   - Pembuatan draft surat mahasiswa
   - Informasi prosedur layanan

##  Fitur Utama

-  AI Campus Guide menggunakan Gemini
-  Integrasi database PostgreSQL
-  AI Tool Calling untuk mengambil data kampus
-  Informasi mahasiswa berdasarkan NIM aktif
-  Knowledge Base dengan RAG
-  Pencarian informasi dari Peraturan Akademik
-  Pembuatan draft surat mahasiswa
-  Pencarian lokasi dan ruangan kampus
-  Validasi request dan parameter tools
-  AI guardrails untuk mengurangi hallucination dan prompt injection

##  Arsitektur Sistem

Alur utama NAVIPUS:

```text
Mahasiswa
    │
    ▼
NAVIPUS Chat
    │
    ▼
Gemini AI
    │
    ├───────────────┐
    │               │
    ▼               ▼
Database        Knowledge Base
PostgreSQL           │
    │                │
    │              RAG
    │                │
    └───────┬────────┘
            ▼
        Gemini AI
            │
            ▼
       Jawaban NAVIPUS

       NAVIPUS dapat menggunakan dua sumber informasi utama:

PostgreSQL untuk data mahasiswa, KRS, jadwal, ruangan, lokasi, dan layanan.
Knowledge Base / RAG untuk informasi yang berasal dari dokumen akademik kampus.
*Knowledge Base

NAVIPUS menggunakan dokumen:

Peraturan Akademik Politeknik Negeri Tanah Laut Tahun 2024

Dokumen tersebut digunakan sebagai sumber Knowledge Base untuk menjawab pertanyaan terkait peraturan akademik.

Contoh pertanyaan:

Berapa minimal IPK untuk mendapatkan ijazah?

NAVIPUS dapat mencari bagian dokumen yang relevan menggunakan search_knowledge sebelum memberikan jawaban.

*Teknologi
Next.js
JavaScript
React
PostgreSQL
Google Gemini API
Gemini Embedding
RAG / Knowledge Base
Node.js
📁 Struktur Project
campus-guide-copilot/
│
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.js
│   ├── akademik/
│   ├── layanan/
│   └── navigasi/
│
├── knowledge/
│   └── akademik/
│
├── lib/
│   └── rag/
│
├── scripts/
│
├── knowledge/
│
├── package.json
└── README.md
🚀 Menjalankan Project

Clone repository:

git clone https://github.com/arifbil/campus-guide-copilot.git

Masuk ke folder project:

cd campus-guide-copilot

Install dependency:

npm install

Buat file .env.local dan isi konfigurasi environment yang diperlukan.

Kemudian jalankan development server:

npm run dev

Buka:

http://localhost:3000

Jangan memasukkan API key atau credential database ke dalam source code atau repository GitHub.

🔐 Security & Validation

NAVIPUS memiliki beberapa mekanisme validasi dan keamanan, antara lain:

Validasi format request
Batas panjang pesan
Batas jumlah riwayat pesan
Validasi parameter AI tools
Penggunaan parameterized SQL query
Penanganan error tanpa membocorkan detail internal
AI guardrails
Perlindungan terhadap prompt injection
API key menggunakan environment variable
* Repository

GitHub:

https://github.com/arifbil/campus-guide-copilot

*Project

NAVIPUS — Campus Guide Copilot

Dikembangkan sebagai project untuk membantu mahasiswa memperoleh informasi kampus secara lebih mudah melalui satu asisten AI.


