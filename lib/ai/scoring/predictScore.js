export function predictScore(stats) {
  const accuracy = stats.correct / stats.total;
  const speedFactor = Math.max(0, 1 - stats.avgTimePerQuestion / 120);
  const anomalyPenalty = stats.tabSwitches * 0.05;

  return Math.max(
    0,
    (accuracy * 0.6 + speedFactor * 0.3 - anomalyPenalty * 0.1) * 100
  );
}
