import { create } from 'zustand'

import { type AuthSlice, createAuthSlice } from './auth-slice'

export const useAppStore = create<AuthSlice>()((...a) => ({
  ...createAuthSlice(...a),
}))
