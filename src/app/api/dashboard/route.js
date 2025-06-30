import { db } from "@/app/lib/db";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // 🔐 Ambil dan verifikasi JWT
    const authHeader = req.headers.get("authorization");
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    jwt.verify(token, process.env.JWT_SECRET);

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
      FROM presensi_sttc.absensi a
      JOIN presensi_sttc.pengguna p ON a.pengguna_id = p.id
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
        SUM(DATE(waktu) = CURDATE()) AS harian,
        SUM(YEARWEEK(waktu, 1) = YEARWEEK(CURDATE(), 1)) AS mingguan,
        SUM(MONTH(waktu) = MONTH(CURDATE()) AND YEAR(waktu) = YEAR(CURDATE())) AS bulanan,
        SUM(YEAR(waktu) = YEAR(CURDATE())) AS tahunan
      FROM presensi_sttc.absensi
    `);

    const pengunjung = {
      harian: statRows[0].harian || 0,
      mingguan: statRows[0].mingguan || 0,
      bulanan: statRows[0].bulanan || 0,
      tahunan: statRows[0].tahunan || 0,
    };

    return NextResponse.json({
      success: true,
      series,
      pengunjung,
    });
  } catch (err) {
    return NextResponse.json(
      {
        error: "Gagal mengambil data statistik",
        detail: err.message,
      },
      { status: 500 }
    );
  }
}
