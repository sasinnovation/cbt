export function aggregateStudentPerformance(events) {
  const total = events.length;
  const correct = events.filter(e => e.payload?.correct === true).length;

  const tabSwitches = events.filter(e => e.type === 'TAB_SWITCH').length;

  return {
    totalEvents: total,
    accuracy: total ? correct / total : 0,
    tabSwitches
  };
}
