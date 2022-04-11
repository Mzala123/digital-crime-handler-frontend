<template>
    <v-card class="greeting-card">
          <v-row class="ma-0 pa-0">
               <v-col cols="8">
        <v-card-title class="text-no-wrap d-flex align-center mt-2 pb-2 ps-2 ">
          All System Users
        </v-card-title>
        <v-card-text class="d-flex align-center mt-2 pb-2 ps-2">
          <div>
                   <v-icon
          x-large
         
          height="108"
          max-width="83"
        > {{icons.mdiAccountGroupOutline}}</v-icon>
            <p class="text-xl font-weight-semibold  mb-2">
                
              {{ count_users }} users in total
            </p>
          
          </div>
        </v-card-text>
      </v-col>
      
      <v-col cols="4">
        

      </v-col>

          </v-row>
    </v-card>
</template>

<script>
import config from '@/config'
import axios from 'axios'
import {
    mdiMagnify,
    mdiDeleteOutline,
    mdiPencilOutline,
    mdiEye,
    mdiPlusCircleOutline,
    mdiListStatus,
    mdiAccountGroupOutline,
    mdiAccountCowboyHat
} from '@mdi/js'

export default {
    data(){
        return{
              count_users: "",
                  icons: {
               mdiMagnify,
               mdiDeleteOutline,
               mdiPencilOutline,
               mdiPlusCircleOutline,
               mdiEye,
               mdiListStatus,
               mdiAccountGroupOutline,
               mdiAccountCowboyHat
               
               },
        }
    },
    methods: {
           get_count_of_all_system_users(){
               axios
                 .get(`${config.Base_URL}api/read_count_all_users_in_system`)
                 .then((response)=>{
                     if(response.status === 200){
                         this.count_users = response.data
                         console.log(this.count_users)
                     }
                 })
           }
    },
    mounted(){
             this.get_count_of_all_system_users()
    }
}
</script>