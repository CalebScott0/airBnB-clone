import { prisma } from "../../libs/prismadb";
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
        {
          error:
            "An account with this email address already exists. Please log in or use a different email to register.",
        },
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

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      { status: 500 },
    );
  }
}
