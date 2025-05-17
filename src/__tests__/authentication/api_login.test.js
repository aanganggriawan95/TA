jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn((body, init) => ({
      status: init?.status ?? 200,
      json: () => Promise.resolve(body),
    })),
  },
}));

jest.mock("@/app/lib/db", () => ({
  db: {
    execute: jest.fn(),
  },
}));

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
}));

import { POST } from "@/app/api/login/route";
import { NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import jwt from "jsonwebtoken";

const mockRequest = (body) => ({
  json: () => Promise.resolve(body),
});

describe("POST /api/login", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 404 if user not found", async () => {
    db.execute.mockResolvedValue([[]]);
    const request = mockRequest({ user_name: "testuser", password: "1234" });
    const response = await POST(request);
    const data = await response.json();

    expect(NextResponse.json).toHaveBeenCalledWith(
      {
        success: false,
        message: "User tidak ditemukan",
      },
      { status: 404 }
    );
    expect(response.status).toBe(404);
    expect(data.success).toBe(false);
    expect(data.message).toBe("User tidak ditemukan");
  });

  it("should return 401 if password is wrong", async () => {
    db.execute.mockResolvedValue([
      [{ id: 1, user_name: "testuser", password: "correctpass" }],
    ]);
    const request = mockRequest({
      user_name: "testuser",
      password: "wrongpass",
    });
    const response = await POST(request);
    const data = await response.json();

    expect(NextResponse.json).toHaveBeenCalledWith(
      {
        success: false,
        message: "Password salah",
      },
      { status: 401 }
    );
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
    expect(NextResponse.json).toHaveBeenCalledWith({
      success: true,
      message: "Login berhasil",
      token: "mocked-token",
    });
    expect(data.success).toBe(true);
    expect(data.token).toBe("mocked-token");
  });

  it("should return 500 if DB error occurs", async () => {
    db.execute.mockRejectedValue(new Error("DB Error"));
    const request = mockRequest({ user_name: "testuser", password: "1234" });
    const response = await POST(request);
    const data = await response.json();

    expect(NextResponse.json).toHaveBeenCalledWith(
      {
        success: false,
        message: "Terjadi kesalahan server",
      },
      { status: 500 }
    );
    expect(response.status).toBe(500);
    expect(data.success).toBe(false);
  });
});
