'use client'

import { useEffect, useState } from 'react'

import type { AppAbility } from '@/lib/casl'
import { defineAbilityFor } from '@/lib/casl'
import { useAppStore } from '@/store'

export function useAbility() {
  const [ability, setAbility] = useState<AppAbility | null>(null)

  const currentUser = useAppStore((state) => state.profile)

  useEffect(() => {
    async function getAbility() {
      const ability = defineAbilityFor({
        __typename: 'User',
        id: currentUser.id,
        role: currentUser.role,
      })

      setAbility(ability)
    }

    getAbility()

    return () => setAbility(null)
  }, [currentUser.id, currentUser.role])

  return { ability }
}
