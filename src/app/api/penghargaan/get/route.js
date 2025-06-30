import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    // 🔐 Validasi token
    const authHeader = req.headers.get("authorization");
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    jwt.verify(token, process.env.JWT_SECRET);

    // 🎯 Ambil tahun dari query
    const { searchParams } = new URL(req.url);
    const tahun = searchParams.get("tahun");

    if (!tahun || isNaN(parseInt(tahun))) {
      return NextResponse.json({ error: "Tahun tidak valid" }, { status: 400 });
    }

    // 🧠 Query untuk top 3 pengunjung
    const [rows] = await db.execute(
      `
      SELECT 
        p.id,
        p.nama,
        p.jurusan,
        p.tipe,
        p.angkatan,
        COUNT(a.id) AS total_kunjungan
      FROM presensi_sttc.pengguna p
      JOIN presensi_sttc.absensi a ON a.pengguna_id = p.id
      WHERE YEAR(a.waktu) = ?
      GROUP BY p.id
      ORDER BY total_kunjungan DESC
      LIMIT 3
    `,
      [tahun]
    );

    return NextResponse.json({
      success: true,
      tahun,
      top_pengunjung: rows,
    });
  } catch (err) {
    return NextResponse.json(
      {
        error: "Gagal mengambil data top pengunjung",
        detail: err.message,
      },
      { status: 500 }
    );
  }
}
