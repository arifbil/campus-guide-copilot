/* ===== TOOL CREATE LETTER ===== */

import pool from "@/lib/db";

export async function POST(request) {
  try {

    /* ===== AMBIL DATA REQUEST ===== */

    const body = await request.json();

    const {
      nim,
      jenis_surat,
      alasan,
      isi_surat,
    } = body;

    /* ===== VALIDASI DATA ===== */

    if (!nim || !jenis_surat || !alasan || !isi_surat) {
      return Response.json(
        {
          success: false,
          message:
            "NIM, jenis surat, alasan, dan isi surat harus diisi.",
        },
        {
          status: 400,
        }
      );
    }

    /* ===== CARI DATA MAHASISWA ===== */

    const studentResult = await pool.query(
      `
      SELECT
        students.id,
        students.nim,
        students.nama,
        students.prodi,
        students.semester,
        students.dosen_wali_id,
        lecturers.nama AS dosen_wali
      FROM students
      LEFT JOIN lecturers
        ON students.dosen_wali_id = lecturers.id
      WHERE students.nim = $1
      LIMIT 1;
      `,
      [nim]
    );

    /* ===== MAHASISWA TIDAK DITEMUKAN ===== */

    if (studentResult.rows.length === 0) {
      return Response.json(
        {
          success: false,
          message: "Mahasiswa dengan NIM tersebut tidak ditemukan.",
        },
        {
          status: 404,
        }
      );
    }

    /* ===== DATA MAHASISWA ===== */

    const student = studentResult.rows[0];

    /* ===== SIMPAN DRAFT SURAT ===== */

    const letterResult = await pool.query(
      `
      INSERT INTO letter_requests (
        student_id,
        dosen_wali_id,
        jenis_surat,
        alasan,
        isi_surat,
        status
      )
      VALUES ($1, $2, $3, $4, $5, 'draft')
      RETURNING
        id,
        jenis_surat,
        alasan,
        isi_surat,
        status,
        created_at;
      `,
      [
        student.id,
        student.dosen_wali_id,
        jenis_surat,
        alasan,
        isi_surat,
      ]
    );

    /* ===== KEMBALIKAN HASIL ===== */

    return Response.json({
      success: true,

      message: "Draft surat berhasil dibuat.",

      data: {
        surat: letterResult.rows[0],

        mahasiswa: {
          nim: student.nim,
          nama: student.nama,
          prodi: student.prodi,
          semester: student.semester,
        },

        dosen_wali: student.dosen_wali,
      },
    });

  } catch (error) {

    console.error("Create Letter Error:", error);

    return Response.json(
      {
        success: false,
        message: "Gagal membuat draft surat.",
      },
      {
        status: 500,
      }
    );
  }
}