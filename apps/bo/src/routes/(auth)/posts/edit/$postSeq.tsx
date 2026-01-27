import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/posts/edit/$postSeq')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(auth)/posts/edit/$postSeq"!</div>
}
