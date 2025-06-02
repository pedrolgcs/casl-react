import type { User } from '@/types/user'

import { api } from '../api'

export type GetUserParams = {
  id: string
}

export type GetUserResponse = User

export async function getUser(params: GetUserParams) {
  const { id } = params
  const result = await api.get(`users/${id}`).json<GetUserResponse>()
  return result
}
