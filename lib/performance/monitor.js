export function monitorPerformance(metrics) {
  return {
    cpu: metrics.cpu || 0,
    memory: metrics.memory || 0,
    load: metrics.load || 'NORMAL',
    timestamp: Date.now()
  }
}
