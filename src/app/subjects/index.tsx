import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import axios from "axios"

type Subject = { id: number, name: string }

export default function Subjects() {
  const { data: session } = useSession()
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [registered, setRegistered] = useState<number[]>([])

  useEffect(() => {
    const fetchSubjects = async () => {
      const all = await axios.get('/api/subjects').then(r => r.data)
      setSubjects(all)
      if (session) {
        const res = await axios.get(`/api/subjects/registered?userId=${session.user.id}`)
        setRegistered(res.data.map((s: Subject) => s.id))
      }
    }
    fetchSubjects()
  }, [session])

  async function register(subjectId: number) {
    await axios.post('/api/subjects/register', { userId: session!.user.id, subjectId })
    setRegistered([...registered, subjectId])
  }

  return (
    <main>
      <h1>Subjects</h1>
      <ul>
        {subjects.map(subject => (
          <li key={subject.id}>
            {subject.name}
            {registered.includes(subject.id)
              ? <span> (Registered)</span>
              : <button onClick={() => register(subject.id)}>Register</button>
            }
          </li>
        ))}
      </ul>
    </main>
  )
}
