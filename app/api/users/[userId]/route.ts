import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } },
) {
  const { userId } = params;
  try {
    const user = await prismadb.user.findUnique({
      where: { id: userId },
    });
    return NextResponse.json(user);
  } catch (error) {
    console.error("[USER_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { userId: string } },
) {
  try {
    const { userId } = params;
    if (!userId) {
      return new NextResponse(
        "User ID must be provided for updating the user profile",
        { status: 400 },
      );
    }

    const body = await req.json();
    const { name, surname, planet, role } = body;

    const updateData: any = {};
    if (name) updateData.name = name;
    if (surname) updateData.surname = surname;
    if (planet) updateData.planet = planet;
    if (role) updateData.role = role.toUpperCase();

    const user = await prismadb.user.update({
      where: { id: userId },
      data: updateData,
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("[USER_UPDATE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
