import { autoGrade } from './autoGrade'
import { analyzePerformance } from './performance'
import { detectWeakAreas } from './weakAreas'
import { predictOutcome } from './predictor'

export function generateResult(answers, key) {
  const grade = autoGrade(answers, key)
  const performance = analyzePerformance(grade)
  const weak = detectWeakAreas(answers, key)
  const prediction = predictOutcome(grade.percentage)

  return {
    ...grade,
    performance,
    weakAreas: weak,
    prediction
  }
}
