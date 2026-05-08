import { detectIncident } from './incidentDetector'
import { rollback } from './rollback'

export function recoveryManager(metrics, previousVersion) {
  const incident = detectIncident(metrics)

  if (incident.incident) {
    return rollback(previousVersion)
  }

  return {
    status: 'STABLE'
  }
}
