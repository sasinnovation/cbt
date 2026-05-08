export function triggerAlert(event) {
  if (event.type === 'CHEATING') {
    return { level: 'CRITICAL', action: 'PAUSE_EXAM' }
  }

  return { level: 'INFO', action: 'LOG' }
}
