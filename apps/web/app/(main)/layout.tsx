import { MobileUserInfo } from '@/features/user/user-info/ui/mobile-user-info'
import { UserInfo } from '@/features/user/user-info/ui/user-info'
import { Footer } from '@/shared/ui/organisms/footer'
import { Header } from '@/shared/ui/organisms/header'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Header />

      <div className="block lg:hidden my-10">
        <MobileUserInfo />
      </div>

      <div className="lg:pt-12">
        <div className="mx-auto max-w-500 px-6">
          <div className="flex gap-8 ">
            <aside className="hidden w-80 lg:block shrink-0 ">
              <div className="sticky top-18 pt-8">
                <UserInfo />
              </div>
            </aside>

            <main className="min-w-0 flex-1 lg:mt-10">{children}</main>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
