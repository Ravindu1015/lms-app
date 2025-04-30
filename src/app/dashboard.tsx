import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect } from "react"

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  if (status === "loading") return <p>Loading...</p>
  if (!session) return null

  const user = session.user as any

  return (
    <main>
      <h1>Welcome, {user.name}</h1>
      <p>Role: {user.role}</p>
      <nav>
        {user.role === "STUDENT" ? (
          <>
            <a href="/subjects">Register to Subjects</a><br />
            <a href="/assignments">Assignments</a><br />
            <a href="/quizzes">Quizzes</a>
          </>
        ) : (
          <>
            <a href="/lectures">Manage Lectures</a><br />
            <a href="/assignments">Assignments</a><br />
            <a href="/quizzes">Quizzes</a>
          </>
        )}
      </nav>
    </main>
  )
}
