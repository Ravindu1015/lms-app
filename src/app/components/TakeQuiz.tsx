import { useEffect, useState } from "react"
import axios from "axios"

export default function TakeQuiz({
  quiz,        // { id, question, deadline }
  studentId,
  onSubmitted
}: {
  quiz: { id: number, question: string, deadline: string },
  studentId: number,
  onSubmitted?: () => void
}) {
  const [answer, setAnswer] = useState('')
  const [timeLeft, setTimeLeft] = useState(() => {
    const now = Date.now()
    const end = new Date(quiz.deadline).getTime()
    return Math.max(0, Math.floor((end - now) / 1000))
  })

  useEffect(() => {
    if (!timeLeft) return
    const interval = setInterval(() => setTimeLeft(t => t - 1), 1000)
    return () => clearInterval(interval)
  }, [timeLeft])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (timeLeft <= 0) return
    await axios.post("/api/quizzes/submit", {
      quizId: quiz.id, studentId, attempt: answer
    })
    setAnswer('')
    onSubmitted && onSubmitted()
  }

  if (timeLeft <= 0)
    return <p style={{color:"red"}}>Time is up! You can't submit.</p>

  return (
    <form onSubmit={handleSubmit}>
      <h3>Quiz: {quiz.question}</h3>
      <p>Time left: {timeLeft}s</p>
      <input required placeholder="Your answer" value={answer} onChange={e => setAnswer(e.target.value)} disabled={timeLeft <= 0} />
      <button type="submit" disabled={timeLeft <= 0}>Submit</button>
    </form>
  )
}
