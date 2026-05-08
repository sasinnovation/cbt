export function scheduleGlobalExam(exam, region) {
  return {
    examId: exam.id,
    region: region.country,
    time: new Date().toISOString(),
    timezone: region.timezone
  }
}
