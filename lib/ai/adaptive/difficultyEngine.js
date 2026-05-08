export function adjustDifficulty(scoreHistory) {
  const avg = scoreHistory.reduce((a, b) => a + b, 0) / scoreHistory.length

  if (avg >= 70) return 'HARD'
  if (avg >= 50) return 'MEDIUM'
  return 'EASY'
}
