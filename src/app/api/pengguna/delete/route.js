import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { db } from "@/app/lib/db";

export async function DELETE(req) {
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

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID tidak boleh kosong" },
        { status: 400 }
      );
    }

    const [result] = await db.execute(`DELETE FROM PENGGUNA WHERE id = ?`, [
      id,
    ]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: "Data tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Data berhasil dihapus",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal menghapus data", detail: error.message },
      { status: 500 }
    );
  }
}
