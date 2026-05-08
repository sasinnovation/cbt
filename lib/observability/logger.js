const logs = []

export function logEvent(type, message, meta = {}) {
  logs.push({
    type,
    message,
    meta,
    timestamp: Date.now()
  })
}

export function getLogs() {
  return logs
}
