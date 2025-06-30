import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/user";

// DELETE User
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const userId = params.id;

  try {
    await connectToDatabase();

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "User deleted successfully", data: deletedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting User:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}

// PATCH (Update) User
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const userId = params.id;
  const body = await req.json();
  const { username, email, contact, address } = body;

  try {
    await connectToDatabase();

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    user.username = username ?? user.username;
    user.email = email ?? user.email;
    user.contact = contact ?? user.contact;
    user.address = address ?? user.address;
    user.updatedAt = new Date(); 

    const updatedUser = await user.save(); 

    return NextResponse.json(
      { message: "User updated successfully", data: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}
