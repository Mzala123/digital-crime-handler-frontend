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
                      All Crimes
                    <p class="text-l font-weight-bold  mb-2" style="font-size:30px">
                      {{count_crimes}}
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
                    > 
                    {{icons.mdiFolderAccountOutline}}
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
    mdiAccountCowboyHat,
    mdiAccountBoxMultipleOutline,
    mdiAccountGroup,
    mdiFolderAccountOutline,
    mdiNaturePeople,


} from '@mdi/js'


export default {
    data(){
        return{
                 count_crimes:'',
                 icons:{
                    mdiMagnify,
                    mdiAccountCowboyHat,
                    mdiAccountBoxMultipleOutline,
                    mdiAccountGroup,
                    mdiFolderAccountOutline,
                    mdiNaturePeople
                 },
             
        }
    },
    methods: {
           get_count_all_crimes(){
               axios
                 .get(`${config.Base_URL}api/count_all_registered_crimes`)
                 .then((response)=>{
                     if(response.status === 200){
                         this.count_crimes = response.data.countCrimes
                         console.log(this.count_crimes)
                     }
                 })
           }
    },

    mounted(){
        this.get_count_all_crimes()
    }
}
</script>
