import { db } from "@/app/lib/db";

export async function POST(request) {
  const {
    Id_Pelanggan,
    Jenis_Barang,
    Merek,
    Model,
    Nomor_Seri,
    Keluhan_Barang,
    Status,
  } = await request.json();

  if (
    !Id_Pelanggan ||
    !Jenis_Barang ||
    !Merek ||
    !Model ||
    !Nomor_Seri ||
    !Keluhan_Barang ||
    !Status
  ) {
    return Response.json(
      { success: false, message: "Semua field wajib diisi." },
      { status: 400 }
    );
  }

  try {
    const [result] = await db.execute(
      "INSERT INTO data_barang (Id_Pelanggan, Jenis_Barang, Merek, Model, Nomor_Seri, Keluhan_Barang, Status) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        Id_Pelanggan,
        Jenis_Barang,
        Merek,
        Model,
        Nomor_Seri,
        Keluhan_Barang,
        Status,
      ]
    );

    const id_barang = result.insertId;

    return Response.json({
      success: true,
      message: "Data barang berhasil disimpan",
      id_barang, // response dengan id_barang
    });
  } catch (error) {
    console.error("Insert barang error:", error);
    return Response.json(
      {
        success: false,
        message: "Gagal menyimpan data barang",
      },
      { status: 500 }
    );
  }
}
