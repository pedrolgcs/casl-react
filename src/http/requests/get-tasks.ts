import { api } from '../api'

export type GetTasksResponse = Array<{
  id: string
  title: string
  description: string
  createdBy: string
  createdByName: string
  createdAt: string
}>

export async function getTasks() {
  const result = await api.get('tasks').json<GetTasksResponse>()
  return result
}
