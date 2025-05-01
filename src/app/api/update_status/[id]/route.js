import { db } from "@/app/lib/db";

export async function PUT(request, { params }) {
  const { id } = params;
  const { Status } = await request.json();

  if (!id || !Status) {
    return Response.json(
      { success: false, message: "ID dan status wajib diisi" },
      { status: 400 }
    );
  }

  try {
    const [result] = await db.execute(
      "UPDATE data_barang SET Status = ? WHERE Id_Barang = ?",
      [Status, id]
    );

    if (result.affectedRows === 0) {
      return Response.json(
        { success: false, message: "Data tidak ditemukan" },
        { status: 404 }
      );
    }

    return Response.json(
      { success: true, message: "Status berhasil diperbarui" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Gagal update status:", error);
    return Response.json(
      { success: false, message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
