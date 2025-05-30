import { createJSONStorage, persist } from 'zustand/middleware'

type Profile = {
  id: string
  name: string
  role: 'ADMIN' | 'MANAGER' | 'VIEWER'
  avatar: string
}

type State = {
  profile: Profile
  _hasHydratedAuth: boolean
}

type Actions = {
  setProfile: (payload: Profile) => void
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
