import { router } from '@/router'
import { Toaster } from '@blog/ui'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { queryClient } from './shared/providers/query-provider'
import { LightThemeLayout } from './shared/providers/theme-porvider'

function App() {
  return (
    <LightThemeLayout>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <TanStackRouterDevtools router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster />
      </QueryClientProvider>
    </LightThemeLayout>
  )
}

export default App
