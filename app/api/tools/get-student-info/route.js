/* ===== IMPORT ===== */

import { NextResponse } from "next/server";
import pool from "@/lib/db";


/* ===== GET STUDENT INFO ===== */

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const nim = searchParams.get("nim");

    // NIM wajib diberikan
    if (!nim) {
      return NextResponse.json(
        {
          success: false,
          error: "NIM wajib diberikan",
        },
        { status: 400 }
      );
    }

    // Cari mahasiswa berdasarkan NIM
    const result = await pool.query(
      `
      SELECT
        s.id,
        s.nim,
        s.nama,
        s.prodi,
        s.semester,
        l.nama AS dosen_wali
      FROM students s
      LEFT JOIN lecturers l
        ON s.dosen_wali_id = l.id
      WHERE s.nim = $1
      `,
      [nim]
    );

    // Mahasiswa tidak ditemukan
    if (result.rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Mahasiswa dengan NIM tersebut tidak ditemukan",
        },
        { status: 404 }
      );
    }

    // Berhasil
    return NextResponse.json({
      success: true,
      student: result.rows[0],
    });

  } catch (error) {
    console.error("GET STUDENT INFO ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Terjadi kesalahan saat mengambil data mahasiswa",
      },
      { status: 500 }
    );
  }
}