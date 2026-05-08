export function registerRegion(region) {
  return {
    country: region.country,
    timezone: region.timezone,
    status: 'ACTIVE'
  }
}
