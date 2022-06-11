<template>
    <v-row>
    <v-col
     cols="12"
     md="4"
    >
      <all-users-comp> </all-users-comp>
    </v-col>

    <v-col
    cols="12"
    md="8"
    >
      <users-by-role-comp> </users-by-role-comp>
    </v-col>

    <v-col cols="12" md="6">
     <users-by-role-linear> </users-by-role-linear>
    </v-col>

    <v-col cols="12" md="6">
     <!-- <users-by-role-chart-1> </users-by-role-chart-1> -->
    </v-col>

    </v-row>
</template>

<script>

import allUsersComp from '@/views/admin/AdminDashComponents/AllUsersComp.vue'
import usersByRoleComp  from '@/views/admin/AdminDashComponents/UsersByRoleComp.vue'
import usersByRoleChart1  from '@/views/admin/AdminDashComponents/UsersByRoleChart1.vue'
import usersByRoleLinear from '@/views/admin/AdminDashComponents/UsersByRoleLinear.vue'

export default {
    components:{
          allUsersComp,
          usersByRoleComp,
          usersByRoleChart1,
          usersByRoleLinear
    },

    data(){
        return {
            
        }
    }
}
</script>