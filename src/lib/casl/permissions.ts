import { type AbilityBuilder } from '@casl/ability'

import { AppAbility } from './index'
import { User } from './models'
import { Role } from './role'

type PermissionsByRole = (
  user: User,
  builder: AbilityBuilder<AppAbility>,
) => void

export const permissions: Record<Role, PermissionsByRole> = {
  ADMIN: (_, { can }) => {
    can('manage', 'all')
  },

  MANAGER: (user, { can }) => {
    can(['get', 'create'], 'Task')

    can(['update', 'delete'], 'Task', {
      ownerId: { $eq: user.id },
    })
  },

  VIEWER: (_, { can }) => {
    can(['get'], 'Task')
  },
}
