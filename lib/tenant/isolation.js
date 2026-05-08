export function getTenantId(user) {
  return user?.school_id || null
}

export function applyTenantFilter(query, tenantId) {
  return query.eq('school_id', tenantId)
}
