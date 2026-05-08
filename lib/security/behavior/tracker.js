export function trackBehavior(event) {
  return {
    type: event.type,
    timestamp: Date.now(),
    examId: event.examId,
    studentId: event.studentId
  }
}
