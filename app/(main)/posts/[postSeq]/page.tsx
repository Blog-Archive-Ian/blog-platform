'use client'

import { useParams } from 'next/navigation'

export default function PostPage() {
  const params = useParams<{ postSeq: string }>()
  const postSeq = params!.postSeq

  return <div>Post Page: {postSeq}</div>
}
