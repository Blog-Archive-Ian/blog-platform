import { z } from 'zod'

export const ApiResponse = <T extends z.ZodTypeAny>(schema: T) =>
  z.object({
    status: z.number(),
    message: z.string(),
    data: schema.optional().nullable(),
  })

export const ApiResponseStrict = <T extends z.ZodTypeAny>(schema: T) =>
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

export const PaginationQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  size: z.coerce.number().int().min(1).max(100).default(10),
})

export type PaginationQuery = z.infer<typeof PaginationQuerySchema>

export const zQueryBool = z.preprocess((v) => {
  if (v === undefined) return undefined
  if (typeof v === 'boolean') return v

  const s = Array.isArray(v) ? v[0] : v

  if (s === 'true' || s === '1') return true
  if (s === 'false' || s === '0') return false

  return s
}, z.boolean())
