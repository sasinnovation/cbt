export function generateHeatmap(data) {
  return {
    heatmap: true,
    intensity: data.map(d => d.score),
    generated: Date.now()
  }
}
