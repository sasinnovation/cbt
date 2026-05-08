import { globalBrain } from './core'
import { autoExamLifecycle } from './lifecycle'
import { distributeGlobally } from './distributor'
import { optimizeEducation } from './optimizer'
import { enforceCompliance } from './compliance'

export function cbtAutopilotGlobal(system) {
  return {
    brain: globalBrain(system),
    lifecycle: autoExamLifecycle(system.exam || {}),
    distribution: distributeGlobally(system.exams || [], system.regions || []),
    optimization: optimizeEducation(system),
    compliance: enforceCompliance(system.country || 'NG')
  }
}
