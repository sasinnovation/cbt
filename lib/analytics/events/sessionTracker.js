export function trackExamSession(session) {
  return {
    sessionId: session.sessionId,
    studentId: session.studentId,
    examId: session.examId,
    startTime: session.startTime,
    endTime: session.endTime || null,
    status: session.status || 'ACTIVE'
  };
}
