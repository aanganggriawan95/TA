import { tambahAbsensi } from "@/app/lib/absensi";
import { db } from "@/app/lib/db";

jest.mock("@/app/lib/db", () => ({
  db: {
    execute: jest.fn(),
  },
}));

describe("tambahAbsensi", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("harus gagal jika RFID tidak ditemukan di database", async () => {
    db.execute.mockResolvedValueOnce([[]]); // SELECT * FROM pengguna

    const result = await tambahAbsensi("123456");

    expect(db.execute).toHaveBeenCalledWith(
      "SELECT * FROM pengguna WHERE rfid = ?",
      ["123456"]
    );
    expect(result).toEqual({
      success: false,
      message: "RFID tidak terdaftar di sistem!",
    });
  });

  it("harus gagal jika pengguna sudah absen hari ini", async () => {
    const penggunaMock = [{ id: 1, nama: "Budi" }];
    db.execute
      .mockResolvedValueOnce([penggunaMock]) // SELECT * FROM pengguna
      .mockResolvedValueOnce([[{ id: 10, waktu: "2025-07-05 08:00:00" }]]); // SELECT * FROM absensi ...

    const result = await tambahAbsensi("123456");

    expect(result).toEqual({
      success: false,
      message: "Anda sudah absen hari ini!",
    });
  });

  it("harus berhasil jika pengguna belum absen", async () => {
    const penggunaMock = [{ id: 1 }];
    db.execute
      .mockResolvedValueOnce([penggunaMock]) // SELECT * FROM pengguna
      .mockResolvedValueOnce([[]]) // belum absen
      .mockResolvedValueOnce([{ affectedRows: 1 }]); // INSERT INTO absensi

    const result = await tambahAbsensi("123456");

    expect(result).toEqual({
      success: true,
      message: "Berhasil absen!",
    });
  });

  it("harus menangani error dengan response gagal", async () => {
    db.execute.mockRejectedValue(new Error("DB error"));

    const result = await tambahAbsensi("123456");

    expect(result).toEqual({
      success: false,
      message: "Terjadi kesalahan saat menyimpan absensi!",
    });
  });
});
