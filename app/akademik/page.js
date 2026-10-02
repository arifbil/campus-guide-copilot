
"use client";

import { useEffect, useState } from "react";

export default function AkademikPage() {

/* ===== STATE DATA MAHASISWA ===== */

const [mahasiswa, setMahasiswa] = useState(null);

/* ===== AMBIL DATA DARI API ===== */

useEffect(() => {
  const fetchMahasiswa = async () => {
    try {
      const response = await fetch("/api/student");
      const data = await response.json();

      setMahasiswa(data);
    } catch (error) {
      console.error("Gagal mengambil data mahasiswa:", error);
    }
  };

  fetchMahasiswa();
}, []);

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-4xl">

        {/* ===== HEADER AKADEMIK ===== */}
        <header className="mb-10">
          <p className="mb-2 text-sm font-semibold text-blue-600">
            CAMPUS GUIDE COPILOT
          </p>

          <h1 className="text-4xl font-bold text-slate-900">
            Akademik
          </h1>

          <p className="mt-3 text-slate-600">
            Informasi akademik dan bantuan untuk kebutuhan perkuliahan.
          </p>
        </header>


      
      {/* ===== INFORMASI MAHASISWA ===== */}
        <section className="mb-6 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            👤 Informasi Mahasiswa
          </h2>

          {mahasiswa ? (
            <div className="mt-4 space-y-2 text-slate-600">
              <p>
                <strong>Nama:</strong> {mahasiswa.nama}
              </p>

              <p>
                <strong>NIM:</strong> {mahasiswa.nim}
              </p>

              <p>
                <strong>Program Studi:</strong> {mahasiswa.prodi}
              </p>

              <p>
                <strong>Semester:</strong> {mahasiswa.semester}
              </p>
            </div>
          ) : (
            <p className="mt-4 text-slate-500">
              Memuat data mahasiswa...
            </p>
          )}
        </section>


        {/* ===== STATUS KRS ===== */}
        <section className="mb-6 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            📚 Status KRS
          </h2>

          <p className="mt-4 text-slate-600">
            Status KRS kamu saat ini:
          </p>

          {mahasiswa ? (
            <div className="mt-3 rounded-xl bg-yellow-50 p-4 text-yellow-800">
              ⚠️ {mahasiswa.status_krs}
            </div>
          ) : (
            <p className="mt-3 text-slate-500">
              Memuat status KRS...
            </p>
          )}
        </section>


        {/* ===== DOSEN WALI ===== */}
          <section className="mb-6 rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">
              👨‍🏫 Dosen Wali
            </h2>

            <p className="mt-4 text-slate-600">
              {mahasiswa ? mahasiswa.dosen_wali : "Memuat data..."}
            </p>
          </section>

        {/* ===== PROSEDUR AKADEMIK ===== */}
        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            📖 Prosedur Akademik
          </h2>

          <p className="mt-3 text-slate-600">
            Campus Guide Copilot dapat membantu menjelaskan KRS,
            jadwal kuliah, dosen wali, surat akademik, dan prosedur
            akademik lainnya.
          </p>
        </section>

      </div>
    </main>
  );
}