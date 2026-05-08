const flags = {
  AI_ANALYTICS: true,
  NEW_EXAM_ENGINE: false,
  BETA_DASHBOARD: true
}

export function isEnabled(flag) {
  return flags[flag] || false
}

export function setFlag(flag, value) {
  flags[flag] = value
}
