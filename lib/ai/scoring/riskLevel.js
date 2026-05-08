export function riskLevel(stats) {
  if (stats.tabSwitches > 10) return 'HIGH_RISK';
  if (stats.tabSwitches > 3) return 'MEDIUM_RISK';
  return 'LOW_RISK';
}
