'use client'

import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes'
import { type ReactNode, useLayoutEffect } from 'react'

export function ColorModeSync() {
  const { theme, resolvedTheme } = useTheme()

  useLayoutEffect(() => {
    const mode = theme === 'system' ? resolvedTheme : theme
    if (mode) {
      document.documentElement.setAttribute('data-color-mode', mode)
    }
  }, [theme, resolvedTheme])

  return null
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ColorModeSync />
      {children}
    </NextThemesProvider>
  )
}
