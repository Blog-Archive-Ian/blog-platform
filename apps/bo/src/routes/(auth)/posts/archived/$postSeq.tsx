import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/posts/archived/$postSeq')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(auth)/posts/archived/$postSeq"!</div>
}
