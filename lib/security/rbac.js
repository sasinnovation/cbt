export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  SCHOOL_ADMIN: 'school_admin',
  TEACHER: 'teacher',
  STUDENT: 'student'
}

export function hasRole(user, allowedRoles = []) {
  if (!user) return false
  return allowedRoles.includes(user.role)
}
