import { MobileUserInfo } from '@/features/user/user-info/ui/mobile-user-info'
import { UserInfo } from '@/features/user/user-info/ui/user-info'
import { Header } from '@/shared/ui/organisms/header'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Header />

      <div className="block lg:hidden mt-10">
        <MobileUserInfo />
      </div>
      <div className="lg:pt-12">
        <div className="flex">
          <aside className="hidden w-90 lg:block lg:shrink-0">
            <div className="sticky top-18 flex justify-center pt-8">
              <UserInfo />
            </div>
          </aside>
          <main className="min-w-0 flex-1 p-8">{children}</main>{' '}
        </div>
      </div>
    </div>
  )
}
