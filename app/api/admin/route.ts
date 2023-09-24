import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const users = await prismadb.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    console.error("[USERS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, surname, planet, role, email } = body;

    // Zorunlu alanlar
    const requiredFields = [name, surname, planet, email];
    if (requiredFields.some((field) => !field)) {
      return new NextResponse(
        "All fields including email must be provided for creating a new user",
        { status: 400 },
      );
    }

    // E-posta kontrolü
    const existingUser = await prismadb.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return new NextResponse("Email already exists", { status: 400 });
    }

    // İsteğe bağlı alanlar için veri nesnesi oluşturma
    const createData: any = {};
    if (name) createData.name = name;
    if (surname) createData.surname = surname;
    if (planet) createData.planet = planet;
    if (role) createData.role = role; // İsteğe bağlı
    if (email) createData.email = email;

    // Yeni kullanıcı oluşturma
    const newUser = await prismadb.user.create({
      data: createData,
    });

    return NextResponse.json(newUser);
  } catch (error) {
    console.error("[USER_CREATE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
