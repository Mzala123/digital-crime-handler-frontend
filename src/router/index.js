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
    path: '/admin_dashboard',
    name: 'admin-dashboard',
    component: () => import('@/views/admin/AdminDashboard.vue'),
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
    component: () => import('@/views/police_officer/PoliceDashComponents/DashboardDeSuite.vue'),
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
    path: '/suspect_crime_details/:id',
    name: 'suspect-crime-details',
    component: () => import('@/views/police_officer/SuspectCrimeDetails.vue'),
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
    path: '/station_officer_dashboard',
    name: 'station-officer-dashboard',
    component: () => import('@/views/station_officer/StationOfficerDashboard.vue'),
 },

 {
     path: '/list_of_cases',
     name: 'list-cases',
     component: () =>import('@/views/station_officer/cases/ListOfCases.vue')
 },

 {
  path: '/ongoing_case_details/:id',
  name: 'ongoing-case-details',
  component: () => import('@/views/station_officer/cases/OngoingCaseDetails.vue'),
 },

 {
  path: '/concluded_case_details/:id',
  name: 'concluded-case-details',
  component: () => import('@/views/station_officer/cases/ConcludedCaseDetails.vue'),
 },
 
 {
   path: '/crime_details_for_suspect/:id/crimes/:crimeId',
   name: 'crime-details-for-suspect',
   component: () => import('@/views/station_officer/cases/CaseDetailsNotifications.vue'),
 },

 {
  path: '/concuded_case_detail_notification/:id/crimes/:crimeId',
  name: 'concuded-case-detail-notification',
  component: () => import('@/views/station_officer/cases/ConcludedCaseNotifications.vue'),
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
