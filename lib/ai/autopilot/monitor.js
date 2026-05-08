export function monitorExam(session) {
  return {
    active: true,
    flaggedEvents: session.flags || 0,
    status: 'MONITORING'
  }
}
