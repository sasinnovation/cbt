export function trackGlobalStatus(regions) {
  return regions.map(r => ({
    region: r,
    status: 'ACTIVE',
    load: Math.floor(Math.random() * 100)
  }))
}
