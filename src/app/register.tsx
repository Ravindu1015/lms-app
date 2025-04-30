import { useState } from "react"
import { useRouter } from "next/router"
import axios from "axios"

export default function Register() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'STUDENT',
  })
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      await axios.post('/api/register', form)
      router.push('/login')
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Registration error')
    }
  }

  return (
    <main>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input required placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input required placeholder="Email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <input required placeholder="Password" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
        <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
          <option value="STUDENT">Student</option>
          <option value="LECTURER">Lecturer</option>
        </select>
        <button type="submit">Register</button>
      </form>
      {error && <p style={{color:'red'}}>{error}</p>}
    </main>
  )
}
