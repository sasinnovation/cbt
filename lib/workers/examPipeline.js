import { addJob } from '../queue'

export function submitExamAsync(examData) {
  addJob({
    type: 'EXAM_SUBMISSION',
    payload: examData
  })

  return {
    status: 'QUEUED',
    message: 'Exam submission queued for processing'
  }
}
