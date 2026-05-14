"use client"

import { useEffect, useState } from "react"

export default function AdminExamsPage() {

  const [exams, setExams] = useState<any[]>([])

  useEffect(() => {
    fetch("/api/exams/list")
      .then(res => res.json())
      .then(setExams)
  }, [])

  return (
    <div style={{ padding: 20 }}>

      <h1>All Exams</h1>

      <div style={{
        display: "grid",
        gap: 20,
        marginTop: 20
      }}>
        {exams.map((exam) => (
          <div
            key={exam.id}
            style={{
              border: "1px solid #ccc",
              padding: 20
            }}
          >
            <h2>{exam.title}</h2>

            <p>Class: {exam.class}</p>

            <p>
              Questions:
              {exam.questions.length}
            </p>

            <a href={`/exam/${exam.id}`}>
              Open Exam
            </a>
          </div>
        ))}
      </div>

    </div>
  )
}
