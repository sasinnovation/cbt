export function autoGrade(answers = [], key = []) {
  let score = 0

  answers.forEach((ans, i) => {
    if (ans === key[i]) {
      score += 1
    }
  })

  return {
    totalScore: score,
    maxScore: key.length,
    percentage: (score / key.length) * 100
  }
}
