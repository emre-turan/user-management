import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import * as z from "zod";

// Define a schema for input validation
const userSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  surname: z.string().min(1, "Surname is required").max(100),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have than 8 characters"),
});

///Register
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, name, surname } = userSchema.parse(body);

    const existingUserByMail = await prismadb.user.findUnique({
      where: { email: email },
    });
    if (existingUserByMail) {
      return NextResponse.json(
        { user: null, message: "Email already exists" },
        { status: 409 },
      );
    }

    const hashPassword = await hash(password, 10);
    const newUser = await prismadb.user.create({
      data: {
        name,
        surname,
        email,
        password: hashPassword,
      },
    });

    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json(
      { user: rest, message: "User created" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error in POST /api/users:", error);
    return NextResponse.json(
      { message: "Something Went Wrong" },
      { status: 500 },
    );
  }
}

export async function GET(req: Request) {
  try {
    const users = await prismadb.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    console.error("[USERS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
