import { z } from 'zod'

import { departmentSchema } from '../models'

export const departmentSubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('get'),
    z.literal('create'),
    z.literal('update'),
    z.literal('delete'),
  ]),
  z.union([z.literal('Department'), departmentSchema]),
])

export type DepartmentSubject = z.infer<typeof departmentSubject>
