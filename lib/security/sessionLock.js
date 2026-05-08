const activeSessions = new Map()

export function lockSession(studentId, sessionData) {
  activeSessions.set(studentId, {
    ...sessionData,
    locked: true,
    timestamp: Date.now()
  })
}

export function getSession(studentId) {
  return activeSessions.get(studentId)
}
