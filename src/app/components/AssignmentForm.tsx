import { useState } from "react"
import axios from "axios"

export default function AssignmentForm({ lecturerId, subjects, onCreated }: {
  lecturerId: number,
  subjects: { id: number, name: string }[],
  onCreated: () => void
}) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [subjectId, setSubjectId] = useState<number | ''>('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await axios.post("/api/assignments/create", {
      title, description, subjectId, lecturerId
    })
    setTitle(''); setDescription(''); setSubjectId('')
    onCreated()
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create Assignment</h3>
      <input required placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <textarea required placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
      <select required value={subjectId} onChange={e => setSubjectId(Number(e.target.value))}>
        <option value="">--Subject--</option>
        {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
      </select>
      <button type="submit">Create</button>
    </form>
  )
}
