import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/posts/archived/list')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(auth)/posts/archived/list"!</div>
}
