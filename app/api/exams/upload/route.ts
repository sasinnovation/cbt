import { NextResponse } from "next/server"
import { createExam } from "@/lib/examRegistry"

export async function POST(req: Request) {
  const formData = await req.formData()

  const title = formData.get("title") as string
  const file = formData.get("file") as File

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
  }

  const exam = createExam({
    id: Date.now().toString(),
    title,
    class: "SS1",
    duration: 60,
    questions: [],
    createdAt: new Date().toISOString()
  })

  return NextResponse.json({
    message: "Exam uploaded successfully",
    exam
  })
}

