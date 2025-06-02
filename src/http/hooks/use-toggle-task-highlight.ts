import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
  toggleTaskHighlight,
  type ToggleTaskHighlightParams,
} from '../requests/toggle-task-highlight'
import {
  USE_GET_TASKS_QUERY_KEY,
  type UseGetTasksQueryKey,
} from './use-get-tasks'

export function useToggleTaskHighlight() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: ToggleTaskHighlightParams) =>
      toggleTaskHighlight(params),
    onSuccess: () => {
      const tasksKey: UseGetTasksQueryKey = [USE_GET_TASKS_QUERY_KEY]
      queryClient.refetchQueries({
        queryKey: tasksKey,
      })
    },
  })
}
