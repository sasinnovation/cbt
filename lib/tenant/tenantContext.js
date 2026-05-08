export function getSchoolId() {
  return localStorage.getItem('school_id')
}

export function setSchoolId(id) {
  localStorage.setItem('school_id', id)
}

export function clearSchool() {
  localStorage.removeItem('school_id')
}
