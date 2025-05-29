import { useMutation } from '@tanstack/react-query'

import {
  signIn, type SignInParams
} from '../requests/sign-in'

export function useSignIn() {
  return useMutation({
    mutationFn: (params: SignInParams) => signIn(params),
  })
}
