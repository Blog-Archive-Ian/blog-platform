import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/user/info')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(auth)/user/info"!</div>
}
