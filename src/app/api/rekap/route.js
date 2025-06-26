import { NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    // Auth Header
    const authHeader = req.headers.get("authorization");
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    jwt.verify(token, process.env.JWT_SECRET);

    // Ambil tahun dari FE
    const { searchParams } = new URL(req.url);
    const tahun = parseInt(searchParams.get("tahun"), 10);

    if (!tahun || isNaN(tahun)) {
      return NextResponse.json({ error: "Tahun tidak valid" }, { status: 400 });
    }

    // Query gabung absensi + pengguna
    const query = `
      SELECT 
        a.id AS absensi_id,
        a.waktu,
        p.id AS pengguna_id,
        p.nama,
        p.rfid,
        p.tipe,
        p.email,
        p.no_hp,
        p.alamat,
        p.nim,
        p.jurusan,
        p.angkatan,
        p.jenis_kelamin
      FROM absensi a
      LEFT JOIN pengguna p ON a.pengguna_id = p.id
      WHERE YEAR(a.waktu) = ?
      ORDER BY a.waktu DESC
    `;

    const [rows] = await db.execute(query, [tahun]);

    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Gagal mengambil data absensi",
        detail: error.message,
      },
      { status: 500 }
    );
  }
}
