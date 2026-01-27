import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/posts/new')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(auth)/posts/new"!</div>
}
