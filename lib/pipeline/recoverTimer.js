export function recoverTimer(examId) {

  const saved = localStorage.getItem(cbt_timer_);

  if (!saved) return null;

  return JSON.parse(saved);

}
