'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { Toaster } from '@/components/ui/sonner'
import { AbilityProvider } from '@/context/ability-provider'
import { AppStoreProvider } from '@/context/app-store-provider'
import { queryClient } from '@/lib/react-query'
import { useAppStore } from '@/store'

export function Providers({ children }: { children: React.ReactNode }) {
  const hasHydratedAuth = useAppStore((state) => state._hasHydratedAuth)
  if (!hasHydratedAuth) return null

  return (
    <QueryClientProvider client={queryClient}>
      <AppStoreProvider>
        <AbilityProvider>
          <Toaster richColors position="top-center" />
          {children}
        </AbilityProvider>
        <ReactQueryDevtools />
      </AppStoreProvider>
    </QueryClientProvider>
  )
}
