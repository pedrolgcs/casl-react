import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
  toggleCompleteTask,
  type ToggleCompleteTaskParams,
} from '../requests/toggle-complete-task'
import {
  USE_GET_TASKS_QUERY_KEY,
  type UseGetTasksQueryKey,
} from './use-get-tasks'

export function useToggleCompleteTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: ToggleCompleteTaskParams) =>
      toggleCompleteTask(params),
    onSuccess: () => {
      const tasksKey: UseGetTasksQueryKey = [USE_GET_TASKS_QUERY_KEY]
      queryClient.refetchQueries({
        queryKey: tasksKey,
      })
    },
  })
}
