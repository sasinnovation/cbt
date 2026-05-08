export function aiTeach(question, context) {
  return {
    hint: 'Focus on key concept in ' + context.topic,
    explanation: 'Break problem into smaller steps',
    confidence: 0.85
  }
}
