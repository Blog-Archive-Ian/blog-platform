import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/posts/pinned/list')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(auth)/posts/pinned/list"!</div>
}
