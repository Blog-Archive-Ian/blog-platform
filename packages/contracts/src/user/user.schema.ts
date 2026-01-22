import { z } from 'zod'

export const UserSchema = z.object({
  name: z.string(),
  id: z.string(),
  email: z.string().email(),
  instagramId: z.string(),
  intro: z.string(),
  personalUrl: z.string().url(),
  githubId: z.string(),
  profileImage: z.string().url(),
})

export type User = z.infer<typeof UserSchema>
