/* ===== TOOL CHECK KRS STATUS ===== */

import pool from "@/lib/db";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const nim = searchParams.get("nim");

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

    const result = await pool.query(
      `
      SELECT
        students.nim,
        students.nama,
        krs.status AS status_krs
      FROM students
      JOIN krs
        ON students.id = krs.student_id
      WHERE students.nim = $1
      LIMIT 1;
      `,
      [nim]
    );

    if (result.rows.length === 0) {
      return Response.json({
        success: false,
        message: "Data KRS mahasiswa tidak ditemukan.",
      });
    }

    return Response.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Check KRS Status Error:", error);

    return Response.json(
      {
        success: false,
        message: "Gagal mengambil status KRS.",
      },
      {
        status: 500,
      }
    );
  }
}
