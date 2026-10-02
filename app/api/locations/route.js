/* ===== API DATA LOKASI KAMPUS ===== */

import pool from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT
        id,
        nama,
        tipe,
        latitude,
        longitude
      FROM locations
      ORDER BY id;
    `);

    return Response.json(result.rows);
  } catch (error) {
    console.error("Locations API Error:", error);

    return Response.json(
      {
        message: "Gagal mengambil data lokasi kampus.",
      },
      {
        status: 500,
      }
    );
  }
}