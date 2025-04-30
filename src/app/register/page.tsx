"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'STUDENT'
  });
  const [error, setError] = useState('');

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    try {
      await axios.post('/api/register', form);
      // Optionally: show a success message or auto-login
      router.push('/login');
    } catch (err: any) {
      setError(err?.response?.data?.error ?? "Registration failed.");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="p-8 bg-white rounded shadow w-full max-w-md">
        <h1 className="mb-6 text-2xl font-bold">Register</h1>
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            className="border rounded p-2"
            required
            placeholder="Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="border rounded p-2"
            required
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
          <input
            className="border rounded p-2"
            required
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
          />
          <select
            className="border rounded p-2"
            value={form.role}
            onChange={e => setForm({ ...form, role: e.target.value })}
          >
            <option value="STUDENT">Student</option>
            <option value="LECTURER">Lecturer</option>
          </select>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Register
          </button>
        </form>
        <p className="mt-2 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
      </div>
    </main>
  );
}
