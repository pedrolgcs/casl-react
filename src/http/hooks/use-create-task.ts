import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createTask, type CreateTaskParams } from '../requests/create-task'
import {
  USE_GET_TASKS_QUERY_KEY,
  type UseGetTasksQueryKey,
} from './use-get-tasks'

export function useCreateTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: CreateTaskParams) => createTask(params),
    onSuccess: () => {
      const tasksKey: UseGetTasksQueryKey = [USE_GET_TASKS_QUERY_KEY]
      queryClient.refetchQueries({
        queryKey: tasksKey,
      })
    },
  })
}
