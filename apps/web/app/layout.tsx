import '@/global.css'
import type { Metadata } from 'next'
import { QueryProvider } from '../shared/providers/query-provider'
import { ThemeProvider } from '../shared/providers/theme-provider'
import { SWRegister } from './sw-register'

export const metadata: Metadata = {
  title: {
    default: 'Archive | 기술블로그',
    template: '%s | Archive',
  },
  icons: {
    icon: [
      { url: '/icon/logo.png' },
      { url: '/icon/logo-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon/logo-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  description: "Ian's Tech Blog",
  metadataBase: new URL('https://blog.minjae-dev.com'),
  manifest: '/manifest.webmanifest',
  openGraph: {
    type: 'website',
    siteName: 'Archive',
    title: 'Archive | 기술블로그',
    images: ['/og.png'],
    description: '프론트엔드 기술 블로그입니다. 다양한 기술 스택과 개발 경험을 공유합니다.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Archive',
    images: ['/og.png'],
    description: '프론트엔드 기술 블로그입니다. 다양한 기술 스택과 개발 경험을 공유합니다.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  const theme = localStorage.getItem('theme');
                  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const resolved =
                    theme === 'dark' || theme === 'light'
                      ? theme
                      : systemDark
                      ? 'dark'
                      : 'light';

                  document.documentElement.classList.add(resolved);
                  document.documentElement.setAttribute('data-color-mode', resolved);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <SWRegister />

        <QueryProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
