export function detectIncident(metrics) {
  if (metrics.errorRate > 0.2) {
    return {
      incident: true,
      severity: 'HIGH'
    }
  }

  return {
    incident: false
  }
}
