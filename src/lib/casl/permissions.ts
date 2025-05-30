import { type AbilityBuilder } from '@casl/ability'

import { AppAbility } from './index'
import { Moderator } from './models'
import { Role } from './role'

type PermissionsByRole = (
  user: Moderator,
  builder: AbilityBuilder<AppAbility>,
) => void

export const permissions: Record<Role, PermissionsByRole> = {
  ADMIN: (_, { can }) => {
    can('manage', 'all')
  },

  MANAGER: (user, { can }) => {
    can(['get'], 'User')

    can(['get', 'update', 'delete'], 'Moderator')

    can(['get'], 'Ticket', {
      departmentId: { $in: user.memberOn },
    })

    can(['get', 'accept', 'reject'], 'TicketHistory', {
      departmentId: { $in: user.memberOn },
    })
  },

  ADMINISTRATION: (user, { can }) => {
    can(['get'], 'User')

    can(['get'], 'Ticket', {
      departmentId: { $in: user.memberOn },
    })

    can(['get', 'accept', 'reject'], 'TicketHistory', {
      departmentId: { $in: user.memberOn },
    })
  },
}
