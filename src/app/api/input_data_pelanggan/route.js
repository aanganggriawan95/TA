import { db } from "@/app/lib/db";

export async function POST(request) {
  const { Nama, Telephone, Alamat } = await request.json();

  if (!Nama || !Telephone || !Alamat) {
    return Response.json(
      { success: false, message: "Semua field wajib diisi." },
      { status: 400 }
    );
  }

  try {
    const [result] = await db.execute(
      "INSERT INTO data_pelanggan (Nama, Telephone, Alamat) VALUES (?, ?, ?)",
      [Nama, Telephone, Alamat]
    );

    // Ambil ID dari hasil insert
    const id_pelanggan = result.insertId;

    return Response.json({
      success: true,
      message: "Data pelanggan berhasil disimpan",
      id_pelanggan, // kirim ID ke response
    });
  } catch (error) {
    console.error("Insert pelanggan error:", error);
    return Response.json(
      {
        success: false,
        message: "Gagal menyimpan data pelanggan",
      },
      { status: 500 }
    );
  }
}
