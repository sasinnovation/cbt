export function enhanceIdentityTrust(baseScore, biometricStatus) {
  let score = baseScore

  if (biometricStatus === 'CAMERA_BLOCKED') {
    score -= 20
  }

  if (biometricStatus === 'NO_FACE_DETECTED') {
    score -= 30
  }

  return Math.max(0, score)
}
