export function analyzeExamResults(results) {
  return {
    averageScore: results.reduce((a, b) => a + b.score, 0) / results.length,
    passRate: results.filter(r => r.score >= 50).length,
    insights: 'Performance trends detected'
  }
}
