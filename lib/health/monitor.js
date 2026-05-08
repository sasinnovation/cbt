export function systemHealth(metrics) {
  const status =
    metrics.cpu > 80 || metrics.memory > 80
      ? 'DEGRADED'
      : 'HEALTHY'

  return {
    status,
    cpu: metrics.cpu,
    memory: metrics.memory,
    timestamp: Date.now()
  }
}
