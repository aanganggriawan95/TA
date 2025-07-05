import { POST } from "@/app/api/tambah/pengguna/route"; // ganti sesuai path kamu
import { db } from "@/app/lib/db";

jest.mock("next/server", () => ({
  NextResponse: {
    json: (data, init) => ({
      status: init?.status || 200,
      json: async () => data,
    }),
  },
}));


jest.mock("@/app/lib/db", () => ({
  db: {
    execute: jest.fn(),
  },
}));

describe("API POST /pengguna", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("harus gagal jika data tidak lengkap", async () => {
    const request = {
      json: async () => ({
        nama: "Budi",
        rfid: "", // rfid kosong
      }),
    };

    const response = await POST(request);
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json).toEqual({
      success: false,
      message: "Data tidak lengkap",
    });
  });

  it("harus gagal jika RFID sudah terdaftar", async () => {
    db.execute.mockResolvedValueOnce([[{ id: 1, rfid: "123456" }]]); // SELECT pengguna: RFID sudah ada

    const request = {
      json: async () => ({
        rfid: "123456",
        nama: "Budi",
        tipe: "mahasiswa",
        email: "budi@mail.com",
        no_hp: "08123456",
        alamat: "Bandung",
        nim: "123456789",
        prodi: "TI",
        angkatan: "2021",
        jenisKelamin: "L",
      }),
    };

    const response = await POST(request);
    const json = await response.json();

    expect(response.status).toBe(409);
    expect(json).toEqual({
      success: false,
      message: "RFID sudah terdaftar.",
    });
  });

  it("harus berhasil tambah pengguna", async () => {
    db.execute
      .mockResolvedValueOnce([[]]) // SELECT pengguna: kosong → belum ada
      .mockResolvedValueOnce([{ insertId: 10 }]); // INSERT pengguna

    const request = {
      json: async () => ({
        rfid: "654321",
        nama: "Sari",
        tipe: "mahasiswa",
        email: "sari@mail.com",
        no_hp: "08123456789",
        alamat: "Yogyakarta",
        nim: "2021123456",
        prodi: "SI",
        angkatan: "2021",
        jenisKelamin: "P",
      }),
    };

    const response = await POST(request);
    const json = await response.json();

    expect(response.status).toBe(201);
    expect(json).toEqual({
      success: true,
      message: "Pengguna berhasil ditambahkan",
      data: {
        id: 10,
        rfid: "654321",
        nama: "Sari",
        tipe: "mahasiswa",
      },
    });
  });

  it("harus gagal jika terjadi error saat query", async () => {
    db.execute.mockRejectedValue(new Error("DB error"));

    const request = {
      json: async () => ({
        rfid: "999999",
        nama: "Error User",
        tipe: "admin",
        email: "error@mail.com",
        no_hp: "0800000000",
        alamat: "Jakarta",
        nim: "999999",
        prodi: "IF",
        angkatan: "2020",
        jenisKelamin: "L",
      }),
    };

    const response = await POST(request);
    const json = await response.json();

    expect(response.status).toBe(500);
    expect(json).toEqual({
      success: false,
      message: "Terjadi kesalahan server",
    });
  });
});
