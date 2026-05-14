export function generateQuestion(topic, difficulty = 'medium') {
  return {
    question: 'What is a key concept in this topic?',
    options: ['A', 'B', 'C', 'D'],
    answer: 'A',
    difficulty
  }
}
