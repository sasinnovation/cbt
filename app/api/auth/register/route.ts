import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function POST(req: NextRequest) {
  try {
    const { email, password, fullName, role, schoolCode } = await req.json();

    if (!email || !password || !fullName) {
      return NextResponse.json(
        { error: "Email, password, and fullName required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    // Get school if provided
    let school = null;
    if (schoolCode) {
      school = await prisma.school.findUnique({
        where: { shortCode: schoolCode },
      });
    }

    // Hash password
    const hashedPassword = await hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        fullName,
        role: role || "STUDENT",
      },
      include: {
        student: true,
        teacher: true,
      },
    });

    // If role is STUDENT and school exists, create student record
    if (role === "STUDENT" && school) {
      await prisma.student.create({
        data: {
          userId: user.id,
          schoolId: school.id,
          studentId: `STU-${Date.now()}`,
        },
      });
    }

    // If role is TEACHER and school exists, create teacher record
    if (role === "TEACHER" && school) {
      await prisma.teacher.create({
        data: {
          userId: user.id,
          schoolId: school.id,
          employeeId: `TCH-${Date.now()}`,
        },
      });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return NextResponse.json(
      {
        success: true,
        token,
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
