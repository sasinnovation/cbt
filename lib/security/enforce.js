import { ROLES } from './rbac'

export function authorize(user, allowedRoles = []) {
  if (!user) return false
  return allowedRoles.includes(user.role)
}

export function requireRole(user, role) {
  if (!user || user.role !== role) {
    throw new Error('Forbidden: Insufficient permissions')
  }
}
