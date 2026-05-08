import { getLogs } from './logger'
import { getMetrics } from './metrics'
import { getTraces } from './tracer'

export function getSystemHealth() {
  return {
    logs: getLogs(),
    metrics: getMetrics(),
    traces: getTraces()
  }
}
