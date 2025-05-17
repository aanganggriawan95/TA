import { POST } from "@/app/api/login/route";
import jwt from "jsonwebtoken";

// Mock db dan jwt
jest.mock("@/app/lib/db", () => ({
  db: {
    execute: jest.fn(),
  },
}));

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
}));

const { db } = require("@/app/lib/db");

describe("POST /api/login", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Simulasi request Next.js API
  const mockRequest = (body) => ({
    json: () => Promise.resolve(body),
  });

  it("should return 404 if user not found", async () => {
    db.execute.mockResolvedValue([[]]); // Tidak ada user

    const request = mockRequest({ user_name: "testuser", password: "1234" });
    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(404);
    expect(data.success).toBe(false);
    expect(data.message).toBe("User tidak ditemukan");
  });

  it("should return 401 if password is wrong", async () => {
    db.execute.mockResolvedValue([
      [{ id: 1, user_name: "testuser", password: "wrongpassword" }],
    ]);

    const request = mockRequest({ user_name: "testuser", password: "1234" });
    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(401);
    expect(data.success).toBe(false);
    expect(data.message).toBe("Password salah");
  });

  it("should return token if login is successful", async () => {
    db.execute.mockResolvedValue([
      [{ id: 1, user_name: "testuser", password: "1234" }],
    ]);
    jwt.sign.mockReturnValue("mocked-token");

    const request = mockRequest({ user_name: "testuser", password: "1234" });
    const response = await POST(request);
    const data = await response.json();

    expect(jwt.sign).toHaveBeenCalledWith(
      { id: 1, user_name: "testuser" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    expect(data.success).toBe(true);
    expect(data.message).toBe("Login berhasil");
    expect(data.token).toBe("mocked-token");
  });

  it("should return 500 if DB error occurs", async () => {
    db.execute.mockRejectedValue(new Error("DB Error"));

    const request = mockRequest({ user_name: "testuser", password: "1234" });
    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.success).toBe(false);
    expect(data.message).toBe("Terjadi kesalahan server");
  });
});
