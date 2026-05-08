export default function CreateExam() {
  return (
    <div style={{ padding: 40 }}>
      <h1>📝 Create Exam</h1>

      <input placeholder='Exam Title' />
      <input placeholder='Subject' />
      <input placeholder='Duration (mins)' />

      <button>Create Exam</button>
    </div>
  )
}
