import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { db } from "@/app/lib/db";

export async function PUT(req) {
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

    const body = await req.json();
    const {
      id, nama, tipe, email, no_hp,
      alamat, nim, jurusan, angkatan, jk
    } = body;

    // if (!id || !nama || !tipe || !email) {
    //   return NextResponse.json({ error: "Data wajib tidak lengkap" }, { status: 400 });
    // }

    const [result] = await db.execute(
  `UPDATE PENGGUNA SET
    nama = ?, tipe = ?, email = ?, no_hp = ?, alamat = ?, nim = ?, jurusan = ?, angkatan = ?, jenis_kelamin = ?
    WHERE id = ?`,
  [
    nama ?? null,
    tipe ?? null,
    email ?? null,
    no_hp ?? null,
    alamat ?? null,
    nim ?? null,
    jurusan ?? null,
    angkatan ?? null,
    jk ?? null,
    id
  ]
);


    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "Data tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Data berhasil diperbarui" });
  } catch (error) {
    return NextResponse.json({ error: "Gagal update data", detail: error.message }, { status: 500 });
  }
}
