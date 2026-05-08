import { computeVisualRisk } from './visualRiskEngine'

export function finalProctorDecision(visualData, behaviorData) {
  const visual = computeVisualRisk(visualData)

  const behaviorRisk = behaviorData?.risk || 0

  const total = visual.totalRisk + behaviorRisk

  return {
    score: total,
    decision:
      total > 1.5
        ? 'FLAG_STUDENT'
        : total > 0.8
        ? 'MONITOR_CLOSELY'
        : 'ALLOW_CONTINUE'
  }
}
