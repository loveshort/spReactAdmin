import { create } from 'zustand'

const TOKEN_KEY = 'token'

export const useAuthStore = create((set) => ({
  token: localStorage.getItem(TOKEN_KEY) || '',
  isAuthed: () => Boolean(localStorage.getItem(TOKEN_KEY)),
  login: async ({ username, password }) => {
    if (!username || !password) {
      throw new Error('请输入账号和密码')
    }
    const token = `${username}-${Date.now()}`
    localStorage.setItem(TOKEN_KEY, token)
    set({ token })
    return token
  },
  logout: () => {
    localStorage.removeItem(TOKEN_KEY)
    set({ token: '' })
  },
}))

