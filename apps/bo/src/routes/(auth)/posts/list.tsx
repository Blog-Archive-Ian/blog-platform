import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/posts/list')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(auth)/posts/list"!</div>
}
