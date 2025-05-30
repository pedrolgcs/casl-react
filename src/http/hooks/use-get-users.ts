import { useQuery } from '@tanstack/react-query'

import { getUsers } from '../requests/get-users'

export const USE_GET_USERS_QUERY_KEY = 'users'

export type UseGetUsersQueryKey = [typeof USE_GET_USERS_QUERY_KEY]

export function useGetUsers() {
  const key: UseGetUsersQueryKey = [USE_GET_USERS_QUERY_KEY]

  return useQuery({
    queryKey: key,
    queryFn: () => getUsers(),
    staleTime: Infinity,
  })
}
