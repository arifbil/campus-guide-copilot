/* ===== API JADWAL RUANGAN ===== */

import pool from "@/lib/db";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const result = await pool.query(
      `
      SELECT
        schedules.id,
        schedules.nama_kegiatan,
        schedules.hari,
        schedules.mulai,
        schedules.selesai,
        rooms.nama AS nama_ruangan,
        buildings.nama AS nama_gedung
      FROM schedules
      JOIN rooms
        ON schedules.room_id = rooms.id
      JOIN buildings
        ON rooms.building_id = buildings.id
      WHERE rooms.id = $1
      ORDER BY schedules.hari, schedules.mulai;
      `,
      [id]
    );

    return Response.json(result.rows);
  } catch (error) {
    console.error("Schedule API Error:", error);

    return Response.json(
      {
        message: "Gagal mengambil jadwal ruangan.",
      },
      {
        status: 500,
      }
    );
  }
}