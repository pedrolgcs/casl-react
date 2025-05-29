import { QueryClient } from '@tanstack/react-query'

export type CustomQueryOptions = {
  enabled?: boolean
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
    },
  },
})
