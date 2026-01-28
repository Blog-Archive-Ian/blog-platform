import { Outlet, createRootRoute } from '@tanstack/react-router'
import * as React from 'react'

export const Route = createRootRoute({
  // beforeLoad: async () => {
  //   const cached = queryClient.getQueryData(authCheckQueryOptions.queryKey)
  //   if (cached) return

  //   const res = await queryClient.ensureQueryData(authCheckQueryOptions)

  //   if (res.status === 200) throw redirect({ to: '/dashboard', replace: true })
  // },
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  )
}
