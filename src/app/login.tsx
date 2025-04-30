import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/router"

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    const res = await signIn('credentials', {
      redirect: false,
      email, password
    })
    if (!res?.error) {
      router.push('/dashboard')
    } else {
      setError("Invalid credentials")
    }
  }

  return (
    <main>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input required placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <input required placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{color:'red'}}>{error}</p>}
    </main>
  )
}
