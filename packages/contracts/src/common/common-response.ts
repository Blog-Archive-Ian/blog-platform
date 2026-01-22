import { z } from 'zod'

export const ApiResponse = <T extends z.ZodTypeAny>(schema: T) =>
  z.object({
    status: z.number(),
    message: z.string(),
    data: schema,
  })

export const PaginatedResponse = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    posts: z.array(itemSchema),
    totalCount: z.number(),
  })
