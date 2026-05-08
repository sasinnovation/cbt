export async function distributeExam(exam, students) {
  return students.map(s => ({
    studentId: s.id,
    examId: exam.id,
    assigned: true
  }));
}
