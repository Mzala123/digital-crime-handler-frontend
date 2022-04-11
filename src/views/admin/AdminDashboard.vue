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
      
    </v-col>

    </v-row>
</template>

<script>
import allUsersComp from '@/views/admin/AdminDashComponents/AllUsersComp.vue'
export default {
    components:{
          allUsersComp
    },

    data(){
        return {
            
        }
    }
}
</script>