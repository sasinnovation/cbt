export function analyzeMovement(movements = []) {
  const spikes = movements.filter(m => m.intensity > 7).length

  if (spikes > 5) {
    return {
      status: 'SUSPICIOUS_MOVEMENT',
      risk: 0.6
    }
  }

  return {
    status: 'NORMAL_MOVEMENT',
    risk: 0.1
  }
}
