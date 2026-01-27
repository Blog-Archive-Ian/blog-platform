import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/posts/$postSeq')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(auth)/posts/$postSeq"!</div>
}
