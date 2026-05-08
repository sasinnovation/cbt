export function emergencyControl(action) {
  if (action === 'PAUSE_ALL') return 'ALL_EXAMS_PAUSED'
  if (action === 'RESUME_ALL') return 'ALL_EXAMS_RESUMED'
  if (action === 'TERMINATE') return 'ALL_EXAMS_TERMINATED'

  return 'NO_ACTION'
}
