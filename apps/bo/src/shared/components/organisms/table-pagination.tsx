import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@blog/ui'

type Props = {
  page: number
  size: number
  totalCount: number
  onChangePage: (nextPage: number) => void
}

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n))

export function TablePagination({ page, size, totalCount, onChangePage }: Props) {
  const totalPages = Math.max(1, Math.ceil(totalCount / size))
  const current = clamp(page, 1, totalPages)

  const windowSize = 5
  const half = Math.floor(windowSize / 2)
  const start = clamp(current - half, 1, Math.max(1, totalPages - windowSize + 1))
  const end = clamp(start + windowSize - 1, 1, totalPages)

  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i)

  return (
    <div className="flex items-center justify-between gap-3 py-4">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={(e) => {
                e.preventDefault()
                onChangePage(clamp(current - 1, 1, totalPages))
              }}
            />
          </PaginationItem>

          {pages.map((p) => (
            <PaginationItem key={p}>
              <PaginationLink
                className={p === current ? 'bg-primary text-primary-foreground' : ''}
                isActive={p === current}
                onClick={(e) => {
                  e.preventDefault()
                  onChangePage(p)
                }}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={(e) => {
                e.preventDefault()
                onChangePage(clamp(current + 1, 1, totalPages))
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
