import { useState } from "react"
import axios from "axios"

export default function AssignmentSubmission({
  assignmentId,
  studentId,
  onSubmitted
}: {
  assignmentId: number,
  studentId: number,
  onSubmitted?: () => void
}) {
  const [submission, setSubmission] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await axios.post("/api/assignments/submit", {
      assignmentId, studentId, content: submission
    })
    setLoading(false)
    setSubmitted(true)
    setSubmission('')
    onSubmitted && onSubmitted()
  }

  if (submitted) return <p style={{color:"green"}}>Submitted!</p>

  return (
    <form onSubmit={handleSubmit}>
      <input required placeholder="Your answer" value={submission} onChange={e => setSubmission(e.target.value)} />
      <button type="submit" disabled={loading}>Submit</button>
    </form>
  )
}
