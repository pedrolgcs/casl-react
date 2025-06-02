import { type AbilityBuilder } from '@casl/ability'

import { AppAbility } from './index'
import { User } from './models'
import { Role } from './role'

type PermissionsByRole = (
  user: User,
  builder: AbilityBuilder<AppAbility>,
) => void

export const permissions: Record<Role, PermissionsByRole> = {
  ADMIN: (_, { can, cannot }) => {
    can('manage', 'all')

    cannot('complete', 'Task')
  },

  MANAGER: (user, { can }) => {
    can(['get', 'create', 'complete'], 'Task')

    can(['update', 'delete'], 'Task', {
      ownerId: { $eq: user.id },
    })
  },

  VIEWER: (_, { can }) => {
    can(['get'], 'Task')

    can(['complete'], 'Task')
  },
}
