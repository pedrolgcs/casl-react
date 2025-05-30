'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { Toaster } from '@/components/ui/sonner'
import { AuthProvider } from '@/context/auth-provider'
import { queryClient } from '@/lib/react-query'
import { useAppStore } from '@/store'

export function Providers({ children }: { children: React.ReactNode }) {
  const hasHydratedAuth = useAppStore((state) => state._hasHydratedAuth)
  if (!hasHydratedAuth) return null

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster richColors position="top-center" />
        {children}
        <ReactQueryDevtools />
      </AuthProvider>
    </QueryClientProvider>
  )
}
