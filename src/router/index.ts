import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import UserProfile from '../views/User/UserProfile.vue';

import TokenService from '@/services/token.service';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/user',
    redirect: '/user/overview',
    name: 'UserProfile',
    component: UserProfile,
    meta: {
      header: 'user',
      requiresAuth: true
    },
    children: [
      {
        path: 'overview',
        name: 'UserOverview',
        meta: {
          header: 'user'
        },
        component: () => import('../views/User/Overview.vue')
      },
      {
        path: 'settings',
        name: 'UserSettings',
        meta: {
          header: 'user'
        },
        component: () => import('../views/User/Settings.vue')
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // Check if route (or any children routes) requires authentication
  if (to.matched.some(record => record.meta.requiresAuth)) {

    if (TokenService.getLocalAccessToken() !== null) {
      const user = TokenService.getUser();

      if (user !== null) {

        // Check if route (or any children routes) is restricted by role
        if (to.matched.some(record => record.meta.requiresAdmin)) {
          if (user.admin === false) {
            return next({
              name: 'UserProfile'
            });
          } else {
            return next()
          }
        } else {
          return next();
        }
      }
    }
  } else {
    return next();
  }

  next({
    path: '/login',
    query: { redirect: to.fullPath }
  });
});

export default router
