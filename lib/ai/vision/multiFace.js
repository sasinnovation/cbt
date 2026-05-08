export function detectMultipleFaces(faceCount) {
  if (faceCount > 1) {
    return {
      status: 'MULTIPLE_FACES_DETECTED',
      risk: 0.9
    }
  }

  return {
    status: 'SINGLE_FACE',
    risk: 0.0
  }
}
