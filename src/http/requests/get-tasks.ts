import type { Task } from '@/types/task'

import { api } from '../api'

export type GetTasksResponse = Array<Task>

export async function getTasks() {
  const result = await api
    .get('tasks', {
      searchParams: {
        _sort: 'highlighted',
        _order: 'desc',
      },
    })
    .json<GetTasksResponse>()
  return result
}
