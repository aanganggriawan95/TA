import { NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ error: "Token tidak valid" }, { status: 403 });
    }

    const [rows] = await db.execute(
      `SELECT    
          pengguna.rfid,
          pengguna.nama,
          pengguna.tipe,
          pengunjung_umum.email,
          pengunjung_umum.no_hp,
          pengunjung_umum.alamat
       FROM pengunjung_umum
       JOIN pengguna ON pengunjung_umum.pengguna_id = pengguna.id
       
       UNION
        SELECT    
          pengguna.rfid,
          pengguna.nama,
          pengguna.tipe,
          mahasiswa.email,
          mahasiswa.no_hp,
          mahasiswa.alamat
       FROM mahasiswa
       JOIN pengguna ON mahasiswa.pengguna_id = pengguna.id

        UNION
        SELECT    
          pengguna.rfid,
          pengguna.nama,
          pengguna.tipe,
          akademika.email,
          akademika.no_hp,
          akademika.alamat
       FROM akademika
       JOIN pengguna ON akademika.pengguna_id = pengguna.id
       `
    );

    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal mengambil data pengunjung umum", detail: error.message },
      { status: 500 }
    );
  }
}
