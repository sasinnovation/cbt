export function balanceExamFlow(path, currentIndex) {
  return {
    nextDifficulty: path[currentIndex] || 'MEDIUM',
    adaptive: true
  }
}
