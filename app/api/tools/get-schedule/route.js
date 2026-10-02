/* ===== TOOL GET SCHEDULE ===== */

import pool from "@/lib/db";

export async function GET(request) {
  try {

    /* ===== AMBIL HARI ===== */

    const { searchParams } = new URL(request.url);
    const hari = searchParams.get("hari");

    /* ===== VALIDASI HARI ===== */

    if (!hari) {
      return Response.json(
        {
          success: false,
          message: "Hari harus diisi.",
        },
        {
          status: 400,
        }
      );
    }

    /* ===== CARI JADWAL ===== */

    const result = await pool.query(
      `
      SELECT
        schedules.id,
        schedules.nama_kegiatan,
        rooms.nama AS ruangan,
        schedules.hari,
        schedules.mulai,
        schedules.selesai
      FROM schedules
      JOIN rooms
        ON schedules.room_id = rooms.id
      WHERE LOWER(schedules.hari) = LOWER($1)
      ORDER BY schedules.mulai ASC;
      `,
      [hari]
    );

    /* ===== JADWAL TIDAK DITEMUKAN ===== */

    if (result.rows.length === 0) {
      return Response.json({
        success: false,
        message: `Tidak ada jadwal pada hari ${hari}.`,
        data: [],
      });
    }

    /* ===== KEMBALIKAN DATA ===== */

    return Response.json({
      success: true,
      hari: hari,
      jumlah: result.rows.length,
      data: result.rows,
    });

  } catch (error) {

    console.error("Get Schedule Error:", error);

    return Response.json(
      {
        success: false,
        message: "Gagal mengambil data jadwal.",
      },
      {
        status: 500,
      }
    );
  }
}