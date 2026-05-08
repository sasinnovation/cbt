export function emitExamEvent(event) {
  return {
    type: event.type,
    studentId: event.studentId,
    examId: event.examId,
    questionId: event.questionId || null,
    timestamp: Date.now(),
    payload: event.payload || {}
  };
}
