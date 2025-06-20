import connectDb from "@/db/dbConfig";
import Admin from "@/models/Admin.models";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    await connectDb();

    const reqBody = await request.json();
    const { email, password } = reqBody;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      throw new Error("Admin already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      email,
      password: hashedPassword,
    });

    if (!admin) {
      throw new Error("Failed to create admin");
    }

    return NextResponse.json(
      {
        message: "Admin registered successfully",
        admin: {
          id: admin._id,
          email: admin.email,
        },
        success: true,
      },
      {
        status: 201,
      }
    );


  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message, success: false },
        { status: 400 }
      );
    }
  }
}
