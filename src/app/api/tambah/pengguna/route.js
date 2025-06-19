import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { rfid, nama, tipe, email, no_hp, alamat } = await request.json();

    if (!rfid || !nama || !tipe || !email || !no_hp || !alamat) {
      return NextResponse.json(
        { success: false, message: "Data tidak lengkap" },
        { status: 400 }
      );
    }

    // Cek apakah RFID sudah ada
    const [existing] = await db.execute(
      "SELECT * FROM pengguna WHERE rfid = ?",
      [rfid]
    );

    if (Array.isArray(existing) && existing.length > 0) {
      return NextResponse.json(
        { success: false, message: "RFID sudah terdaftar." },
        { status: 409 }
      );
    }

    // Tambahkan pengguna baru
    const [rows] = await db.execute(
      "INSERT INTO pengguna (rfid, nama, tipe, email, no_hp, alamat) VALUES (?, ?, ?, ?, ?, ?)",
      [ rfid, nama, tipe, email, no_hp, alamat]
    );

    return NextResponse.json(
      {
        success: true,
        message: "Pengguna berhasil ditambahkan",
        data: {
          id: rows.insertId,
          rfid: rfid,
          nama: nama,
          tipe: tipe,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Gagal tambah pengguna:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
