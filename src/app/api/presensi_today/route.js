import { NextResponse } from "next/server";
import { db } from "@/app/lib/db";

export async function GET() {
  try {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    const start = startOfDay.toISOString().slice(0, 19).replace("T", " ");
    const end = endOfDay.toISOString().slice(0, 19).replace("T", " ");
    const [rows] = await db.execute(
      ` SELECT 
        absensi.id AS absensi_id,
        pengguna.id AS pengguna_id,
        pengguna.nama,
        pengguna.tipe,
        absensi.waktu
      FROM absensi
      JOIN pengguna ON absensi.pengguna_id = pengguna.id
      WHERE absensi.waktu BETWEEN ? AND ?
      ORDER BY absensi.waktu DESC`,
      [start, end]
    );
    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal mengambil data absensi hari ini", error },
      { status: 500 }
    );
  }
}
