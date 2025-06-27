import connectToDatabase from "@/lib/mongodb";
import Admin from "@/models/admin";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookie from "cookie";

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function POST(req: Request): Promise<Response> {
  await connectToDatabase();

  const { email, password }: { email: string; password: string } =
    await req.json();

  const admin = await Admin.findOne({ email });
  if (!admin) {
    return new Response(
      JSON.stringify({ message: "Invalid email or password" }),
      {
        status: 401,
      }
    );
  }

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    return new Response(
      JSON.stringify({ message: "Invalid email or password" }),
      {
        status: 401,
      }
    );
  }

  const token = jwt.sign(
    {
      id: admin._id.toString(),
      email: admin.email,
      role: "admin",
    },
    JWT_SECRET,
    { expiresIn: "1d" }
  );

  const cookieHeader = cookie.serialize("adminToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24,
    path: "/",
  });

  return new Response(JSON.stringify({ message: "Login successful", token }), {
    status: 200,
    headers: {
      "Set-Cookie": cookieHeader,
      "Content-Type": "application/json",
    },
  });
}
