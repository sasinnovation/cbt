import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth/middleware";

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded || decoded.role !== "TEACHER") {
      return NextResponse.json(
        { error: "Unauthorized - teachers only" },
        { status: 403 }
      );
    }

    const teacher = await prisma.teacher.findUnique({
      where: { userId: decoded.id },
      include: {
        school: {
          select: {
            id: true,
            name: true,
            _count: {
              select: {
                students: true,
                teachers: true,
              },
            },
          },
        },
      },
    });

    if (!teacher) {
      return NextResponse.json(
        { error: "Teacher not found" },
        { status: 404 }
      );
    }

    // Get statistics
    const exams = await prisma.exam.findMany({
      where: { createdById: teacher.id },
      include: {
        _count: {
          select: {
            questions: true,
            results: true,
          },
        },
      },
    });

    const totalStudents = teacher.school._count.students;
    const totalExams = exams.length;
    const totalResults = exams.reduce((sum, e) => sum + e._count.results, 0);
    const averageScore =
      totalResults > 0
        ? (
            await prisma.result.aggregate({
              where: { schoolId: teacher.schoolId },
              _avg: { score: true },
            })
          )._avg.score || 0
        : 0;

    return NextResponse.json({
      success: true,
      dashboard: {
        teacher: {
          id: teacher.id,
          name: teacher.user?.fullName,
        },
        school: teacher.school,
        statistics: {
          totalStudents,
          totalExams,
          totalResults,
          averageScore: Math.round(averageScore * 100) / 100,
        },
        recentExams: exams.slice(0, 5),
      },
    });
  } catch (error) {
    console.error("Admin dashboard error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
