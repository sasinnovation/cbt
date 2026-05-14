import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { name, shortCode } = await req.json();

    if (!name || !shortCode) {
      return NextResponse.json(
        { error: "name and shortCode required" },
        { status: 400 }
      );
    }

    // Check if school already exists
    const existing = await prisma.school.findUnique({
      where: { shortCode },
    });

    if (existing) {
      return NextResponse.json(
        { error: "School already exists" },
        { status: 409 }
      );
    }

    const school = await prisma.school.create({
      data: {
        name,
        shortCode,
      },
    });

    return NextResponse.json(
      { success: true, school },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create school error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const schools = await prisma.school.findMany({
      include: {
        _count: {
          select: {
            students: true,
            teachers: true,
            exams: true,
          },
        },
      },
    });

    return NextResponse.json({ success: true, schools });
  } catch (error) {
    console.error("Get schools error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
