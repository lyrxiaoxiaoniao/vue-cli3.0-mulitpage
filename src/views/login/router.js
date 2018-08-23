import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import Dash from '@/dash/index.vue'
Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/dash',
      name: 'dash',
      redirect: '/dash/page',
      component: Dash,
      children: [
        {
          path: 'page',
          name: 'page',
          component: () => import(/* webpackChunkName: "about" */ './page/index.vue')
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/components/About.vue')
    },
    {
      path: '/page',
      name: 'page',
      component: () => import(/* webpackChunkName: "about" */ './page/index.vue')
    }
  ]
})
