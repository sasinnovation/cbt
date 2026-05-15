import { calculateScore } from "@/lib/resultEngine"

describe("Result Engine", () => {

  test("should calculate correct score", () => {

    const exam = {
      questions: [
        {
          id: "q1",
          answer: "4"
        }
      ]
    }

    const result = calculateScore(
      { q1: "4" },
      exam
    )

    expect(result.score).toBe(1)

  })
})

