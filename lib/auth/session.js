export function bindStudentSession(student) {
  localStorage.setItem('student_session', JSON.stringify(student));
}

export function getStudentSession() {
  return JSON.parse(localStorage.getItem('student_session'));
}
