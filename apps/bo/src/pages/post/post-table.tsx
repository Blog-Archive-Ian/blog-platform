import type { GetPostListData } from '@blog/contracts'
import { Button } from '@blog/ui'
import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from '@tanstack/react-table'
import { Archive, Pencil, Pin, Trash2 } from 'lucide-react'

export type PostRow = GetPostListData['posts'][number]
export const postColumns: ColumnDef<PostRow>[] = [
  {
    accessorKey: 'title',
    header: '제목',
    cell: ({ row }) => (
      <div className="min-w-0">
        <p className="truncate font-medium">{row.original.title}</p>
        <p className="text-xs text-muted-foreground">ID: {row.original.postSeq}</p>
      </div>
    ),
  },
  {
    accessorKey: 'category',
    header: '카테고리',
    cell: ({ getValue }) => getValue<string>() ?? '-',
  },
  {
    accessorKey: 'tags',
    header: '태그',
    cell: ({ row }) => {
      const tags = (row.original as any).tags as string[] | undefined // 타입에 tags가 없으면 any 제거하고 PostRow 타입 보완
      if (!tags?.length) return <span className="text-muted-foreground">-</span>

      return (
        <div className="flex flex-wrap gap-1.5">
          {tags.slice(0, 4).map((t) => (
            <span key={t} className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
              {t}
            </span>
          ))}
          {tags.length > 4 && (
            <span className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
              +{tags.length - 4}
            </span>
          )}
        </div>
      )
    },
  },
  {
    id: 'edit',
    header: () => <span className="w-full flex justify-center">Edit</span>,
    enableSorting: false,
    enableHiding: false,
    cell: () => (
      <div className="flex justify-center">
        <Button size="icon" variant="ghost" disabled aria-label="Edit">
          <Pencil className="size-4" />
        </Button>
      </div>
    ),
  },
  {
    id: 'delete',
    header: () => <span className="w-full flex justify-center">Delete</span>,
    enableSorting: false,
    enableHiding: false,
    cell: () => (
      <div className="flex justify-center">
        <Button size="icon" variant="ghost" disabled aria-label="Delete">
          <Trash2 className="size-4 text-red-500" />
        </Button>
      </div>
    ),
  },
  {
    id: 'pin',
    header: () => <span className="flex w-full justify-center">Pin</span>,
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => {
      const pinned = row.original.pinned

      return (
        <div className="flex justify-center">
          <Button
            size="icon"
            variant={pinned ? 'secondary' : 'ghost'}
            disabled
            aria-label={pinned ? 'Unpin' : 'Pin'}
            className={pinned ? 'text-foreground' : 'text-muted-foreground'}
          >
            <Pin className={pinned ? 'size-4 fill-current' : 'size-4'} />
          </Button>
        </div>
      )
    },
  },
  {
    id: 'archive',
    header: () => <span className="flex w-full justify-center">Archive</span>,
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => {
      const archived = row.original.archived

      return (
        <div className="flex justify-center">
          <Button
            size="icon"
            variant={archived ? 'secondary' : 'ghost'}
            disabled
            aria-label={archived ? 'Unarchive' : 'Archive'}
            className={archived ? 'text-foreground' : 'text-muted-foreground'}
          >
            <Archive className={archived ? 'size-4 fill-current' : 'size-4'} />
          </Button>
        </div>
      )
    },
  },
]

type Props = {
  data?: PostRow[]
  isLoading?: boolean
}

export function PostTable({ data = [], isLoading }: Props) {
  const table = useReactTable({
    data,
    columns: postColumns,
    getCoreRowModel: getCoreRowModel(),
  })

  if (isLoading) {
    return (
      <div className="rounded-xl border bg-card p-6 text-sm text-muted-foreground">Loading…</div>
    )
  }

  return (
    <div className="rounded-xl border bg-card">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/30 text-xs text-muted-foreground">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th key={header.id} className="px-5 py-3 text-left font-medium">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={postColumns.length}
                  className="px-5 py-10 text-center text-muted-foreground"
                >
                  게시글이 없습니다.
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-b last:border-b-0">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-5 py-4">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
