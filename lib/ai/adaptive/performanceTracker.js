const performanceStore = new Map()

export function trackPerformance(studentId, score) {
  if (!performanceStore.has(studentId)) {
    performanceStore.set(studentId, [])
  }

  performanceStore.get(studentId).push(score)

  return performanceStore.get(studentId)
}
