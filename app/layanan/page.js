"use client";

import { useEffect, useState } from "react";

export default function LayananPage() {

  /* ===== STATE DATA LAYANAN ===== */

  const [services, setServices] = useState([]);

  /* ===== STATE LAYANAN TERPILIH ===== */

  const [selectedService, setSelectedService] = useState(null);

  /* ===== AMBIL DATA DARI API ===== */

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("/api/services");
        const data = await response.json();

        setServices(data);
      } catch (error) {
        console.error("Gagal mengambil data layanan:", error);
      }
    };

    fetchServices();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">

      <div className="mx-auto max-w-5xl">

        {/* ===== HEADER ===== */}

        <header className="mb-8">

          <h1 className="text-3xl font-bold text-slate-900">
            🏢 Layanan Mahasiswa
          </h1>

          <p className="mt-2 text-slate-600">
            Temukan informasi layanan yang kamu butuhkan di kampus.
          </p>

        </header>


        {/* ===== DETAIL LAYANAN ===== */}

        {selectedService ? (

          <section className="rounded-2xl bg-white p-6 shadow-sm">

            {/* ===== TOMBOL KEMBALI ===== */}

            <button
              onClick={() => setSelectedService(null)}
              className="mb-6 rounded-xl bg-slate-100 px-4 py-2 font-medium text-slate-700 hover:bg-slate-200"
            >
              ← Kembali ke Daftar Layanan
            </button>


            {/* ===== NAMA LAYANAN ===== */}

            <h2 className="text-3xl font-bold text-slate-900">
              {selectedService.nama}
            </h2>


            {/* ===== KATEGORI ===== */}

            <div className="mt-4">

              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                {selectedService.kategori}
              </span>

            </div>


            {/* ===== DESKRIPSI ===== */}

            <div className="mt-6">

              <h3 className="text-lg font-semibold text-slate-900">
                Deskripsi
              </h3>

              <p className="mt-2 text-slate-600">
                {selectedService.deskripsi}
              </p>

            </div>


            {/* ===== INFORMASI LAYANAN ===== */}

            <div className="mt-6 grid gap-4 md:grid-cols-2">

              {/* ===== PERSYARATAN ===== */}

              <div className="rounded-xl bg-slate-50 p-4">

                <h3 className="font-semibold text-slate-900">
                  📋 Persyaratan
                </h3>

                <p className="mt-2 text-slate-600">
                  {selectedService.persyaratan}
                </p>

              </div>


              {/* ===== LOKASI ===== */}

              <div className="rounded-xl bg-slate-50 p-4">

                <h3 className="font-semibold text-slate-900">
                  📍 Lokasi
                </h3>

                <p className="mt-2 text-slate-600">
                  {selectedService.lokasi}
                </p>

              </div>


              {/* ===== JAM LAYANAN ===== */}

              <div className="rounded-xl bg-slate-50 p-4">

                <h3 className="font-semibold text-slate-900">
                  🕐 Jam Layanan
                </h3>

                <p className="mt-2 text-slate-600">
                  {selectedService.jam_layanan}
                </p>

              </div>


              {/* ===== ESTIMASI PROSES ===== */}

              <div className="rounded-xl bg-slate-50 p-4">

                <h3 className="font-semibold text-slate-900">
                  ⏱️ Estimasi Proses
                </h3>

                <p className="mt-2 text-slate-600">
                  {selectedService.estimasi_proses}
                </p>

              </div>

            </div>


            {/* ===== INFO MVP ===== */}

            <div className="mt-6 rounded-xl bg-blue-50 p-4 text-blue-800">

              <p className="font-medium">
                💡 Informasi
              </p>

              <p className="mt-1 text-sm">
                Untuk saat ini halaman hanya menampilkan informasi
                layanan. Fitur pengajuan layanan akan ditambahkan
                pada tahap AI Agent.
              </p>

            </div>

          </section>

        ) : (

          /* ===== DAFTAR LAYANAN ===== */

          <section>

            <h2 className="mb-4 text-xl font-semibold text-slate-900">
              Daftar Layanan
            </h2>


            {/* ===== LOADING ===== */}

            {services.length === 0 ? (

              <p className="text-slate-500">
                Memuat data layanan...
              </p>

            ) : (

              /* ===== GRID LAYANAN ===== */

              <div className="grid gap-6 md:grid-cols-2">

                {services.map((service) => (

                  <button
                    key={service.id}
                    onClick={() => setSelectedService(service)}
                    className="rounded-2xl bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                  >

                    {/* ===== NAMA LAYANAN ===== */}

                    <h3 className="text-xl font-semibold text-slate-900">
                      {service.nama}
                    </h3>


                    {/* ===== KATEGORI ===== */}

                    <div className="mt-3">

                      <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                        {service.kategori}
                      </span>

                    </div>


                    {/* ===== DESKRIPSI ===== */}

                    <p className="mt-4 text-slate-600">
                      {service.deskripsi}
                    </p>


                    {/* ===== INFORMASI SINGKAT ===== */}

                    <div className="mt-5 space-y-2 text-sm text-slate-600">

                      <p>
                        <strong>📍 Lokasi:</strong>{" "}
                        {service.lokasi}
                      </p>

                      <p>
                        <strong>🕐 Jam:</strong>{" "}
                        {service.jam_layanan}
                      </p>

                      <p>
                        <strong>⏱️ Estimasi:</strong>{" "}
                        {service.estimasi_proses}
                      </p>

                    </div>


                    {/* ===== TOMBOL DETAIL ===== */}

                    <div className="mt-5">

                      <span className="font-semibold text-blue-600">
                        Lihat Detail →
                      </span>

                    </div>

                  </button>

                ))}

              </div>

            )}

          </section>

        )}

      </div>

    </main>
  );
}