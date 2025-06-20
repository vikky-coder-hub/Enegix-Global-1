import Admin from "@/models/Admin.models";
import connectDb from "@/db/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    await connectDb();

    const reqBody = await request.json();
    const { email, password } = reqBody;

    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      throw new Error("Admin not found");
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: admin._id,
        email: admin.email,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1d", // Token expiration time
      }
    );

    // set in cookies

    const response = NextResponse.json({
        message : "Login successful",
        success : true
    })

    if(token) {
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24, // 1 day
        })
    }

    return response;

  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message, success: false },
        { status: 400 }
      );
    }
  }
}
