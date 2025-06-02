import type { Task } from '@/types/task'

import { api } from '../api'

export type EditTaskParams = {
  id: string
  title: string
  description: string
  highlighted: boolean
}

export type EditTaskResponse = Task

export async function editTask(params: EditTaskParams) {
  const { id, title, description, highlighted } = params
  const result = await api
    .patch(`tasks/${id}`, {
      json: {
        title,
        description,
        highlighted,
      },
    })
    .json<EditTaskResponse>()
  return result
}
