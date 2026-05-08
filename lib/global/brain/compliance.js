export function enforceCompliance(country) {
  const rules = {
    NG: { secure: true, duration: 60 },
    US: { secure: true, duration: 90 },
    UK: { secure: true, duration: 75 }
  }

  return rules[country] || rules.NG
}
