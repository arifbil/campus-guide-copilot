/* ===== TOOL FIND ROOM ===== */

import pool from "@/lib/db";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const nama = searchParams.get("nama");

    if (!nama) {
      return Response.json(
        {
          success: false,
          message: "Nama ruangan harus diisi.",
        },
        {
          status: 400,
        }
      );
    }

    const result = await pool.query(
      `
      SELECT
        rooms.id,
        rooms.nama AS nama_ruangan,
        rooms.lantai,
        buildings.nama AS nama_gedung
      FROM rooms
      JOIN buildings
        ON rooms.building_id = buildings.id
      WHERE rooms.nama ILIKE $1
      LIMIT 1;
      `,
      [`%${nama}%`]
    );

    if (result.rows.length === 0) {
      return Response.json({
        success: false,
        message: "Ruangan tidak ditemukan.",
      });
    }

    return Response.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Find Room Error:", error);

    return Response.json(
      {
        success: false,
        message: "Gagal mencari ruangan.",
      },
      {
        status: 500,
      }
    );
  }
}