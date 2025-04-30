"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation"; // <-- This is correct for App Router

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
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="p-8 bg-white rounded shadow w-full max-w-md">
        <h1 className="mb-6 text-2xl font-bold">Login</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input className="border rounded p-2" required placeholder="Email" type="email"
            value={email} onChange={e => setEmail(e.target.value)} />
          <input className="border rounded p-2" required placeholder="Password" type="password"
            value={password} onChange={e => setPassword(e.target.value)} />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Login</button>
        </form>
        <p className="mt-2 text-center">
          New here? <a href="/register" className="text-blue-600 hover:underline">Register</a>
        </p>
        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
      </div>
    </main>
  );
}
