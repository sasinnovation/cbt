export function distributeSubjects(subjects) {
  return subjects.map(s => ({
    subject: s,
    weight: 1 / subjects.length
  }))
}
