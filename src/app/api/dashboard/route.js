import { db } from "@/app/lib/db";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // 🔐 Ambil dan verifikasi JWT
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Gunakan try-catch spesifik untuk JWT agar pesan error lebih jelas
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

    // 🕐 Ambil tahun dari query param
    const { searchParams } = new URL(req.url);
    const tahun = parseInt(searchParams.get("tahun"), 10);
    if (!tahun || isNaN(tahun)) {
      return NextResponse.json({ error: "Tahun tidak valid" }, { status: 400 });
    }

    // 📊 Ambil data absensi per bulan per tipe
    const [rows] = await db.execute(
      `
      SELECT 
        p.tipe,
        MONTH(a.waktu) AS bulan,
        COUNT(*) AS total
      FROM absensi a
      JOIN pengguna p ON a.pengguna_id = p.id
      WHERE YEAR(a.waktu) = ?
      GROUP BY p.tipe, MONTH(a.waktu)
      ORDER BY p.tipe, bulan
    `,
      [tahun]
    );

    // 🔄 Format ke series
    const kategori = ["mahasiswa", "umum", "staf"];
    const series = kategori.map((tipe) => ({
      name: tipe.charAt(0).toUpperCase() + tipe.slice(1),
      data: Array(12).fill(0),
    }));

    rows.forEach((row) => {
      const index = series.findIndex((s) => s.name.toLowerCase() === row.tipe);
      if (index !== -1 && row.bulan >= 1 && row.bulan <= 12) {
        series[index].data[row.bulan - 1] = row.total;
      }
    });

    // 🔢 Hitung pengunjung langsung dari absensi
    const [statRows] = await db.execute(`
      SELECT
        SUM(CASE WHEN DATE(waktu) = CURDATE() THEN 1 ELSE 0 END) AS harian,
        SUM(CASE WHEN YEARWEEK(waktu, 1) = YEARWEEK(CURDATE(), 1) THEN 1 ELSE 0 END) AS mingguan,
        SUM(CASE WHEN MONTH(waktu) = MONTH(CURDATE()) AND YEAR(waktu) = YEAR(CURDATE()) THEN 1 ELSE 0 END) AS bulanan,
        SUM(CASE WHEN YEAR(waktu) = YEAR(CURDATE()) THEN 1 ELSE 0 END) AS tahunan
      FROM absensi
    `);

    // PERBAIKAN: Cek jika statRows ada isinya sebelum diakses
    const pengunjung =
      statRows.length > 0
        ? {
            harian: Number(statRows[0].harian),
            mingguan: Number(statRows[0].mingguan),
            bulanan: Number(statRows[0].bulanan),
            tahunan: Number(statRows[0].tahunan),
          }
        : { harian: 0, mingguan: 0, bulanan: 0, tahunan: 0 };

    return NextResponse.json({
      success: true,
      series,
      pengunjung,
    });
  } catch (err) {
    console.error("Kesalahan Server Internal:", err);
    return NextResponse.json(
      {
        error: "Gagal mengambil data statistik",
        detail: err.message,
      },
      { status: 500 }
    );
  }
}
