import {
  createExamSession,
  submitAnswer,
  isExamFinished
} from "@/lib/examSession"

describe("Exam Engine", () => {

  const exam = {
    id: "1",
    questions: [
      {
        id: "q1",
        answer: "4"
      }
    ]
  }

  test("should create session", () => {

    const session = createExamSession(exam)

    expect(session.examId).toBe("1")

  })

  test("should submit answer", () => {

    const session = createExamSession(exam)

    submitAnswer(session, "q1", "4")

    expect(session.answers["q1"]).toBe("4")

  })

  test("should finish exam", () => {

    const session = createExamSession(exam)

    submitAnswer(session, "q1", "4")

    expect(isExamFinished(session, exam)).toBe(true)

  })
})
