import { db } from "@/app/lib/db";
import jwt from "jsonwebtoken";
import ExcelJS from "exceljs";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // Auth header
    const authHeader = req.headers.get("authorization");
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    jwt.verify(token, process.env.JWT_SECRET);

    // Ambil tahun dari query param
    const { searchParams } = new URL(req.url);
    const tahun = parseInt(searchParams.get("tahun"), 10);

    if (!tahun || isNaN(tahun)) {
      return NextResponse.json({ error: "Tahun tidak valid" }, { status: 400 });
    }

    // Query gabungan absensi + pengguna
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

    // Buat file Excel
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(`Absensi ${tahun}`);

    worksheet.columns = [
      { header: "No", key: "no", width: 5 },
      { header: "Waktu", key: "waktu", width: 20 },
      { header: "Nama", key: "nama", width: 20 },
      { header: "RFID", key: "rfid", width: 15 },
      { header: "Tipe", key: "tipe", width: 10 },
      { header: "Email", key: "email", width: 25 },
      { header: "No HP", key: "no_hp", width: 15 },
      { header: "Alamat", key: "alamat", width: 30 },
      { header: "NIM", key: "nim", width: 15 },
      { header: "Jurusan", key: "jurusan", width: 20 },
      { header: "Angkatan", key: "angkatan", width: 10 },
      { header: "Jenis Kelamin", key: "jenis_kelamin", width: 15 },
    ];

    rows.forEach((row, index) => {
      worksheet.addRow({
        no: index + 1,
        ...row,
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Disposition': `attachment; filename="absensi-${tahun}.xlsx"`,
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Gagal mengekspor data absensi",
        detail: error.message,
      },
      { status: 500 }
    );
  }
}
