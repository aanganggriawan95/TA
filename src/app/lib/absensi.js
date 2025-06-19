import { db } from "./db";

export async function tambahAbsensi(rfid) {
  try {
    const [pengunjungRows] = await db.execute(
      "SELECT * FROM pengguna WHERE rfid = ?",
      [rfid]
    );
    if (pengunjungRows.length === 0) {
      return {
        success: false,
        message: "RFID tidak terdaftar di sistem!",
      };
    }
    const pengunjung = pengunjungRows[0];
    const [cekAbsensi] = await db.execute(
      "SELECT * FROM absensi WHERE pengguna_id = ? AND DATE(waktu) = CURDATE()",
      [pengunjung.id]
    );
    if (cekAbsensi.length > 0) {
      return {
        success: false,
        message: "Anda sudah absen hari ini!",
      };
    }

    const [result] = await db.execute(
      "INSERT INTO absensi (pengguna_id, waktu) VALUES (?, NOW())",
      [pengunjung.id]
    );
    return {
      success: true,
      message: "Berhasil absen!",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Terjadi kesalahan saat menyimpan absensi!",
    };
  }
}
