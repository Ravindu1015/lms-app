import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Adjust path if needed
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const { name, email, password, role } = await req.json();
  if (!name || !email || !password || !role)
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  const hashed = bcrypt.hashSync(password, 10);

  try {
    const user = await prisma.user.create({
      data: { name, email, password: hashed, role }
    });
    return NextResponse.json({ user }, { status: 201 });
  } catch (e: any) {
    if (e.code === "P2002") { // Prisma unique constraint error
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }
    return NextResponse.json({ error: "Registration failed." }, { status: 500 });
  }
}
