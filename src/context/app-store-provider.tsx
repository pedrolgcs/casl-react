import { ReactNode } from 'react'

import { useAppStore } from '@/store'

type AuthProviderProps = {
  children: ReactNode
}

export function AppStoreProvider({ children }: AuthProviderProps) {
  const hasHydrated = useAppStore((state) => state._hasHydratedAuth)

  if (!hasHydrated) {
    return null
  }

  return <>{children}</>
}
