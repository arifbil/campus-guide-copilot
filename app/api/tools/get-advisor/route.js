/* ===== TOOL GET ADVISOR ===== */

import pool from "@/lib/db";

export async function GET(request) {
  try {
    /* ===== AMBIL NIM ===== */

    const { searchParams } = new URL(request.url);
    const nim = searchParams.get("nim");

    /* ===== VALIDASI NIM ===== */

    if (!nim) {
      return Response.json(
        {
          success: false,
          message: "NIM harus diisi.",
        },
        {
          status: 400,
        }
      );
    }

    /* ===== CEK DATA DOSEN WALI ===== */

    const result = await pool.query(
      `
      SELECT
        students.nim,
        students.nama AS nama_mahasiswa,
        lecturers.nama AS dosen_wali
      FROM students
      JOIN lecturers
        ON students.dosen_wali_id = lecturers.id
      WHERE students.nim = $1
      LIMIT 1;
      `,
      [nim]
    );

    /* ===== DATA TIDAK DITEMUKAN ===== */

    if (result.rows.length === 0) {
      return Response.json({
        success: false,
        message: "Data dosen wali mahasiswa tidak ditemukan.",
      });
    }

    /* ===== KEMBALIKAN DATA ===== */

    return Response.json({
      success: true,
      data: result.rows[0],
    });

  } catch (error) {

    console.error("Get Advisor Error:", error);

    return Response.json(
      {
        success: false,
        message: "Gagal mengambil data dosen wali.",
      },
      {
        status: 500,
      }
    );
  }
}