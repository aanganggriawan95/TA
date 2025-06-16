import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { id, alamat, ktp } = await request.json();

    if (!id || !alamat || !ktp) {
      return NextResponse.json(
        { success: false, message: "Data tidak lengkap" },
        { status: 400 }
      );
    }

    // Cek apakah RFID sudah ada

    // Tambahkan pengguna baru
    const [rows] = await db.execute(
      "INSERT INTO pengunjung_umum (pengguna_id, alamat, no_ktp) VALUES (?, ?, ?)",
      [id, alamat, ktp]
    );

    return NextResponse.json(
      {
        success: true,
        message: "Pengguna berhasil ditambahkan",
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
