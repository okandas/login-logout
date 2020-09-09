import Vue from 'vue'
import VueRouter from 'vue-router'
import Demo from '@/views/Demo.vue'
import Landing from '@/views/Landing.vue'
import Signin from '@/views/Signin.vue'
import Signup from '@/views/Signup.vue'
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'landing',
    component: Landing,
    meta: {
      public: true
    }
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup,
    meta: {
      public: true
    }
  },
  {
    path: '/signin',
    name: 'signin',
    component: Signin,
    meta: {
      public: true
    }
  },
  {
    path: '/demo',
    name: 'demo',
    component: Demo
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach(function (to, from, next) {
  const isPublic = to.matched.some(record => record.meta.public)
  if (!isPublic) {
    return next({
      name: 'signin',
      query: { redirect: to.fullPath } // Store the full path to redirect the user to after login
    })
  }
  next()
})
export default router
// # sourceMappingURL=index.js.map
