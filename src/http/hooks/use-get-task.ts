import { useQuery } from '@tanstack/react-query'

import { getTask, GetTasksParams } from '../requests/get-task'

export const USE_GET_TASK_QUERY_KEY = 'task'

export type UseGetTaskQueryKey = [typeof USE_GET_TASK_QUERY_KEY, taskId: string]

export function useGetTask(params: GetTasksParams) {
  const key: UseGetTaskQueryKey = [USE_GET_TASK_QUERY_KEY, params.id]

  return useQuery({
    queryKey: key,
    queryFn: () => getTask(params),
    staleTime: Infinity,
  })
}
