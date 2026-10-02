/* ===== API DATA RUANGAN ===== */

import pool from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT
        rooms.id,
        rooms.nama AS nama_ruangan,
        rooms.lantai,
        buildings.nama AS nama_gedung
      FROM rooms
      JOIN buildings
        ON rooms.building_id = buildings.id
      ORDER BY rooms.id;
    `);

    return Response.json(result.rows);
  } catch (error) {
    console.error("Rooms API Error:", error);

    return Response.json(
      {
        message: "Gagal mengambil data ruangan.",
      },
      {
        status: 500,
      }
    );
  }
}