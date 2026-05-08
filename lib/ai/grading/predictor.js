export function predictOutcome(score) {
  if (score >= 70) return 'PASS_PROBABLE'
  if (score >= 50) return 'BORDERLINE'
  return 'FAIL_PROBABLE'
}
