import { GET } from "@/app/api/rekap/route"; // ✅ sesuaikan path sesuai project
import { db } from "@/app/lib/db";
import jwt from "jsonwebtoken";

// Mock NextResponse
jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn((data, init) => ({
      status: init?.status || 200,
      json: async () => data,
    })),
  },
}));

// Mock dependencies
jest.mock("@/app/lib/db", () => ({
  db: {
    execute: jest.fn(),
  },
}));

jest.mock("jsonwebtoken", () => ({
  verify: jest.fn(),
}));

// Helper mock request
const createMockRequest = (token = null, tahun = null) => {
  const url = new URL(`http://localhost/api/absensi${tahun ? `?tahun=${tahun}` : ""}`);
  return {
    headers: {
      get: (key) =>
        key === "authorization" && token ? `Bearer ${token}` : null,
    },
    url: url.href,
  };
};

describe("GET /api/absensi?tahun=YYYY", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 401 if token is missing", async () => {
    const req = createMockRequest(null, 2024);
    const res = await GET(req);
    const json = await res.json();

    expect(res.status).toBe(401);
    expect(json.error).toBe("Unauthorized");
  });

  it("should return 500 if token is invalid", async () => {
    // Karena tidak ada try-catch di sekitar jwt.verify,
    // maka jika error dilempar, akan ditangkap oleh catch global → 500
    jwt.verify.mockImplementation(() => {
      throw new Error("invalid token");
    });

    const req = createMockRequest("invalid.token", 2024);
    const res = await GET(req);
    const json = await res.json();

    expect(res.status).toBe(500);
    expect(json.error).toBe("Gagal mengambil data absensi");
    expect(json.detail).toBe("invalid token");
  });

  it("should return 400 if tahun is missing or invalid", async () => {
    jwt.verify.mockReturnValue({ id: 1 });

    const req = createMockRequest("valid.token", "abc"); // invalid tahun
    const res = await GET(req);
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.error).toBe("Tahun tidak valid");
  });

  it("should return success if data exists", async () => {
    jwt.verify.mockReturnValue({ id: 1 });

    const mockData = [
      {
        absensi_id: 1,
        waktu: "2024-01-01T08:00:00Z",
        pengguna_id: 10,
        nama: "John Doe",
        rfid: "123456",
        tipe: "admin",
        email: "john@example.com",
        no_hp: "08123456789",
        alamat: "Jl. Contoh",
        nim: "20201234",
        jurusan: "Informatika",
        angkatan: "2020",
        jenis_kelamin: "L",
      },
    ];

    db.execute.mockResolvedValueOnce([mockData]);

    const req = createMockRequest("valid.token", 2024);
    const res = await GET(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.data).toEqual(mockData);
  });

  it("should return 500 if db throws error", async () => {
    jwt.verify.mockReturnValue({ id: 1 });

    db.execute.mockImplementation(() => {
      throw new Error("DB ERROR");
    });

    const req = createMockRequest("valid.token", 2024);
    const res = await GET(req);
    const json = await res.json();

    expect(res.status).toBe(500);
    expect(json.error).toBe("Gagal mengambil data absensi");
    expect(json.detail).toBe("DB ERROR");
  });
});
