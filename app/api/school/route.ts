import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth/middleware";

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded || decoded.role !== "SUPER_ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized - super admin access required" },
        { status: 403 }
      );
    }

    const { name, shortCode, motto, address, principal, logoUrl, bannerUrl, theme } = await req.json();

    if (!name || !shortCode) {
      return NextResponse.json(
        { error: "name and shortCode required" },
        { status: 400 }
      );
    }

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
        motto: motto || undefined,
        address: address || undefined,
        principal: principal || undefined,
        logoUrl: logoUrl || undefined,
        bannerUrl: bannerUrl || undefined,
        theme: theme || undefined,
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

export async function GET(req: NextRequest) {
  try {
    const query = new URL(req.url).searchParams;
    const shortCode = query.get("shortCode");

    if (shortCode) {
      const school = await prisma.school.findUnique({
        where: { shortCode },
        select: {
          id: true,
          name: true,
          shortCode: true,
          motto: true,
          address: true,
          principal: true,
          logoUrl: true,
          bannerUrl: true,
          theme: true,
        },
      });

      if (!school) {
        return NextResponse.json({ error: "School not found" }, { status: 404 });
      }

      return NextResponse.json({ success: true, school });
    }

    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded || !["SUPER_ADMIN", "ADMIN"].includes(decoded.role)) {
      return NextResponse.json(
        { error: "Unauthorized - admin access required" },
        { status: 403 }
      );
    }

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

