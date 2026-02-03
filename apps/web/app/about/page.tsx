import { aboutData } from '@/shared/data/about.data'
import { Badge, Separator } from '@blog/ui'
import Image from 'next/image'

export const metadata = {
  title: 'About',
  description: 'Archive | Ian Blog - About',
}

export default function AboutPage() {
  const { profile, techStack, career, education, awards, projects } = aboutData

  return (
    <div className="mx-auto w-full max-w-250 px-4 py-20 lg:py-16">
      <section>
        <div className="flex flex-col md:flex-row gap-6 md:gap-16 items-start">
          {/* 사진 */}
          <div className="shrink-0">
            <div className="relative h-24 w-24 md:h-55 md:w-55 overflow-hidden rounded-full border border-border bg-muted">
              <Image
                src={profile.imageUrl}
                alt={`${profile.name} profile`}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* 이름 + 소개 */}
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">{profile.name}</h1>

            {profile.description.map((line, index) => (
              <p
                key={index}
                className="mt-3 text-sm md:text-base text-muted-foreground whitespace-pre-line leading-6"
              >
                {line}
              </p>
            ))}
          </div>
        </div>

        <Separator className="my-8" />

        {/* 기술스택 */}
        <Section title={techStack.title}>
          <div className="flex flex-col gap-4">
            <StackRow label="Frontend ">
              {techStack.items.frontend.map((s) => (
                <Badge key={s} className="rounded-md px-3 py-1 text-muted-foreground bg-muted/40">
                  {s}
                </Badge>
              ))}
            </StackRow>

            <StackRow label="Backend · Infra">
              {techStack.items.backend.map((s) => (
                <Badge key={s} className="rounded-md px-3 py-1 text-muted-foreground bg-muted/40">
                  {s}
                </Badge>
              ))}
            </StackRow>
          </div>
        </Section>

        <Separator className="my-8" />

        {/* 경력 */}
        <Section title={career.title}>
          <div className="space-y-4">
            {career.items.map((c) => (
              <div
                key={`${c.company}-${c.period}`}
                className="rounded-2xl border border-border bg-muted/10 dark:bg-muted/20 p-4"
              >
                <div className="flex flex-row items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-medium">{c.company}</p>
                    <p className="text-sm text-muted-foreground">{c.role}</p>
                  </div>

                  <DatePill>{c.period}</DatePill>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Separator className="my-8" />

        {/* 수상 */}
        <Section title={awards.title}>
          <div className="space-y-4">
            {awards.items.map((a) => (
              <div
                key={`${a.name}-${a.date}`}
                className="rounded-2xl border border-border bg-muted/10 dark:bg-muted/20 p-4"
              >
                <div className="flex flex-row items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-medium">{a.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {a.organizer}
                      {a.type ? ` · ${a.type}` : ''}
                    </p>
                  </div>

                  <DatePill>{a.date}</DatePill>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Separator className="my-8" />

        {/* 교육 */}
        <Section title={education.title}>
          <div className="space-y-4">
            {education.items.map((e) => (
              <div
                key={`${e.school}-${e.period}`}
                className="rounded-2xl border border-border bg-muted/10 dark:bg-muted/20 p-4"
              >
                <div className="flex flex-row items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-medium">{e.school}</p>
                    <p className="text-sm text-muted-foreground">
                      {e.type}
                      {e.major ? ` · ${e.major}` : ''}
                      {e.status ? ` · ${e.status}` : ''}
                    </p>
                  </div>

                  <DatePill>{e.period}</DatePill>
                </div>
              </div>
            ))}
          </div>
        </Section>
        <Separator className="my-8" />

        {/* 프로젝트 */}
        <Section title={projects.title}>
          <div className="flex flex-col gap-3">
            {projects.items.map((p) => (
              <div
                key={p.name}
                className="rounded-2xl border border-border bg-muted/10 dark:bg-muted/20 p-4"
              >
                {/* 한 줄 본문 */}
                <p className="text-sm leading-relaxed">
                  <span className="font-medium text-foreground">{p.name}</span>
                  <span className="text-muted-foreground"> | {p.description}</span>
                </p>

                {/* 링크 */}
                <div className="mt-2 flex gap-4">
                  {p.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground transition"
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>
      </section>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  )
}

function DatePill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center justify-center rounded-md px-3 py-1 text-xs md:text-sm text-muted-foreground bg-muted/40 text-center leading-tight">
      {children}
    </span>
  )
}

function StackRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-start md:flex-row md:items-center gap-2">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  )
}
