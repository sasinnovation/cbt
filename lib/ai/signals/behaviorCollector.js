export function collectBehavior(event) {
  return {
    type: event.type,
    timestamp: Date.now(),
    examId: event.examId,
    studentId: event.studentId,
    metadata: event.metadata || {}
  };
}
