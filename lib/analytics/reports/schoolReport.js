export function generateSchoolReport(data) {
  return {
    totalStudents: data.students?.length || 0,
    activeExams: data.exams?.length || 0,
    averageScore: data.averageScore || 0,
    riskStudents: data.riskStudents || [],
    generatedAt: Date.now()
  };
}
