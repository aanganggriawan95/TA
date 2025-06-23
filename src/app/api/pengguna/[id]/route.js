import { NextResponse } from 'next/server';
import { db } from "@/app/lib/db"; // sesuaikan path dengan konfigurasi db-mu

export async function GET(request, { params }) {

  const { id } = params;

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
    const pelanggan = await db.pelanggan.findUnique({
      where: { id: Number(id) },
    });

    if (!pelanggan) {
      return NextResponse.json(
        { success: false, message: 'Data tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: pelanggan });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan' },
      { status: 500 }
    );
  }
}
