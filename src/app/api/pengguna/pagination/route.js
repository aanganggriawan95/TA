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

    // Ambil parameter `page` dan `tipe` dari URL
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = 10;
    const offset = (page - 1) * limit;
    const tipe = searchParams.get("tipe") || "all";

    // Siapkan bagian WHERE jika tipe bukan "all"
    const whereClause = tipe !== "all" ? `WHERE tipe = ?` : "";
    const countQuery = `SELECT COUNT(*) as total FROM pengguna ${whereClause}`;
    const dataQuery = `SELECT * FROM pengguna ${whereClause} ORDER BY id DESC LIMIT ${limit} OFFSET ${offset}`;

    // Hitung total data
    const [countResult] = await db.execute(countQuery, tipe !== "all" ? [tipe] : []);
    const totalData = countResult[0].total;
    const totalPages = Math.ceil(totalData / limit);

    // Ambil data
    const [rows] = await db.execute(dataQuery, tipe !== "all" ? [tipe] : []);

    return NextResponse.json({
      success: true,
      data: rows,
      pagination: {
        currentPage: page,
        totalPages,
        totalData,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal mengambil data pengguna", detail: error.message },
      { status: 500 }
    );
  }
}
