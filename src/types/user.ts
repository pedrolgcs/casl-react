export type UserRole = 'ADMIN' | 'MANAGER' | 'VIEWER'

export type User = {
  id: string
  name: string
  role: UserRole
  avatar: string
}
