import { Footer } from '@/shared/ui/organisms/footer'
import { Header } from '@/shared/ui/organisms/header'

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="lg:pt-12">
        <div className="mx-auto max-w-500 px-6">
          <div className="flex gap-8">
            <main className="min-w-0 flex-1 lg:mt-10">{children}</main>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
