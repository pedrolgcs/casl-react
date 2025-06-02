import { createJSONStorage, persist } from 'zustand/middleware'

import type { User } from '@/types/user'

type State = {
  profile: User
  _hasHydratedAuth: boolean
}

type Actions = {
  setProfile: (payload: User) => void
}

export type AuthSlice = State & Actions

const defaultState: State = {
  profile: {
    id: '',
    name: '',
    role: 'VIEWER',
    avatar: '',
  },
  _hasHydratedAuth: false,
}

export const createAuthSlice = persist<AuthSlice>(
  (set): AuthSlice => ({
    ...defaultState,

    setProfile: (payload) => set({ profile: payload }),
  }),
  {
    name: 'taskboard-auth',
    storage: createJSONStorage(() => localStorage),
    onRehydrateStorage: () => (state) => {
      if (state) state._hasHydratedAuth = true
    },
  },
)
