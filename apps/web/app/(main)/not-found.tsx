'use client'

import { Button } from '@blog/ui'
import { ArrowLeft, Home } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
      <div className="space-y-2">
        <p className="text-6xl font-bold tracking-tight text-muted-foreground/30">404</p>
        <h1 className="text-2xl font-semibold">페이지를 찾을 수 없습니다</h1>
        <p className="text-sm text-muted-foreground">
          요청하신 페이지가 존재하지 않거나 이동되었습니다.
        </p>
      </div>

      <div className="flex gap-3">
        <Button asChild variant="outline">
          <Link href="/">
            <Home className="mr-2 size-4" />
            홈으로
          </Link>
        </Button>

        <Button asChild>
          <button onClick={() => history.back()}>
            <ArrowLeft className="mr-2 size-4" />
            이전 페이지
          </button>
        </Button>
      </div>
    </div>
  )
}
