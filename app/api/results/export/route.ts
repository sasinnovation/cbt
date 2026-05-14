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

    const { examId, format } = Object.fromEntries(
      new URL(req.url).searchParams
    );

    if (!examId) {
      return NextResponse.json(
        { error: "examId query parameter required" },
        { status: 400 }
      );
    }

    // Get exam and results
    const exam = await prisma.exam.findUnique({
      where: { id: examId },
      include: {
        results: {
          include: {
            student: {
              select: {
                studentId: true,
                user: {
                  select: {
                    fullName: true,
                    email: true,
                  },
                },
              },
            },
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!exam) {
      return NextResponse.json({ error: "Exam not found" }, { status: 404 });
    }

    if (format === "csv") {
      // Generate CSV
      const headers = [
        "Student ID",
        "Name",
        "Email",
        "Score",
        "Total Marks",
        "Percentage",
        "Grade",
        "Date",
      ];
      const rows = exam.results.map((r) => [
        r.student.studentId,
        r.student.user.fullName,
        r.student.user.email,
        r.score,
        r.totalMarks,
        r.percentage.toFixed(2),
        r.grade,
        new Date(r.createdAt).toLocaleDateString(),
      ]);

      const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");

      return new NextResponse(csv, {
        status: 200,
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="exam-report-${examId}.csv"`,
        },
      });
    }

    // Default: JSON format
    return NextResponse.json({
      success: true,
      report: {
        exam: {
          id: exam.id,
          title: exam.title,
          totalMarks: exam.totalMarks,
          duration: exam.duration,
        },
        results: exam.results.map((r) => ({
          studentId: r.student.studentId,
          name: r.student.user.fullName,
          email: r.student.user.email,
          score: r.score,
          totalMarks: r.totalMarks,
          percentage: Math.round(r.percentage * 100) / 100,
          grade: r.grade,
          date: r.createdAt,
        })),
      },
    });
  } catch (error) {
    console.error("Export report error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
