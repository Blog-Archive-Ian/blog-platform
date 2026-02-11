import { FilteredPostListQuerySchema } from '@blog/contracts'
import { z } from 'zod'

const PIN_OPTIONS = ['all', 'true', 'false'] as const
export type PinValue = (typeof PIN_OPTIONS)[number]

const ARCHIVE_OPTIONS = ['all', 'true', 'false'] as const
export type ArchiveValue = (typeof ARCHIVE_OPTIONS)[number]

export const UiPostListQuerySchema = FilteredPostListQuerySchema.extend({
  pinned: z.union([z.literal('all'), z.literal('true'), z.literal('false')]).optional(),
  archived: z.union([z.literal('all'), z.literal('true'), z.literal('false')]).optional(),
})
export type UiPostListQuery = z.infer<typeof UiPostListQuerySchema>
