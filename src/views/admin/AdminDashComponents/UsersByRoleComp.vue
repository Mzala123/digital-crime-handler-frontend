<template>
    <v-card class="greeting-card">

           <v-system-bar
                dark
                color="primary"
                style="color: white; font-weight:bold; height:10px"
        >
        </v-system-bar>

         <v-row class="ma-0 pa-0" >

        <v-col
          v-for="data in userList"
          :key="data._id"
          cols="6"
          md="3"
          class="d-flex align-center mt-2 pb-2 ps-2"
        >
          <v-avatar
            size="44"
            rounded
            class="elevation-1"
          >
            <v-icon
              dark
              color="white"
              size="30"
              v-for="item in icons"
              :key="item.title"
            >
              {{ item.title }} 

            </v-icon>
          </v-avatar>

          <div class="ms-3">
            <p class="text-xs mb-0">
              {{ data._id }}
            </p>
            <h3 class="text-xl font-weight-semibold">
              {{ data.userroleCount }}
            </h3>
          </div>
        </v-col>
         </v-row> 

    </v-card>  

</template>

<script>
import config from '@/config'
import axios from 'axios'


import {
    mdiAccountCowboyHat,
    mdiAccountBoxMultipleOutline,
    mdiAccountGroup,
    mdiAccountCircle,
    mdiAccountBoxOutline
} from '@mdi/js'



export default {
  
    data(){
        return{
           
           userList: "",
           icons : [
            {titles:"one", icon:mdiAccountCowboyHat} ,
            {titles:"two", icon:mdiAccountCircle} ,
            {titles:"three", icon:mdiAccountBoxOutline} 
           ],
         

    }},
    methods: {
      user_count_list_based_on_role(){
           axios
             .get(`${config.Base_URL}api/read_users_count_by_userrole`)
             .then((response)=>{
                 if(response.status === 200){
                     this.userList = response.data
                     console.log(this.userList)
                 }
             })
      },

     
    },
    mounted(){
          this.user_count_list_based_on_role()
    }
}
</script>