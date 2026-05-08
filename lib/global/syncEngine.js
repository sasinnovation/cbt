export function syncGlobalState(state) {
  return {
    synced: true,
    timestamp: Date.now(),
    global: true,
    state
  }
}
