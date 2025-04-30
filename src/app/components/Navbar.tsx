import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

export default function Navbar() {
  const { data: session } = useSession()

  if (!session) return null

  const role = (session.user as any).role

  return (
    <nav style={{padding: '1em', borderBottom: '1px solid #eee', marginBottom: '1em'}}>
      <Link href="/dashboard">Dashboard</Link> |{" "}
      <Link href={role === "LECTURER" ? "/lectures" : "/subjects"}>
        {role === "LECTURER" ? "Lectures" : "Subjects"}
      </Link>{" | "}
      <Link href="/assignments">Assignments</Link>{" | "}
      <Link href="/quizzes">Quizzes</Link>{" | "}
      <button onClick={() => signOut({ callbackUrl: '/login' })} style={{marginLeft: 8}}>Sign out</button>
    </nav>
  )
}
