import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '로그인 | Archive',
}

export default function Page() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6">로그인</h1>
      </div>
    </main>
  )
}
