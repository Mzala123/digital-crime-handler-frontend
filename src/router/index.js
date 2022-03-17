import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '@/views/admin/Login.vue'
import UserList  from "@/views/admin/UserList.vue"
import CreateUser from '@/views/admin/CreateUser.vue'

Vue.use(VueRouter)

const routes = [
 {
    path: '/',
    redirect: 'login',
  }, 
 /* {
    path: '/',
    name: 'login',
    component: LoginView,
    meta: {
      layout: 'blank',
    },
  },*/
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard/Dashboard.vue'),
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
    path: '/authentication/settings',
    name: 'settings',
    component: () => import('@/views/admin/account_settings/AccountSettings.vue'),
  },
  {
    path: '/police_dashboard',
    name: 'police-dashboard',
    component: () => import('@/views/police_officer/police_dashboard.vue'),
  },

  {
    path: '/add_suspect',
    name: 'add-suspect',
    component: () => import('@/views/police_officer/add_suspect.vue'),
  },

  {
    path: '/list_suspects',
    name: 'suspect-list',
    component: () => import('@/views/police_officer/list_suspects.vue'),
  },

  {
    path: '/criminal_suspects',
    name: 'criminal-list',
    component: () => import('@/views/police_officer/criminal_lists.vue'),
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
