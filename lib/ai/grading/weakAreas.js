export function detectWeakAreas(answers = [], key = []) {
  const weakTopics = []

  answers.forEach((ans, i) => {
    if (ans !== key[i]) {
      weakTopics.push('Topic_' + i)
    }
  })

  return weakTopics
}
