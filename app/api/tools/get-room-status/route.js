/* ===== TOOL GET ROOM STATUS ===== */

import pool from "@/lib/db";

export async function GET(request) {
  try {

    /* ===== AMBIL PARAMETER ===== */

    const { searchParams } = new URL(request.url);

    const room = searchParams.get("room");
    const hari = searchParams.get("hari");
    const jam = searchParams.get("jam");

    /* ===== VALIDASI PARAMETER ===== */

    if (!room || !hari || !jam) {
      return Response.json(
        {
          success: false,
          message: "Parameter room, hari, dan jam harus diisi.",
        },
        {
          status: 400,
        }
      );
    }

    /* ===== CARI RUANGAN ===== */

    const roomResult = await pool.query(
      `
      SELECT
        id,
        nama,
        lantai,
        building_id
      FROM rooms
      WHERE nama ILIKE $1
      ORDER BY id
      LIMIT 1;
      `,
      [`%${room}%`]
    );

    /* ===== RUANGAN TIDAK DITEMUKAN ===== */

    if (roomResult.rows.length === 0) {
      return Response.json({
        success: false,
        message: "Ruangan tidak ditemukan.",
      });
    }

    const roomData = roomResult.rows[0];

    /* ===== CEK JADWAL RUANGAN ===== */

    const scheduleResult = await pool.query(
      `
      SELECT
        schedules.id,
        schedules.nama_kegiatan,
        schedules.hari,
        schedules.mulai,
        schedules.selesai
      FROM schedules
      WHERE schedules.room_id = $1
        AND LOWER(schedules.hari) = LOWER($2)
        AND $3::time >= schedules.mulai
        AND $3::time < schedules.selesai
      ORDER BY schedules.mulai ASC
      LIMIT 1;
      `,
      [roomData.id, hari, jam]
    );

    /* ===== RUANGAN SEDANG DIGUNAKAN ===== */

    if (scheduleResult.rows.length > 0) {
      return Response.json({
        success: true,
        status: "digunakan",
        ruangan: roomData,
        jadwal: scheduleResult.rows[0],
      });
    }

    /* ===== RUANGAN KOSONG ===== */

    return Response.json({
      success: true,
      status: "kosong",
      ruangan: roomData,
      jadwal: null,
    });

  } catch (error) {

    console.error("Get Room Status Error:", error);

    return Response.json(
      {
        success: false,
        message: "Gagal mengambil status ruangan.",
      },
      {
        status: 500,
      }
    );
  }
}