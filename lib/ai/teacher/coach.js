export function adaptiveCoach(data) {
  return {
    recommendation: 'Increase practice on weak topics',
    intensity: data.score < 50 ? 'HIGH_SUPPORT' : 'NORMAL'
  }
}
