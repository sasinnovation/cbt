export function scheduleExam(exam, time) {
  return {
    exam,
    scheduledAt: time,
    status: 'PENDING'
  }
}
