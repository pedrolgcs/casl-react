import { z } from 'zod'

import { moderatorSchema } from '../models'

export const moderatorSubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('create'),
    z.literal('get'),
    z.literal('update'),
    z.literal('updatePermission'),
    z.literal('delete'),
  ]),
  z.union([z.literal('Moderator'), moderatorSchema]),
])

export type ModeratorSubject = z.infer<typeof moderatorSubject>
