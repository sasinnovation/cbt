export function normalizeScore(score, max) {
  return Math.round((score / max) * 100)
}
