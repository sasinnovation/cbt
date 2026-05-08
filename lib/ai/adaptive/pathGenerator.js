export function generatePath(skillLevel) {
  if (skillLevel === 'ADVANCED') return ['HARD', 'HARD', 'MEDIUM']
  if (skillLevel === 'INTERMEDIATE') return ['MEDIUM', 'MEDIUM', 'EASY']
  return ['EASY', 'EASY', 'MEDIUM']
}
