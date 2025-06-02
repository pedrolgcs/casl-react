import type { Task } from '@/types/task'

import { api } from '../api'

export type CreateTaskParams = {
  title: string
  description: string
  createdBy: string
  createdByName: string
  createdAt: string
  highlighted: boolean
}

export type GetTasksResponse = Task

export async function createTask(params: CreateTaskParams) {
  const {
    title,
    description,
    createdBy,
    createdByName,
    highlighted,
    createdAt,
  } = params
  const result = await api
    .post('tasks', {
      json: {
        title,
        description,
        createdBy,
        createdByName,
        createdAt,
        highlighted,
      },
    })
    .json<GetTasksResponse>()
  return result
}
