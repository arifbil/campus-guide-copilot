/* ===== TOOL FIND SERVICE ===== */

import pool from "@/lib/db";

/* ===== API FIND SERVICE ===== */

export async function GET(request) {
  try {

    /* ===== AMBIL PARAMETER PENCARIAN ===== */

    const { searchParams } = new URL(request.url);
    const nama = searchParams.get("nama");

    /* ===== VALIDASI INPUT ===== */

    if (!nama) {
      return Response.json(
        {
          success: false,
          message: "Nama layanan harus diberikan.",
        },
        {
          status: 400,
        }
      );
    }

    /* ===== CARI LAYANAN DI DATABASE ===== */

    const result = await pool.query(
      `
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
      WHERE nama ILIKE $1
      ORDER BY id
      LIMIT 1;
      `,
      [`%${nama}%`]
    );

    /* ===== JIKA LAYANAN TIDAK DITEMUKAN ===== */

    if (result.rows.length === 0) {
      return Response.json({
        success: false,
        message: "Layanan tidak ditemukan.",
      });
    }

    /* ===== KEMBALIKAN DATA LAYANAN ===== */

    return Response.json({
      success: true,
      data: result.rows[0],
    });

  } catch (error) {

    console.error("Find Service Tool Error:", error);

    return Response.json(
      {
        success: false,
        message: "Gagal mencari layanan.",
      },
      {
        status: 500,
      }
    );
  }
}