import { z } from 'zod'

export const cityHallSubject = z.tuple([
  z.union([z.literal('manage'), z.literal('get')]),
  z.literal('CityHall'),
])

export type CityHallSubject = z.infer<typeof cityHallSubject>
