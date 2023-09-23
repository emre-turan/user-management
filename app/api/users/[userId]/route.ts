import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

// GET için
export async function GET(
  req: Request,
  { params }: { params: { userId: string } },
) {
  const { userId } = params;
  try {
    const user = await prismadb.user.findUnique({
      where: { id: Number(userId) },
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
    const { name, surname, planet, bio } = body;

    // Field check
    if (!name || !surname || !planet || !bio) {
      return new NextResponse("All fields are required", { status: 400 });
    }

    // Kullanıcı güncelleme
    const user = await prismadb.user.update({
      where: { id: Number(userId) },
      data: {
        name,
        surname,
        planet,
        bio,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("[USER_UPDATE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
