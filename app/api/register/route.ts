import { prisma } from "@/app/libs/prismadb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password } = body;

    if (
      await prisma.user.findUnique({
        where: {
          email,
        },
      })
    ) {
      return NextResponse.json(
        { error: "Account exists with that email." },
        { status: 409 },
      );
    }

    const hashed_password = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashed_password,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      { status: 500 },
    );
  }
}
