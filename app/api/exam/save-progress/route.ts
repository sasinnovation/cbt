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

    const { sessionId, answers, currentQuestionId } = await req.json();

    if (!sessionId || !answers) {
      return NextResponse.json(
        { error: "sessionId and answers required" },
        { status: 400 }
      );
    }

    // Get student info
    const student = await prisma.student.findUnique({
      where: { userId: decoded.userId },
    });

    if (!student) {
      return NextResponse.json(
        { error: "Student not found" },
        { status: 404 }
      );
    }

    // Verify session belongs to student
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
    });

    if (!session) {
      return NextResponse.json(
        { error: "Session not found" },
        { status: 404 }
      );
    }

    if (session.studentId !== student.id) {
      return NextResponse.json(
        { error: "Unauthorized - session does not belong to you" },
        { status: 403 }
      );
    }

    if (session.status !== "ACTIVE") {
      return NextResponse.json(
        { error: "Session is not active" },
        { status: 400 }
      );
    }

    // Update session with current progress
    const updatedSession = await prisma.session.update({
      where: { id: sessionId },
      data: {
        answersJson: answers,
        lastSavedAt: new Date(),
      },
    });

    return NextResponse.json(
      { 
        success: true,
        message: "Progress saved",
        session: updatedSession
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Save exam progress error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
