import { db } from "@/app/lib/db";

import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(request) {
  const { user_name, password } = await request.json();

  try {
    const [rows] = await db.execute("SELECT * FROM user WHERE user_name = ?", [
      user_name,
    ]);

    if (rows.length === 0) {
      return Response.json(
        {
          success: false,
          message: "User tidak ditemukan",
        },
        {
          status: 404,
        }
      );
    }
    const user = rows[0];
    if (user.password !== password) {
      return Response.json(
        {
          success: false,
          message: "Password salah",
        },
        {
          status: 401,
        }
      );
    }

    const token = jwt.sign(
      {
        id: user.id,
        user_name: user.user_name,
      },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    return Response.json({
      success: true,
      message: "Login berhasil",
      token: token,
    });
  } catch (error) {
    console.log("Login error", error);
    return Response.json(
      {
        success: false,
        message: "Terjadi kesalahan server",
      },
      {
        status: 500,
      }
    );
  }
}
