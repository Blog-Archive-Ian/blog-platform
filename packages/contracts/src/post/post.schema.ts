import { z } from 'zod'

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
