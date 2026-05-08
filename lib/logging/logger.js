export function logEvent(type, message, meta = {}) {
  return {
    type,
    message,
    meta,
    timestamp: new Date().toISOString()
  }
}
