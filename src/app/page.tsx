import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
          className="dark:invert"
        />
        <h1 className="text-3xl font-bold text-center sm:text-left">Welcome to LMS Portal</h1>
        <p className="max-w-xl text-lg text-center sm:text-left text-gray-600 dark:text-gray-300">
          Your integrated Learning Management System for students and lecturers.
          <br />
          <span className="text-base">
            Register as a student or lecturer, manage lectures, assignments, quizzes, and more - all in one place.
          </span>
        </p>

        <Link href="/login" passHref>
          <button className="mt-2 rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] font-medium text-lg h-12 px-8 w-full sm:w-auto shadow">
            Proceed to Login / Register
          </button>
        </Link>
      </main>
      <footer className="row-start-3 flex gap-4 flex-wrap items-center justify-center text-sm">
        <span>
          &copy; {new Date().getFullYear()} LMS Portal &mdash; Powered by Next.js
        </span>
      </footer>
    </div>
  );
}
