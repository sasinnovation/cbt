const history = []

export function recordDeployment(version, status) {
  history.push({
    version,
    status,
    timestamp: Date.now()
  })
}

export function getHistory() {
  return history
}
