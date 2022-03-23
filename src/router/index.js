import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '@/views/admin/Login.vue'
import UserList  from "@/views/admin/UserList.vue"
import CreateUser from '@/views/admin/CreateUser.vue'

Vue.use(VueRouter)

const routes = [
  /*{
    path: '/',
    redirect: 'login',
  }, */
  {
    path: '/',
    name: 'login',
    component: LoginView,
    meta: {
      layout: 'blank',
    },
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
    component: () => import('@/views/police_officer/PoliceDashboard.vue'),
  },

  {
    path: '/add_suspect',
    name: 'add-suspect',
    component: () => import('@/views/police_officer/AddSuspect.vue'),
  },

  {
    path: '/edit_suspect/:id',
    name: 'edit-suspect-details',
    component: () => import('@/views/police_officer/EditSuspectDetails.vue')
  },

  {
    path: '/list_suspects',
    name: 'suspect-list',
    component: () => import('@/views/police_officer/ListSuspects.vue'),
  },

  {
    path: '/view_suspect_details/:id',
    name: 'suspect-details',
    component: () => import('@/views/police_officer/SuspectDetails.vue'),
  },

  {
    path: '/criminal_suspects',
    name: 'criminal-list',
    component: () => import('@/views/police_officer/CriminalLists.vue'),
  },
  {
    path: '/add_crime/:id',
    name: 'add-crime',
    component: () => import('@/views/police_officer/AddCrime.vue'),
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
