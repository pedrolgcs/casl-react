import { createContext, useContext, useMemo } from 'react'

import { type AppAbility, defineAbilityFor } from '@/lib/casl'
import { useAppStore } from '@/store'

export const AbilityContext = createContext<AppAbility>(undefined as never)

type AbilityProviderProps = {
  children: React.ReactNode
}

export function AbilityProvider({ children }: AbilityProviderProps) {
  const currentUser = useAppStore((state) => state.profile)

  const ability = useMemo(() => {
    return defineAbilityFor({
      __typename: 'User',
      id: currentUser.id,
      role: currentUser.role,
    })
  }, [currentUser.id, currentUser.role])

  return (
    <AbilityContext.Provider value={ability}>
      {children}
    </AbilityContext.Provider>
  )
}

export const useAbility = () => {
  const ability = useContext(AbilityContext)

  return { ability }
}
