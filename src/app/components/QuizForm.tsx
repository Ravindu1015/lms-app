import { useState } from "react"
import axios from "axios"

export default function QuizForm({
  lecturerId,
  subjects,
  onCreated
}: {
  lecturerId: number,
  subjects: { id: number, name: string }[],
  onCreated?: () => void
}) {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [subjectId, setSubjectId] = useState<number | ''>('')
  const [deadline, setDeadline] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await axios.post("/api/quizzes/create", {
      question, answer, subjectId, lecturerId, deadline
    })
    setQuestion(''); setAnswer(''); setSubjectId(''); setDeadline('')
    onCreated && onCreated()
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create Quiz</h3>
      <input required placeholder="Question" value={question} onChange={e => setQuestion(e.target.value)} />
      <input required placeholder="Correct Answer" value={answer} onChange={e => setAnswer(e.target.value)} />
      <select required value={subjectId} onChange={e => setSubjectId(Number(e.target.value))}>
        <option value="">--Subject--</option>
        {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
      </select>
      <input required type="datetime-local" value={deadline} onChange={e => setDeadline(e.target.value)} />
      <button type="submit">Create</button>
    </form>
  )
}
