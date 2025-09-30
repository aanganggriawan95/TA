import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET(_, { params }) {
  console.log(params);
  try {
    const id = parseInt(params.id, 10);

    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, message: "ID tidak valid" },
        { status: 400 }
      );
    }

    const [rows] = await db.execute("SELECT * FROM pengguna WHERE id = ?", [
      id,
    ]);

    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data", error: error.message },
      { status: 500 }
    );
  }
}
