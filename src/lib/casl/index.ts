import {
  AbilityBuilder,
  type CreateAbility,
  createMongoAbility,
  type MongoAbility,
} from '@casl/ability'
import { z } from 'zod'

import { type User } from './models'
import { permissions } from './permissions'
import { taskSubject } from './subjects'

export * from './models'
export * from './subjects'
export * from './role'

// group all subjects
const appAbilitiesSchema = z.union([
  taskSubject,
  z.tuple([z.literal('manage'), z.literal('all')]),
])

type AppAbilities = z.infer<typeof appAbilitiesSchema>

export type AppAbility = MongoAbility<AppAbilities>

const createAppAbility: CreateAbility<AppAbility> = createMongoAbility

export function defineAbilityFor(user: User) {
  const builder = new AbilityBuilder(createAppAbility)

  const permissionsForRole = permissions[user.role]

  if (typeof permissionsForRole !== 'function') {
    throw new Error(`Permissions for role ${user.role} is not defined.`)
  }

  // apply rules for user
  permissionsForRole(user, builder)

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
