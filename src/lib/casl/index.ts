import {
  AbilityBuilder,
  type CreateAbility,
  createMongoAbility,
  type MongoAbility,
} from '@casl/ability'
import { z } from 'zod'

import { Moderator } from './models'
import { permissions } from './permissions'
import {
  cityHallSubject,
  departmentSubject,
  moderatorSubject,
  ticketHistorySubject,
  ticketSubject,
  userSubject,
} from './subjects'

export * from './models'
export * from './subjects'
export * from './role'

// group all subjects
const appAbilitiesSchema = z.union([
  userSubject,
  cityHallSubject,
  departmentSubject,
  moderatorSubject,
  ticketSubject,
  ticketHistorySubject,
  z.tuple([z.literal('manage'), z.literal('all')]),
])

type AppAbilities = z.infer<typeof appAbilitiesSchema>

export type AppAbility = MongoAbility<AppAbilities>

const createAppAbility: CreateAbility<AppAbility> = createMongoAbility

export function defineAbilityFor(moderator: Moderator) {
  const builder = new AbilityBuilder(createAppAbility)

  const permissionsForRole = permissions[moderator.role]

  if (typeof permissionsForRole !== 'function') {
    throw new Error(`Permissions for role ${moderator.role} is not defined.`)
  }

  // apply rules for moderator
  permissionsForRole(moderator, builder)

  const ability = builder.build({
    detectSubjectType(subject) {
      return subject.__typename
    },
  })

  // bind methods
  ability.can = ability.can.bind(ability)
  ability.cannot = ability.cannot.bind(ability)

  return ability
}
