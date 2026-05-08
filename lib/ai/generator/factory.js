import { generateQuestion } from './questionGenerator'

export function createExam(subjects = []) {
  return subjects.map(subject => {
    return generateQuestion(subject, 'medium')
  })
}
