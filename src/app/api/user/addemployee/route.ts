import connectDb from "@/db/dbConfig";
import User from "@/models/User.models";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const reqBody = await request.json();

  const { email } = reqBody;

  try {
    await connectDb();

    const existedUser = await User.findOne({ email });

    if (existedUser) {
      throw new Error("User already exists");
    }

    // create new employee
    const newEmployee = await User.create(reqBody);

    if (!newEmployee) {
      throw new Error("Failed to create employee");
    }

    return NextResponse.json(
      {
        message: "Employee added successfully",
        employee: newEmployee,
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
