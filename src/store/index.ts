import { defineStore } from 'pinia'

// You can name the return value of `defineStore()` anything you want, 
// but it's best to use the name of the store and surround it with `use` 
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const appRouteStore = defineStore('appRoute', {
  state: () => ({ appPath: '', appRoutes: {} }),
  getters: {
    getCurrentApp: (state) => state.appRoutes
  },
  actions: {
    setCurrentApp(appInfo: any) {
      this.appPath = appInfo.path
      this.appRoutes = appInfo.children
      localStorage.appPath = appInfo.path
    },
  },
})