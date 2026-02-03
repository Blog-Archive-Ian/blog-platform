'use client'

import { ToggleButton } from '@/shared/ui/molecules/toggle-button'
import { cn } from '@blog/ui'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const Header = () => {
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-12 border-b border-border bg-background/80 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex h-full max-w-487.5 items-center justify-between px-4 md:px-13">
        <Link href="/" className="font-medium text-sm hover:opacity-80 transition">
          Archive | Ian&apos;s Tech Blog
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/about"
            className={cn(
              'text-sm transition',
              pathname === '/about'
                ? 'text-foreground font-medium'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            About
          </Link>

          <ToggleButton />
        </div>
      </div>
    </header>
  )
}
