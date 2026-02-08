import { useEffect } from 'react'

export function LightThemeLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const root = document.documentElement

    // 다크 관련 클래스/속성 제거
    root.classList.remove('dark')
    root.classList.add('light')

    // 혹시 data attribute 쓰고 있으면
    root.setAttribute('data-theme', 'light')
    root.setAttribute('data-color-mode', 'light')
  }, [])

  return <>{children}</>
}
