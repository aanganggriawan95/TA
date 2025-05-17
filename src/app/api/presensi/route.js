import { NextResponse } from "next/server";
import { tambahAbsensi } from "@/app/lib/absensi";

// Hanya izinkan POST
export async function POST(request) {
  const body = await request.json();
  const { rfid } = body;

  if (!rfid) {
    return NextResponse.json(
      { success: false, message: "RFID diperlukan" },
      { status: 400 }
    );
  }

  const result = await tambahAbsensi(rfid);

  return NextResponse.json(result, { status: result.success ? 200 : 400 });
}
