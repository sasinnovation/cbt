export function guideStudent(performance) {
  if (performance.score < 40) {
    return 'Try revising fundamentals'
  }

  return 'You are on track'
}
