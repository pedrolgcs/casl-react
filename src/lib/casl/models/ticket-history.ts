import { z } from 'zod'

export const ticketHistorySchema = z.object({
  __typename: z.literal('TicketHistory').default('TicketHistory'),
  departmentId: z.string(),
})

export type TicketHistory = z.infer<typeof ticketHistorySchema>
