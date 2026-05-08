export function adjustQuestion(question, difficulty) {
  return {
    ...question,
    difficulty,
    adjusted: true
  }
}
