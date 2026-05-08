export function balanceDifficulty(questions) {
  return questions.map(q => ({
    ...q,
    calibrated: true
  }))
}
