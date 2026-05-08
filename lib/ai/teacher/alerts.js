export function triggerAlert(event) {
  return {
    alert: event.type === 'cheating' ? 'CRITICAL' : 'INFO',
    action: 'NOTIFY_ADMIN'
  }
}
