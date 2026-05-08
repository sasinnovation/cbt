export function createExamFlow(config) {
  return {
    status: 'SCHEDULED',
    subject: config.subject,
    startTime: config.startTime,
    endTime: config.endTime
  }
}
