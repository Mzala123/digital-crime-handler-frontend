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

    </v-row>
</template>

<script>

import allUsersComp from '@/views/admin/AdminDashComponents/AllUsersComp.vue'
import usersByRoleComp  from '@/views/admin/AdminDashComponents/UsersByRoleComp.vue'

export default {
    components:{
          allUsersComp,
          usersByRoleComp
    },

    data(){
        return {
            
        }
    }
}
</script>