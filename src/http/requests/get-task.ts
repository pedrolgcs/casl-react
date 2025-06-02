import type { Task } from '@/types/task'

import { api } from '../api'

export type GetTasksParams = {
  id: string
}

export type GetTasksResponse = Task

export async function getTask(params: GetTasksParams) {
  const { id } = params
  const result = await api.get(`tasks/${id}`).json<GetTasksResponse>()
  return result
}
