import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { userId: string } },
) {
  try {
    // User ID check
    const { userId } = params;
    if (!userId) {
      return new NextResponse(
        "User ID must be provided for updating the user profile",
        { status: 400 },
      );
    }

    // Request body parsing
    const body = await req.json();
    const { name, surname, planet } = body;

    // Field check
    if (!name || !surname || !planet) {
      return new NextResponse("All fields are required", { status: 400 });
    }

    // Kullanıcı güncelleme
    const user = await prismadb.user.update({
      where: { id: (userId) },
      data: {
        name,
        surname,
        planet,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("[USER_UPDATE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { userId: string } },
) {
  // User ID kontrolü
  const { userId } = params;
  if (!userId) {
    return new NextResponse(
      "User ID must be provided for deleting the user profile",
      { status: 400 },
    );
  }

  try {
    // Kullanıcı silme
    const user = await prismadb.user.delete({
      where: { id:(userId) },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("[USER_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}


