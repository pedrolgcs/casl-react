import { useMutation, useQueryClient } from '@tanstack/react-query'

import { editTask, type EditTaskParams } from '../requests/edit-task'
import {
  USE_GET_TASKS_QUERY_KEY,
  type UseGetTasksQueryKey,
} from './use-get-tasks'

export function useEditTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: EditTaskParams) => editTask(params),
    onSuccess: () => {
      const tasksKey: UseGetTasksQueryKey = [USE_GET_TASKS_QUERY_KEY]
      queryClient.refetchQueries({
        queryKey: tasksKey,
      })
    },
  })
}
