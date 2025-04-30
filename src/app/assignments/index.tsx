import { useSession } from "next-auth/react"
import { Session } from "next-auth"

// Extend the Session type to include user.id
declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      role?: string | null
    }
  }
}
import { useState, useEffect } from "react"
import axios from "axios"

export default function Assignments() {
  const { data: session } = useSession()
  const [assignments, setAssignments] = useState<any[]>([])
  const [subjects, setSubjects] = useState<any[]>([])
  // For creating
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [subjectId, setSubjectId] = useState<number|null>(null)
  // For submitting
  const [submission, setSubmission] = useState('')
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null)
  const [submissions, setSubmissions] = useState<any[]>([])

  useEffect(() => {
    if (!session) return
    if (session?.user?.role === "LECTURER") {
      // Lecturer: fetch assignments for their subjects
      axios.get("/api/subjects/lecturer?lecturerId=" + session.user.id).then(r => setSubjects(r.data as any[]))
      axios.get("/api/assignments?lecturerId=" + session.user.id).then(r => setAssignments(r.data as any[]))
    } else {
      // Student: fetch assignments for their subjects
      axios.get("/api/subjects/registered?userId=" + session.user.id).then(r => setSubjects(r.data as any[]))
      axios.get("/api/assignments?studentId=" + session.user.id).then(r => setAssignments(r.data as any[]))
    }
  }, [session])

  // Create assignment (lecturer)
  async function createAssignment(e: React.FormEvent) {
    e.preventDefault()
    await axios.post('/api/assignments/create', {
      title, description, subjectId, lecturerId: session!.user.id
    })
    setTitle(''); setDescription('')
    axios.get<any[]>("/api/assignments?lecturerId=" + session!.user.id).then(r => setAssignments(r.data))
  }

  // View submissions (lecturer)
  async function viewSubmissions(assignmentId: number) {
    const res = await axios.get<any[]>(`/api/assignments/${assignmentId}/submissions`)
    setSubmissions(res.data)
    setSelectedAssignment(assignments.find(a => a.id === assignmentId))
  }

  // Grade submission (lecturer)
  async function gradeSubmission(submissionId: number, grade: number) {
    await axios.post(`/api/assignments/grade`, { submissionId, grade })
    viewSubmissions(selectedAssignment.id)
  }

  // Submit assignment (student)
  async function submitAssignment(assignmentId: number) {
    await axios.post('/api/assignments/submit', {
      assignmentId, studentId: session!.user.id, content: submission
    })
    setSubmission('')
    alert('Submitted!')
  }

  const role = session?.user.role

  return (
    <main>
      <h1>Assignments</h1>
      {role === "LECTURER" ? (
        <>
          <h2>Create Assignment</h2>
          <form onSubmit={createAssignment}>
            <input required placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
            <textarea required placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
            <select required value={subjectId ?? ''} onChange={e => setSubjectId(Number(e.target.value))}>
              <option value="">-- Subject --</option>
              {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
            <button type="submit">Create</button>
          </form>
        </>
      ) : null}
      <h2>Assignment List</h2>
      <ul>
        {assignments.map(a =>
          <li key={a.id}>
            <strong>{a.title}</strong> - {a.description}
            {role === "STUDENT" &&
              <form onSubmit={e => {e.preventDefault(); submitAssignment(a.id)}}>
                <input required placeholder="Your answer" value={submission} onChange={e => setSubmission(e.target.value)} />
                <button type="submit">Submit</button>
              </form>
            }
            {role === "LECTURER" &&
              <button onClick={() => viewSubmissions(a.id)}>View Submissions</button>
            }
          </li>
        )}
      </ul>
      {/* Lecturer: list submissions for grading */}
      {role === "LECTURER" && selectedAssignment && (
        <div>
          <h3>Submissions for "{selectedAssignment.title}"</h3>
          <ul>
            {submissions.map((sub: any) => (
              <li key={sub.id}>
                {sub.student.name}: {sub.content} (Current grade: {sub.grade ?? "Ungraded"})
                <form onSubmit={e => {e.preventDefault(); gradeSubmission(sub.id, Number((e.target as any).grade.value))}}>
                  <input type="number" name="grade" min="0" max="100" required />
                  <button type="submit">Grade</button>
                </form>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  )
}
