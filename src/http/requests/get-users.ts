import { api } from '../api'

export type GetUsersResponse = Array<{
  id: string
  name: string
  role: 'ADMIN' | 'MANAGER' | 'VIEWER'
  avatar: string
}>

export async function getUsers() {
  const result = await api.get('users').json<GetUsersResponse>()
  return result
}
