import { analyzeFacePresence } from './facePresence'
import { detectMultipleFaces } from './multiFace'
import { analyzeMovement } from './movementAnalyzer'

export function computeVisualRisk(data) {
  const face = analyzeFacePresence(data.face)
  const multi = detectMultipleFaces(data.faceCount || 1)
  const move = analyzeMovement(data.movements || [])

  const totalRisk =
    face.risk +
    multi.risk +
    move.risk

  return {
    totalRisk,
    status:
      totalRisk > 1.2
        ? 'HIGH_RISK'
        : totalRisk > 0.5
        ? 'MEDIUM_RISK'
        : 'LOW_RISK'
  }
}
