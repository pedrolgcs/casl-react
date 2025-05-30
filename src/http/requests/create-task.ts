import { api } from '../api'

export type CreateTaskParams = {
  title: string
  description: string
  createdBy: string
  createdByName: string
  createdAt: string
}

export type GetTasksResponse = {
  id: string
  title: string
  description: string
  createdBy: string
  createdByName: string
  createdAt: string
}

export async function createTask(params: CreateTaskParams) {
  const { title, description, createdBy, createdByName, createdAt } = params
  const result = await api
    .post('tasks', {
      json: {
        title,
        description,
        createdBy,
        createdByName,
        createdAt,
      },
    })
    .json<GetTasksResponse>()
  return result
}
