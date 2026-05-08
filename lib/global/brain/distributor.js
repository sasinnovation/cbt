export function distributeGlobally(exams, regions) {
  return exams.map((exam, i) => ({
    exam,
    region: regions[i % regions.length],
    assigned: true
  }))
}
