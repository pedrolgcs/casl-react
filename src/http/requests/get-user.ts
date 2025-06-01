import { api } from '../api'

export type GetUserParams = {
  id: string
}

export type GetUserResponse = {
  id: string
  name: string
  role: 'ADMIN' | 'MANAGER' | 'VIEWER'
  avatar: string
}

export async function getUser(params: GetUserParams) {
  const { id } = params
  const result = await api.get(`users/${id}`).json<GetUserResponse>()
  return result
}
