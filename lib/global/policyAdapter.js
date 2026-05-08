export function adaptPolicy(country) {
  const policies = {
    NG: { duration: 60, format: 'CBT' },
    US: { duration: 90, format: 'STANDARDIZED' },
    UK: { duration: 75, format: 'ACADEMIC' }
  }

  return policies[country] || policies['NG']
}
