import { db } from "@/app/lib/db";

export async function GET(request, { params }) {
  const { id } = params;

  try {
    const [rows] = await db.query(
      `SELECT 
          p.Nama AS Nama_Pelanggan, p.Telephone, p.Alamat,
          b.Jenis_Barang, b.Merek, b.Model, 
          b.Nomor_Seri, b.Keluhan_Barang, b.Status
       FROM data_barang b
       JOIN data_pelanggan p ON b.Nama = p.Nama
       WHERE b.Id_Barang = ?`,
      [id]
    );

    if (rows.length === 0) {
      return Response.json({ success: false, message: "Data tidak ditemukan." }, { status: 404 });
    }

    return Response.json({ success: true, data: rows[0] });
  } catch (error) {
    console.error("Gagal ambil data nota:", error);
    return Response.json({ success: false, message: "Gagal ambil data nota." }, { status: 500 });
  }
}
