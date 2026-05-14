export function createExamSession(exam: any) {
  return {
    examId: exam.id,
    currentIndex: 0,
    answers: {},
    startedAt: Date.now()
  }
}

export function getCurrentQuestion(session: any, exam: any) {
  return exam.questions[session.currentIndex]
}

export function submitAnswer(session: any, questionId: string, answer: string) {
  session.answers[questionId] = answer
  session.currentIndex++
  return session
}

export function isExamFinished(session: any, exam: any) {
  return session.currentIndex >= exam.questions.length
}
