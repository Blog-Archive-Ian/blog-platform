import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/user/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(auth)/user/edit"!</div>
}
