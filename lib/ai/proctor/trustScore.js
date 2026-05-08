export function calculateTrustScore(profile) {
  let score = 100

  score -= profile.tabSwitches * 5
  score -= profile.copyAttempts * 10
  score -= profile.idleTime > 120 ? 5 : 0
  score -= profile.multiDevice ? 20 : 0

  return Math.max(0, score)
}
