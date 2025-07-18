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
      `SELECT * FROM PENGGUNA`
    );

    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal mengambil data pengunjung umum", detail: error.message },
      { status: 500 }
    );
  }
}
