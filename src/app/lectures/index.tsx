import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import axios from "axios"

export default function Lectures() {
  const { data: session } = useSession()
  const [lectures, setLectures] = useState<any[]>([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [subjectId, setSubjectId] = useState<number|null>(null)
  const [subjects, setSubjects] = useState<any[]>([])

  useEffect(() => {
    if (!session) return
    axios.get("/api/lectures?lecturerId=" + session.user.id).then(r => setLectures(r.data as any[]))
    axios.get("/api/subjects/lecturer?lecturerId=" + session.user.id).then(r => setSubjects(r.data as any[]))
  }, [session])

  async function addLecture(e: React.FormEvent) {
    e.preventDefault()
    await axios.post("/api/lectures/create", { title, content, lecturerId: session!.user.id, subjectId })
    setTitle(''); setContent('')
    axios.get<any[]>("/api/lectures?lecturerId=" + session!.user.id).then(r => setLectures(r.data))
  }

  return (
    <main>
      <h1>Lectures</h1>
      <form onSubmit={addLecture}>
        <input required placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <textarea required placeholder="Content" value={content} onChange={e => setContent(e.target.value)} />
        <select required value={subjectId ?? ''} onChange={e => setSubjectId(Number(e.target.value))}>
          <option value="">-- Subject --</option>
          {subjects.map(subj =>
            <option key={subj.id} value={subj.id}>{subj.name}</option>
          )}
        </select>
        <button type="submit">Add Lecture</button>
      </form>
      <ul>
        {lectures.map(l => (
          <li key={l.id}><strong>{l.title}</strong> ({l.subject?.name || "No subject"})</li>
        ))}
      </ul>
    </main>
  )
}
