/* ===== API STATUS REAL-TIME RUANGAN ===== */

import pool from "@/lib/db";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    /* ===== AMBIL WAKTU WITA ===== */

    const now = new Date();

    const waktuWITA = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Makassar",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(now);

    /* ===== AMBIL HARI WITA ===== */

    const hariWITA = new Intl.DateTimeFormat("id-ID", {
      timeZone: "Asia/Makassar",
      weekday: "long",
    }).format(now);

    /* ===== CARI JADWAL YANG SEDANG BERLANGSUNG ===== */

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
        AND schedules.hari = $2
        AND $3::time >= schedules.mulai
        AND $3::time < schedules.selesai;
      `,
      [id, hariWITA, waktuWITA]
    );

    /* ===== CEK STATUS RUANGAN ===== */

    if (result.rows.length > 0) {
      return Response.json({
        status: "digunakan",
        label: "Sedang digunakan",
        waktu: waktuWITA,
        hari: hariWITA,
        kegiatan: result.rows[0].nama_kegiatan,
        mulai: result.rows[0].mulai,
        selesai: result.rows[0].selesai,
      });
    }

    return Response.json({
      status: "tersedia",
      label: "Tersedia",
      waktu: waktuWITA,
      hari: hariWITA,
      kegiatan: null,
    });
  } catch (error) {
    console.error("Room Status API Error:", error);

    return Response.json(
      {
        message: "Gagal mengecek status ruangan.",
      },
      {
        status: 500,
      }
    );
  }
}