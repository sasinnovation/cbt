import { supabase } from '@/lib/supabase/client'

// GET SCHOOL RESULTS
export async function getSchoolResults(schoolId) {
  return await supabase
    .from('results')
    .select('*')
    .eq('school_id', schoolId)
}

// GET EXAM STATS
export async function getExamStats(examId) {
  return await supabase
    .from('results')
    .select('*')
    .eq('exam_id', examId)
}

// STUDENT PERFORMANCE SUMMARY
export async function getStudentPerformance(studentId) {
  return await supabase
    .from('results')
    .select('*')
    .eq('student_id', studentId)
}
