export function analyzeFacePresence(faceData) {
  if (!faceData) {
    return { status: 'NO_FACE', risk: 0.7 }
  }

  return { status: 'FACE_DETECTED', risk: 0.0 }
}
