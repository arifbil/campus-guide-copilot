/* ===== API DATA LAYANAN MAHASISWA ===== */

import pool from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT
        id,
        nama,
        kategori,
        deskripsi,
        persyaratan,
        lokasi,
        jam_layanan,
        estimasi_proses
      FROM services
      ORDER BY id;
    `);

    return Response.json(result.rows);
  } catch (error) {
    console.error("Services API Error:", error);

    return Response.json(
      {
        message: "Gagal mengambil data layanan mahasiswa.",
      },
      {
        status: 500,
      }
    );
  }
}