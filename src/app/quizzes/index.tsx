import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import axios from "axios"

export default function Quizzes() {
  const { data: session } = useSession()
  const [quizzes, setQuizzes] = useState<any[]>([])
  const [subjects, setSubjects] = useState<any[]>([])
  // For creation
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [subjectId, setSubjectId] = useState<number|null>(null)
  const [deadline, setDeadline] = useState('')
  // For quiz attempt
  const [attempt, setAttempt] = useState('')
  const [selectedQuiz, setSelectedQuiz] = useState<any>(null)
  const [timeLeft, setTimeLeft] = useState<number>(0)

  useEffect(() => {
    if (!session) return
    if (session.user.role === "LECTURER") {
      axios.get("/api/subjects/lecturer?lecturerId=" + session.user.id).then(r => setSubjects(r.data as any[]))
    } else {
      axios.get("/api/subjects/registered?userId=" + session.user.id).then(r => setSubjects(r.data as any[]))
    }
    axios.get("/api/quizzes").then(r => setQuizzes(r.data as any[]))
  }, [session])

  // Quiz creation (lecturer)
  async function createQuiz(e: React.FormEvent) {
    e.preventDefault()
    await axios.post('/api/quizzes/create', {
      question, answer, subjectId, lecturerId: session!.user.id, deadline
    })
    setQuestion(''); setAnswer(''); setDeadline('')
    axios.get<any[]>("/api/quizzes").then(r => setQuizzes(r.data))
  }

  // Start quiz attempt (student)
  function attemptQuiz(quiz: any) {
    setSelectedQuiz(quiz)
    setTimeLeft(Math.max(0, Math.floor((new Date(quiz.deadline).getTime() - Date.now()) / 1000)))
    setAttempt('')
  }

  // Handle timer countdown
  useEffect(() => {
    if (!timeLeft || timeLeft <= 0) return
    const interval = setInterval(() => setTimeLeft(s => s - 1), 1000)
    return () => clearInterval(interval)
  }, [timeLeft])

  // Submit quiz attempt
  async function submitQuiz(e: React.FormEvent) {
    e.preventDefault()
    await axios.post('/api/quizzes/submit', {
      quizId: selectedQuiz.id, studentId: session!.user.id, attempt
    })
    setSelectedQuiz(null); setAttempt('')
    alert('Submitted!')
  }

  const role = session?.user.role

  return (
    <main>
      <h1>Quizzes</h1>
      {role === "LECTURER" && (
        <>
          <h2>Create Quiz</h2>
          <form onSubmit={createQuiz}>
            <input required placeholder="Question" value={question} onChange={e => setQuestion(e.target.value)} />
            <input required placeholder="Answer" value={answer} onChange={e => setAnswer(e.target.value)} />
            <select required value={subjectId ?? ''} onChange={e => setSubjectId(Number(e.target.value))}>
              <option value="">-- Subject --</option>
              {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
            <input required type="datetime-local" value={deadline} onChange={e => setDeadline(e.target.value)} />
            <button type="submit">Create</button>
          </form>
        </>
      )}
      <h2>Quiz List</h2>
      <ul>
        {quizzes.map(q =>
          <li key={q.id}>
            <strong>{q.subject?.name || ""}:</strong> {q.question}
            {role === "STUDENT" &&
              <button onClick={() => attemptQuiz(q)}>Attempt</button>
            }
          </li>
        )}
      </ul>
      {/* Student: attempt quiz with timer */}
      {role === "STUDENT" && selectedQuiz && (
        <div>
          <h3>Attempt Quiz: {selectedQuiz.question}</h3>
          <p>Time left: {timeLeft}s</p>
          <form onSubmit={submitQuiz}>
            <input required placeholder="Your answer" value={attempt} onChange={e => setAttempt(e.target.value)} disabled={timeLeft <= 0} />
            <button type="submit" disabled={timeLeft <= 0}>Submit</button>
          </form>
          {timeLeft <= 0 && <p style={{color:"red"}}>Time is up!</p>}
        </div>
      )}
    </main>
  )
}
