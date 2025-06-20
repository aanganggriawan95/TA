export async function PUT(req) {
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

    const body = await req.json();
    const {
      id, nama, rfid, tipe, email, no_hp,
      alamat, nim, jurusan, angkatan
    } = body;

    if (!id || !nama || !rfid || !tipe || !email) {
      return NextResponse.json({ error: "Data wajib tidak lengkap" }, { status: 400 });
    }

    const [result] = await db.execute(
      `UPDATE PENGGUNA SET
        nama = ?, rfid = ?, tipe = ?, email = ?, no_hp = ?, alamat = ?, nim = ?, jurusan = ?, angkatan = ?
        WHERE id = ?`,
      [nama, rfid, tipe, email, no_hp, alamat, nim, jurusan, angkatan, id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "Data tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Data berhasil diperbarui" });
  } catch (error) {
    return NextResponse.json({ error: "Gagal update data", detail: error.message }, { status: 500 });
  }
}
