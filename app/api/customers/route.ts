import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import user from "@/models/user";

export async function GET(req: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const skip = (page - 1) * limit;

const users = await user.find().select("-password").skip(skip).limit(limit);
    const total = await user.countDocuments();

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