import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect } from "react"

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login')
  }, [status, router])

  if (status === "loading" || !session) return <p>Loading...</p>

  const user = session.user as any

  return (
    <main>
      <h1>Welcome, {user.name}</h1>
      <p>Role: {user.role}</p>
      {user.role === "LECTURER" && (
        <div>
          <h2>Lecturer Shortcuts</h2>
          <ul>
            <li><a href="/lectures">Manage Lectures</a></li>
            <li><a href="/assignments">Assignments (create/grade)</a></li>
            <li><a href="/quizzes">Quizzes</a></li>
          </ul>
        </div>
      )}
      {user.role === "STUDENT" && (
        <div>
          <h2>Student Shortcuts</h2>
          <ul>
            <li><a href="/subjects">Register Subjects</a></li>
            <li><a href="/assignments">Assignments (view/submit)</a></li>
            <li><a href="/quizzes">Quizzes</a></li>
          </ul>
        </div>
      )}
    </main>
  )
}
