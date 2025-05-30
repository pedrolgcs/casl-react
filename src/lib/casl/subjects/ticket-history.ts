import { z } from 'zod'

import { ticketHistorySchema } from '../models'

export const ticketHistorySubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('get'),
    z.literal('accept'),
    z.literal('reject'),
  ]),
  z.union([z.literal('TicketHistory'), ticketHistorySchema]),
])

export type TicketHistorySubject = z.infer<typeof ticketHistorySubject>
