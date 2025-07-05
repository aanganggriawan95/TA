import { DELETE } from "@/app/api/pengguna/delete/route"; // Sesuaikan jika path berbeda
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

// Helper
const createMockRequest = (token = null, id = null) => {
  const url = new URL("http://localhost/api/pengguna" + (id ? `?id=${id}` : ""));
  return {
    headers: {
      get: (key) =>
        key === "authorization" && token ? `Bearer ${token}` : null,
    },
    url: url.href,
  };
};

describe("DELETE /api/pengguna", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 401 if token is missing", async () => {
    const req = createMockRequest(null);
    const res = await DELETE(req);
    const json = await res.json();

    expect(res.status).toBe(401);
    expect(json.error).toBe("Unauthorized");
  });

  it("should return 403 if token is invalid", async () => {
    jwt.verify.mockImplementation(() => {
      throw new Error("Invalid token");
    });

    const req = createMockRequest("invalid.token");
    const res = await DELETE(req);
    const json = await res.json();

    expect(res.status).toBe(403);
    expect(json.error).toBe("Token tidak valid");
  });

  it("should return 400 if id not provided", async () => {
    jwt.verify.mockReturnValue({ id: 1 });

    const req = createMockRequest("valid.token");
    const res = await DELETE(req);
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.error).toBe("ID tidak boleh kosong");
  });

  it("should return 404 if no data deleted", async () => {
    jwt.verify.mockReturnValue({ id: 1 });

    db.execute.mockResolvedValueOnce([{ affectedRows: 0 }]);

    const req = createMockRequest("valid.token", 123);
    const res = await DELETE(req);
    const json = await res.json();

    expect(res.status).toBe(404);
    expect(json.error).toBe("Data tidak ditemukan");
  });

  it("should return success if data is deleted", async () => {
    jwt.verify.mockReturnValue({ id: 1 });

    db.execute.mockResolvedValueOnce([{ affectedRows: 1 }]);

    const req = createMockRequest("valid.token", 123);
    const res = await DELETE(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.message).toBe("Data berhasil dihapus");
  });

  it("should return 500 on server error", async () => {
    jwt.verify.mockReturnValue({ id: 1 });

    db.execute.mockImplementation(() => {
      throw new Error("DB ERROR");
    });

    const req = createMockRequest("valid.token", 123);
    const res = await DELETE(req);
    const json = await res.json();

    expect(res.status).toBe(500);
    expect(json.error).toBe("Gagal menghapus data");
    expect(json.detail).toBe("DB ERROR");
  });
});
