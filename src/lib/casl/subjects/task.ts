import { z } from 'zod'

import { taskSchema } from '../models'

export const taskSubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('get'),
    z.literal('create'),
    z.literal('update'),
    z.literal('delete'),
    z.literal('highlight'),
    z.literal('complete'),
    z.literal('reopen'),
  ]),
  z.union([z.literal('Task'), taskSchema]),
])

export type TaskSubject = z.infer<typeof taskSubject>
