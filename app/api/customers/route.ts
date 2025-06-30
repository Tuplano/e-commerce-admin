import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User  from "@/models/user";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { username, email, contact, address } = body;

    const newUser = new User({
      username,
      email,
      contact,
      address,
    });

    await newUser.save();

    return NextResponse.json(
      { message: "User created successfully", User: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: "Failed to create user", error },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const skip = (page - 1) * limit;

const users = await User.find().select("-password").skip(skip).limit(limit);
    const total = await User.countDocuments();

    return NextResponse.json(
      {
        users,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch user", error },
      { status: 500 }
    );
  }
}