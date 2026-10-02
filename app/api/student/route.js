/* ===== API DATA MAHASISWA ===== */

import pool from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query(`
            SELECT
            students.nim,
            students.nama,
            students.prodi,
            students.semester,
            krs.status AS status_krs,
            lecturers.nama AS dosen_wali
        FROM students
        JOIN krs
            ON students.id = krs.student_id
        JOIN lecturers
            ON students.dosen_wali_id = lecturers.id
        WHERE students.nim = '2301001';
    `);

    return Response.json(result.rows[0]);
  } catch (error) {
    console.error("Student API Error:", error);

    return Response.json(
      {
        message: "Gagal mengambil data mahasiswa.",
      },
      {
        status: 500,
      }
    );
  }
}