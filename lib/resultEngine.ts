export function calculateScore(answers: any, exam: any) {
  let score = 0

  exam.questions.forEach((q: any) => {
    if (answers[q.id] === q.answer) {
      score++
    }
  })

  return {
    score,
    total: exam.questions.length,
    percentage: (score / exam.questions.length) * 100
  }
}

export function exportResult(format: "pdf" | "json", data: any) {
  if (format === "json") return JSON.stringify(data, null, 2)
  return "PDF_EXPORT_PLACEHOLDER"
}

