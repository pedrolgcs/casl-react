import { api } from '../api'

export type DeleteTaskParams = {
  id: string
}

export type DeleteTasksResponse = void

export async function deleteTask(params: DeleteTaskParams) {
  const { id } = params
  const result = await api.delete(`tasks/${id}`).json<DeleteTasksResponse>()
  return result
}
