import { useQuery } from '@tanstack/react-query'

import { getTasks } from '../requests/get-tasks'

export const USE_GET_TASKS_QUERY_KEY = 'tasks'

export type UseGetTasksQueryKey = [typeof USE_GET_TASKS_QUERY_KEY]

export function useGetTasks() {
  const key: UseGetTasksQueryKey = [USE_GET_TASKS_QUERY_KEY]

  return useQuery({
    queryKey: key,
    queryFn: () => getTasks(),
    staleTime: Infinity,
  })
}
