import { z } from 'zod'
import { PaginationQuerySchema } from '../common'

export const PostSchema = z.object({
  postSeq: z.number(),
  title: z.string(),
  content: z.string(),
  category: z.string(),
  tags: z.array(z.string()),
  createdAt: z.string(),
  authorName: z.string(),
  views: z.number(),
  pinned: z.boolean(),
  archived: z.boolean(),
})

export type Post = z.infer<typeof PostSchema>

export const PostListQuerySchema = PaginationQuerySchema.extend({
  tag: z.string().optional(),
  category: z.string().optional(),
})
