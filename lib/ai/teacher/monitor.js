export function monitorStudent(session) {
  return {
    focus: session.focus || 100,
    risk: session.risk || 'LOW',
    status: 'LIVE_MONITORING'
  }
}
