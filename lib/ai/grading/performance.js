export function analyzePerformance(result) {
  const score = result.percentage

  if (score >= 70) return { level: 'EXCELLENT' }
  if (score >= 50) return { level: 'AVERAGE' }
  return { level: 'POOR' }
}
