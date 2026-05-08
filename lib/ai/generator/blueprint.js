export function buildExamBlueprint(subject, config = {}) {
  return {
    subject,
    totalQuestions: config.totalQuestions || 50,
    distribution: {
      easy: 0.3,
      medium: 0.5,
      hard: 0.2
    }
  }
}
