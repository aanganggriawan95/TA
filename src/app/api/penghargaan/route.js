import { db } from "@/app/lib/db";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // 🔐 1. Verifikasi JWT dengan penanganan error yang lebih baik
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized: Token tidak ada" },
        { status: 401 }
      );
    }

    try {
      if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET tidak diatur di server.");
      }
      jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      return NextResponse.json(
        { error: `Unauthorized: ${e.message}` },
        { status: 401 }
      );
    }

    // 2. Ambil tahun dari body (default: tahun sekarang)
    const body = await req.json().catch(() => ({})); // Tangani jika body bukan JSON
    const periode = body.periode || new Date().getFullYear().toString();

    // 3. Hitung pengunjung dengan absensi terbanyak tahun ini
    const [rows] = await db.execute(
      `
      SELECT 
        p.id AS pengguna_id,
        COUNT(a.id) AS total_kunjungan
      FROM pengguna p
      JOIN absensi a ON a.pengguna_id = p.id
      WHERE YEAR(a.waktu) = ?
      GROUP BY p.id
      ORDER BY total_kunjungan DESC
      LIMIT 1
    `,
      [periode]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { success: true, message: "Tidak ada data absensi untuk periode ini." },
        { status: 200 }
      );
    }

    const terbaik = rows[0];

    // 4. Cek apakah penghargaan untuk periode ini sudah ada
    const [existing] = await db.execute(
      `SELECT id FROM penghargaan WHERE periode = ?`,
      [periode]
    );

    if (existing.length > 0) {
      // Jika ada, UPDATE
      await db.execute(
        `UPDATE penghargaan SET pengguna_id = ?, total_kunjungan = ? WHERE periode = ?`,
        [terbaik.pengguna_id, terbaik.total_kunjungan, periode]
      );
    } else {
      // Jika tidak ada, INSERT
      await db.execute(
        `INSERT INTO penghargaan (pengguna_id, periode, total_kunjungan) VALUES (?, ?, ?)`,
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
    // 5. PERBAIKAN KRITIS: Selalu kirim balasan error ke browser
    console.error("Gagal memproses penghargaan:", err);
    return NextResponse.json(
      {
        success: false,
        error: "Terjadi kesalahan pada server",
        detail: err.message,
      },
      { status: 500 }
    );
  }
}
