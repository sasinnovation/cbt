export function autoExamLifecycle(exam) {
  return {
    stage: 'DEPLOYED',
    created: true,
    scheduled: true,
    graded: false,
    autonomous: true
  }
}
