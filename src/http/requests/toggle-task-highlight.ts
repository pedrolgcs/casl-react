import type { Task } from '@/types/task'

import { api } from '../api'

export type ToggleTaskHighlightParams = {
  id: string
  highlighted: boolean
}

export type ToggleTaskHighlightResponse = Task

export async function toggleTaskHighlight(params: ToggleTaskHighlightParams) {
  const { id, highlighted } = params
  const result = await api
    .patch(`tasks/${id}`, {
      json: {
        highlighted,
      },
    })
    .json<ToggleTaskHighlightResponse>()
  return result
}
