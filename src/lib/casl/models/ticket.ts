import { z } from 'zod'

export const ticketSchema = z.object({
  __typename: z.literal('Ticket').default('Ticket'),
  id: z.string(),
  ownerId: z.string(),
  departmentId: z.string(),
})

export type Ticket = z.infer<typeof ticketSchema>
