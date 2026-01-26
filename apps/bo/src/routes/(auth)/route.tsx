import { queryClient } from '@/shared/providers/query-provider'
import { authCheckQueryOptions } from '@/shared/query-hook/user.query'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)')({
  beforeLoad: async () => {
    const cached = queryClient.getQueryData(authCheckQueryOptions.queryKey)
    if (cached) return

    const res = await queryClient.ensureQueryData(authCheckQueryOptions)

    if (res.status !== 200) throw redirect({ to: '/', replace: true })
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <Outlet />
    </div>
  )
}
