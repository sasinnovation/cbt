export function logIntegrityEvent(event) {
  return {
    event,
    loggedAt: Date.now(),
    severity: event.severity || 'INFO'
  }
}
