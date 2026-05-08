export default function StatsCard({ title, value }) {
  return (
    <div style={{
      padding: 20,
      border: '1px solid #ddd',
      margin: 10
    }}>
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  )
}
