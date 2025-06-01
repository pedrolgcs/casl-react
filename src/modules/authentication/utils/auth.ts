'use server'

import { getCookie } from 'cookies-next'
import { cookies } from 'next/headers'

import { getUser } from '@/http/requests/get-user'
import { defineAbilityFor } from '@/lib/casl'

export async function ability() {
  try {
    const userId = await getCookie('taskboard', { cookies })

    if (!userId) return null

    const user = await getUser({ id: userId })

    const ability = defineAbilityFor({
      __typename: 'User',
      id: user.id,
      role: user.role,
    })

    return ability
  } catch (error) {
    return null
  }
}
