<template>

    <v-card class="greeting-card">
      <v-system-bar
                dark
                color="primary"
                style="color: white; font-weight:bold; height:10px"
        >
        </v-system-bar>

          <v-row class="ma-0 pa-0" justify="center">
               
                <v-col cols="8">
                  
                <v-card-text class="d-flex align-center mt-2 pb-2 ps-2">
                  <div>
                      System Users
                    <p class="text-l font-weight-semibold  mb-2">
                      {{ count_users }} 
                    </p>
                  </div>
                </v-card-text>
              </v-col>

              <v-col cols="4">

                    <v-card-text class="d-flex align-center mt-2 pb-2 ps-2">
                        <v-icon
                        color="#66CCFF"
                        x-large
                        style="height:100; width:100;"
                    > {{icons.mdiAccountBoxMultipleOutline}}
                    </v-icon>
                    </v-card-text>
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
    mdiAccountCowboyHat,
    mdiAccountBoxMultipleOutline,
    mdiAccountGroup
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
               mdiAccountCowboyHat,
               mdiAccountBoxMultipleOutline,
               mdiAccountGroup
               
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