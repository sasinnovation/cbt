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

    const { examId, answers, timeSpent } = await req.json();

    if (!examId || !answers) {
      return NextResponse.json(
        { error: "examId and answers required" },
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

    // Get exam
    const exam = await prisma.exam.findUnique({
      where: { id: examId },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });

    if (!exam) {
      return NextResponse.json({ error: "Exam not found" }, { status: 404 });
    }

    // Calculate score
    let totalScore = 0;
    const answerDetails = [];

    for (const [questionId, selectedOptionId] of Object.entries(answers)) {
      const question = exam.questions.find((q) => q.id === questionId);
      if (!question) continue;

      const correctOption = question.options.find((o) => o.isCorrect);
      const isCorrect = selectedOptionId === correctOption?.id;

      if (isCorrect) {
        totalScore += question.marks || 1;
      }

      answerDetails.push({
        questionId,
        selectedOptionId: selectedOptionId as string,
        isCorrect,
        marks: isCorrect ? question.marks || 1 : 0,
      });
    }

    // Create exam submission
    




const submission = await prisma.examSubmission.create({
  data: {
    answers: JSON.stringify(answerDetails),
    score: totalScore,
    totalMarks: exam.totalMarks,
    percentage: (totalScore / exam.totalMarks) * 100,
    grade:
      totalScore >= 70
        ? "A"
        : totalScore >= 60
        ? "B"
        : totalScore >= 50
        ? "C"
        : "F",

    timeSpent: Number(timeSpent || 0),
    status: "SUBMITTED",

    student: {
      connect: {
        id: String(student.id),
      },
    },

    exam: {
      connect: {
        id: String(examId),
      },
    },
  },
});






    // Create result record
    const resultPercentage = (totalScore / exam.totalMarks) * 100;
    const resultGrade =
      totalScore >= exam.totalMarks * 0.7
        ? "A"
        : totalScore >= exam.totalMarks * 0.6
        ? "B"
        : totalScore >= exam.totalMarks * 0.5
        ? "C"
        : "F";

    const result = await prisma.result.create({
      data: {
        studentId: student.id,
        examId: examId,
        schoolId: student.schoolId,
        score: totalScore,
        totalMarks: exam.totalMarks,
        percentage: resultPercentage,
        grade: resultGrade,
        status: "COMPLETED",
        answers: JSON.stringify(answerDetails),
        timeSpent: Number(timeSpent || 0),
      },
    });

    return NextResponse.json(
      {
        success: true,
        submission: {
          id: submission.id,
          score: submission.score,
          totalMarks: submission.totalMarks,
          percentage: (totalScore / exam.totalMarks) * 100,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Submit exam error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

function calculateGrade(percentage: number): string {
  if (percentage >= 90) return "A";
  if (percentage >= 80) return "B";
  if (percentage >= 70) return "C";
  if (percentage >= 60) return "D";
  return "F";
}











