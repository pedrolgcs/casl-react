import type { User } from '@/types/user'

import { api } from '../api'

export type GetUsersResponse = Array<User>

export async function getUsers() {
  const result = await api.get('users').json<GetUsersResponse>()
  return result
}
