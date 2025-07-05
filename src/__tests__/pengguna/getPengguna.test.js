// 1️⃣ Mock semua modul eksternal
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

jest.mock("jsonwebtoken", () => ({
  verify: jest.fn(),
}));

import { GET } from "@/app/api/pengguna/route"; // ganti path sesuai kamu
import { db } from "@/app/lib/db";
import jwt from "jsonwebtoken";

describe("API GET /pengguna", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // 2️⃣ Tidak ada token
  it("harus gagal jika tidak ada token", async () => {
    const request = {
      headers: {
        get: () => null, // tidak ada header authorization
      },
    };

    const response = await GET(request);
    const json = await response.json();

    expect(response.status).toBe(401);
    expect(json).toEqual({ error: "Unauthorized" });
  });

  // 3️⃣ Token tidak valid
  it("harus gagal jika token tidak valid", async () => {
    const request = {
      headers: {
        get: () => "Bearer salahToken123",
      },
    };

    jwt.verify.mockImplementation(() => {
      throw new Error("invalid token");
    });

    const response = await GET(request);
    const json = await response.json();

    expect(response.status).toBe(403);
    expect(json).toEqual({ error: "Token tidak valid" });
  });

  // 4️⃣ Token valid & ambil data berhasil
  it("harus berhasil jika token valid dan query sukses", async () => {
    const request = {
      headers: {
        get: () => "Bearer tokenBenar123",
      },
    };

    jwt.verify.mockReturnValue({ id: 1, role: "admin" }); // token valid
    db.execute.mockResolvedValueOnce([[{ id: 1, nama: "Budi" }]]); // data dummy

    const response = await GET(request);
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json).toEqual({
      success: true,
      data: [{ id: 1, nama: "Budi" }],
    });
  });

  // 5️⃣ Token valid tapi query error
  it("harus gagal jika terjadi error saat query", async () => {
    const request = {
      headers: {
        get: () => "Bearer tokenBenar123",
      },
    };

    jwt.verify.mockReturnValue({ id: 1 });
    db.execute.mockRejectedValue(new Error("DB error"));

    const response = await GET(request);
    const json = await response.json();

    expect(response.status).toBe(500);
    expect(json).toEqual({
      error: "Gagal mengambil data pengunjung umum",
      detail: "DB error",
    });
  });
});
