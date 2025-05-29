import { api } from '../api'

export type SignInParams = {
  email: string
}

export type SignInResponse = void

export async function signIn(params: SignInParams) {
  const { email } = params

  const result = await api.post('users', {
    json: {
      email
    }
  }).json<SignInResponse>()

  return result
}
