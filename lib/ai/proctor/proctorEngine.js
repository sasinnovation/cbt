import { calculateTrustScore } from './trustScore'
import { proctorState } from './stateMachine'

export function evaluateStudent(profile) {
  const score = calculateTrustScore(profile)
  const state = proctorState(score)

  return {
    score,
    state,
    action:
      state === "CRITICAL"
        ? "LOCK_EXAM"
        : state === "SUSPICIOUS"
        ? "WARN"
        : state === "WATCH"
        ? "MONITOR"
        : "ALLOW"
  }
}
