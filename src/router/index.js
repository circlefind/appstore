import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function ({ store }/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })
  Router.beforeEach((to, from, next) => {
    const { auth, authorize } = to.meta

    if (auth && !store.getters['auth/loggedIn']) {
      next({ name: 'login' })
    } else if (auth && !authorize.includes(store.state.auth.user.idroleuser)) {
      next({ name: 'login' })
    } else {
      next()
    }
  })

  return Router
}
