const metrics = {
  requests: 0,
  errors: 0,
  responseTime: []
}

export function trackRequest(timeMs) {
  metrics.requests++
  metrics.responseTime.push(timeMs)
}

export function trackError() {
  metrics.errors++
}

export function getMetrics() {
  const avg =
    metrics.responseTime.reduce((a, b) => a + b, 0) /
    (metrics.responseTime.length || 1)

  return {
    ...metrics,
    avgResponseTime: avg
  }
}
