import { EditPostPage } from '@/pages/post/edit-post-page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/posts/edit/$postSeq')({
  component: EditPostPage,
})
