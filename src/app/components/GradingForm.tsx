import { useState } from "react"
import axios from "axios"

export default function GradingForm({
  submissionId,
  currentGrade,
  onGraded
}: {
  submissionId: number,
  currentGrade?: number | null,
  onGraded?: () => void
}) {
  const [grade, setGrade] = useState(currentGrade ?? '')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await axios.post("/api/assignments/grade", { submissionId, grade: Number(grade) })
    setMsg("Graded!")
    setLoading(false)
    onGraded && onGraded()
  }

  return (
    <form onSubmit={handleSubmit} style={{display:"inline"}}>
      <input type="number" value={grade} min={0} max={100} onChange={e => setGrade(Number(e.target.value))} required style={{width:60}} />
      <button type="submit" disabled={loading}>Grade</button>
      {msg && <span style={{color:"green", marginLeft:8}}>{msg}</span>}
    </form>
  )
}
