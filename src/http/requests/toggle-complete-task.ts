import type { Task } from '@/types/task'

import { api } from '../api'

export type ToggleCompleteTaskParams = {
  id: string
  completed: boolean
}

export type ToggleCompleteTaskResponse = Task

export async function toggleCompleteTask(params: ToggleCompleteTaskParams) {
  const { id, completed } = params
  const result = await api
    .patch(`tasks/${id}`, {
      json: {
        completed,
      },
    })
    .json<ToggleCompleteTaskResponse>()
  return result
}
