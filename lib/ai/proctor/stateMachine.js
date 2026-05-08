export function proctorState(score) {
  if (score < 30) return "CRITICAL"
  if (score < 60) return "SUSPICIOUS"
  if (score < 85) return "WATCH"
  return "SAFE"
}
