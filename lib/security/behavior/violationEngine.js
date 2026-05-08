export function detectViolation(events) {
  const tabSwitches = events.filter(e => e.type === 'TAB_SWITCH').length
  const focusLoss = events.filter(e => e.type === 'BLUR').length

  if (tabSwitches > 5) return 'HIGH_RISK'
  if (focusLoss > 10) return 'MEDIUM_RISK'

  return 'LOW_RISK'
}
