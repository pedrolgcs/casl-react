import { z } from 'zod'

import { ticketSchema } from '../models'

export const ticketSubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('get'),
    z.literal('create'),
    z.literal('delete'),
  ]),
  z.union([z.literal('Ticket'), ticketSchema]),
])

export type TicketSubject = z.infer<typeof ticketSubject>
