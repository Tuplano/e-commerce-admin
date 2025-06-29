import { NextResponse, NextRequest } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/user";

// DELETE User
export async function DELETE(
  request: NextRequest,
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
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const userId = params.id;
  const body = await request.json();

  try {
    await connectToDatabase();

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "User updated successfully", data: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating User:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}
