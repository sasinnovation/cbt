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
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Get user with student details
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      include: {
        student: {
          include: {
            school: {
              select: {
                id: true,
                name: true,
              },
            },
            results: {
              select: {
                exam: {
                  select: {
                    id: true,
                    title: true,
                  },
                },
                score: true,
                percentage: true,
                grade: true,
              },
              take: 10,
              orderBy: { createdAt: "desc" },
            },
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      profile: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        student: user.student
          ? {
              id: user.student.id,
              studentId: user.student.studentId,
              school: user.student.school,
              recentResults: user.student.results,
              averageScore:
                user.student.results.length > 0
                  ? (
                      user.student.results.reduce((sum, r) => sum + r.score, 0) /
                      user.student.results.length
                    ).toFixed(2)
                  : 0,
            }
          : null,
      },
    });
  } catch (error) {
    console.error("Get profile error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
