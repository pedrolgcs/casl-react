'use client'

import { defineAbilityFor } from '@/lib/casl'
import { useAppStore } from '@/store'

export function useAbility() {
  const currentUser = useAppStore((state) => state.profile)

  const ability = defineAbilityFor({
    __typename: 'User',
    id: currentUser.id,
    role: currentUser.role,
  })

  return { ability }
}
