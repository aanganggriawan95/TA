import { db } from "@/app/lib/db";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // 🔐 Verifikasi JWT
    const authHeader = req.headers.get("authorization");
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    jwt.verify(token, process.env.JWT_SECRET);

    // Ambil tahun dari body (default: tahun sekarang)
    const body = await req.json();
    const periode = body.periode || new Date().getFullYear().toString();

    // Hitung pengunjung dengan absensi terbanyak tahun ini
    const [rows] = await db.execute(
      `
      SELECT 
        p.id AS pengguna_id,
        COUNT(a.id) AS total_kunjungan
      FROM presensi_sttc.pengguna p
      JOIN presensi_sttc.absensi a ON a.pengguna_id = p.id
      WHERE YEAR(a.waktu) = ?
      GROUP BY p.id
      ORDER BY total_kunjungan DESC
      LIMIT 1
    `,
      [periode]
    );

    if (rows.length === 0) {
      return NextResponse.json({ message: "Tidak ada data absensi." }, { status: 404 });
    }

    const terbaik = rows[0];

    // Cek apakah periode sudah ada
    const [existing] = await db.execute(
      `SELECT id FROM presensi_sttc.penghargaan WHERE periode = ?`,
      [periode]
    );

    if (existing.length > 0) {
      // Update
      await db.execute(
        `UPDATE presensi_sttc.penghargaan SET pengguna_id = ?, total_kunjungan = ? WHERE periode = ?`,
        [terbaik.pengguna_id, terbaik.total_kunjungan, periode]
      );
    } else {
      // Insert
      await db.execute(
        `INSERT INTO presensi_sttc.penghargaan (pengguna_id, periode, total_kunjungan) VALUES (?, ?, ?)`,
        [terbaik.pengguna_id, periode, terbaik.total_kunjungan]
      );
    }

    return NextResponse.json({
      success: true,
      message: "Data penghargaan berhasil disimpan.",
      data: {
        pengguna_id: terbaik.pengguna_id,
        periode,
        total_kunjungan: terbaik.total_kunjungan,
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Gagal menyimpan data penghargaan", detail: err.message },
      { status: 500 }
    );
  }
}
