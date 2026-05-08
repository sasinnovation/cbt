import { getSchoolId } from '@/lib/tenant/tenantContext'

// SAFE FILTER WRAPPER
export function applyTenantFilter(query) {
  const schoolId = getSchoolId()

  return query.eq('school_id', schoolId)
}
