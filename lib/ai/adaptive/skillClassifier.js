export function classifySkill(score) {
  if (score >= 80) return 'ADVANCED'
  if (score >= 50) return 'INTERMEDIATE'
  return 'BEGINNER'
}
