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
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Verify user is a teacher
    if (decoded.role !== "TEACHER") {
      return NextResponse.json(
        { error: "Only teachers can create exams" },
        { status: 403 }
      );
    }

    const { title, description, duration, totalMarks, questions } =
      await req.json();

    if (!title || !duration || !totalMarks) {
      return NextResponse.json(
        { error: "title, duration, and totalMarks required" },
        { status: 400 }
      );
    }

    // Get teacher info
    const teacher = await prisma.teacher.findUnique({
      where: { userId: decoded.id },
    });

    if (!teacher) {
      return NextResponse.json(
        { error: "Teacher not found" },
        { status: 404 }
      );
    }

    // Create exam with questions
    const exam = await prisma.exam.create({
      data: {
        title,
        description,
        duration,
        totalMarks,
        schoolId: teacher.schoolId,
        createdById: teacher.id,
        status: "DRAFT",
        questions: {
          create: questions?.map((q: any) => ({
            text: q.text,
            marks: q.marks || 1,
            type: q.type || "MCQ",
            options: {
              create: q.options?.map((o: any) => ({
                text: o.text,
                isCorrect: o.isCorrect || false,
              })),
            },
          })),
        },
      },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });

    return NextResponse.json(
      { success: true, exam },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create exam error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Get teacher's exams
    const teacher = await prisma.teacher.findUnique({
      where: { userId: decoded.id as string },
    });

    if (!teacher) {
      return NextResponse.json(
        { error: "Teacher not found" },
        { status: 404 }
      );
    }

    const exams = await prisma.exam.findMany({
      where: { createdById: teacher.id },
      include: {
        questions: true,
        results: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, exams });
  } catch (error) {
    console.error("Get exams error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
