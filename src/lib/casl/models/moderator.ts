import { z } from 'zod'

import { roleSchema } from '../role'

export const moderatorSchema = z.object({
  __typename: z.literal('Moderator').default('Moderator'),
  id: z.string(),
  role: roleSchema,
  memberOn: z.array(z.string()).default([]),
})

export type Moderator = z.infer<typeof moderatorSchema>
