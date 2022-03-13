import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '@/views/admin/Login.vue'
import UserList  from "@/views/admin/UserList.vue"
import CreateUser from '@/views/admin/CreateUser.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'dashboard',
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard/Dashboard.vue'),
  },
  {
    path: '/typography',
    name: 'typography',
    component: () => import('@/views/typography/Typography.vue'),
  },
  {
    path: '/icons',
    name: 'icons',
    component: () => import('@/views/icons/Icons.vue'),
  },
  {
    path: '/cards',
    name: 'cards',
    component: () => import('@/views/cards/Card.vue'),
  },
  {
    path: '/simple-table',
    name: 'simple-table',
    component: () => import('@/views/simple-table/SimpleTable.vue'),
  },
  {
    path: '/form-layouts',
    name: 'form-layouts',
    component: () => import('@/views/form-layouts/FormLayouts.vue'),
  },
  {
    path: '/pages/account-settings',
    name: 'pages-account-settings',
    component: () => import('@/views/pages/account-settings/AccountSettings.vue'),
  }, 
  
  {
    path: '/authentication/login',
    name: 'login',
    component: LoginView,
    meta: {
      layout: 'blank',
    },
  },
  {
    path:'/authentication/userList',
    name:'user-list',
    component: UserList
  },
  {
    path:'/authentication/createAccount',
    name:'create-account',
    component: CreateUser
  },
  {
    path: '/authentication/profile',
    name: 'profile',
    component: () => import('@/views/admin/Profile.vue'),
  },

  {
    path: '/error-404',
    name: 'error-404',
    component: () => import('@/views/Error.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '*',
    redirect: 'error-404',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
