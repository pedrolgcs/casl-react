import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteTask, type DeleteTaskParams } from '../requests/delete-task'
import {
  USE_GET_TASKS_QUERY_KEY,
  type UseGetTasksQueryKey,
} from './use-get-tasks'

export function useDeleteTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: DeleteTaskParams) => deleteTask(params),
    onSuccess: () => {
      const tasksKey: UseGetTasksQueryKey = [USE_GET_TASKS_QUERY_KEY]
      queryClient.refetchQueries({
        queryKey: tasksKey,
      })
    },
  })
}
