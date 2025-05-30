import { z } from 'zod'

export const departmentSchema = z.object({
  __typename: z.literal('Department').default('Department'),
  id: z.string(),
})

export type Department = z.infer<typeof departmentSchema>
