import { NextResponse } from "next/server"
import { getExams } from "@/lib/examRegistry"

export async function GET() {
  return NextResponse.json(getExams())
}

