import { PUT } from "@/app/api/pengguna/update/route"; // sesuaikan path
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

// Mock db dan jwt
jest.mock("@/app/lib/db", () => ({
  db: {
    execute: jest.fn(),
  },
}));

jest.mock("jsonwebtoken", () => ({
  verify: jest.fn(),
}));

const createMockRequest = (token = null, body = {}) => {
  return {
    headers: {
      get: (key) =>
        key === "authorization" && token ? `Bearer ${token}` : null,
    },
    json: jest.fn().mockResolvedValue(body),
  };
};

describe("PUT /api/pengguna", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 401 if token is missing", async () => {
    const req = createMockRequest(null);
    const res = await PUT(req);
    const json = await res.json();

    expect(res.status).toBe(401);
    expect(json.error).toBe("Unauthorized");
  });

  it("should return 403 if token is invalid", async () => {
    jwt.verify.mockImplementation(() => {
      throw new Error("Invalid token");
    });

    const req = createMockRequest("invalid.token.here");
    const res = await PUT(req);
    const json = await res.json();

    expect(res.status).toBe(403);
    expect(json.error).toBe("Token tidak valid");
  });

  it("should return 404 if no rows updated", async () => {
    jwt.verify.mockReturnValue({ id: 1 });

    db.execute.mockResolvedValueOnce([{ affectedRows: 0 }]);

    const req = createMockRequest("valid.token", {
      id: 123,
      nama: "Tes",
      tipe: "admin",
      email: "tes@mail.com",
    });

    const res = await PUT(req);
    const json = await res.json();

    expect(res.status).toBe(404);
    expect(json.error).toBe("Data tidak ditemukan");
  });

  it("should return success if update is successful", async () => {
    jwt.verify.mockReturnValue({ id: 1 });

    db.execute.mockResolvedValueOnce([{ affectedRows: 1 }]);

    const req = createMockRequest("valid.token", {
      id: 123,
      nama: "Tes",
      tipe: "admin",
      email: "tes@mail.com",
      no_hp: "08123456789",
      alamat: "Alamat",
      nim: "12345678",
      jurusan: "Informatika",
      angkatan: "2021",
      jk: "L",
    });

    const res = await PUT(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.message).toBe("Data berhasil diperbarui");
  });

  it("should return 500 on server error", async () => {
    jwt.verify.mockReturnValue({ id: 1 });

    db.execute.mockImplementation(() => {
      throw new Error("DB Error");
    });

    const req = createMockRequest("valid.token", {
      id: 123,
      nama: "Tes",
      tipe: "admin",
      email: "tes@mail.com",
    });

    const res = await PUT(req);
    const json = await res.json();

    expect(res.status).toBe(500);
    expect(json.error).toBe("Gagal update data");
    expect(json.detail).toBe("DB Error");
  });
});
