"use client"

export default function AdminDashboardPage() {

  const stats = {
    totalStudents: 250,
    totalExams: 12,
    totalResults: 1850,
    averageScore: 72.5,
  }

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        Admin Dashboard
      </h1>

      <div className="space-y-3">
        <p>Total Students: {stats.totalStudents}</p>
        <p>Total Exams: {stats.totalExams}</p>
        <p>Total Results: {stats.totalResults}</p>
        <p>Average Score: {stats.averageScore}</p>
      </div>
    </main>
  )
}
