import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login.vue'
import Home from '@/views/home.vue'
import User from '@/views/users.vue'
import Address from '@/views/viplist.vue'
import Register from '@/views/register.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  {
    path: '/home',
    component: Home,
    meta: { requiredAuth: true },
    children: [
      { path: '', redirect: '/home/user' },
      {
        path: 'user',
        component: User,
        meta: { requiredAuth: true }
      },
      {
        path: 'address',
        component: Address,
        meta: { requiredAuth: true }
      }
    ]
  }
]

const router = new VueRouter({
  linkActiveClass: 'active_link',
  routes
})

router.beforeEach((to, from, next) => {
  const user = sessionStorage.getItem('user')
  if (user) {
    if (to.path === '/login') next('/home')
  } else {
    if (to.meta.requiredAuth) next('/login')
  }
  next()
})
export default router
