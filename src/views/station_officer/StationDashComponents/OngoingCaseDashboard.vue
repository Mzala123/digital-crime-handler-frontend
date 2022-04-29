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
                      Ongoing Cases
                    <p class="text-l font-weight-bold  mb-2" style="font-size:30px">
                         {{ongoingCases}}
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
                   
                    </v-icon>
                    </v-card-text>
               </v-col>
  
          </v-row>

     </v-card>
    
</template>

<script>

import axios from 'axios'
import config from  '@/config'

export default {
    data(){
        return{
           ongoingCases: 0  
        }
    },

    methods: {
        get_count_ongoing_cases(){
               axios
                 .get(`${config.Base_URL}api/read_count_ongoing_cases`)
                 .then((response)=>{
                     if(response.status){
                         this.ongoingCases = response.data
                         console.log(this.ongoingCases)
                     }
                 })        
        }
    },

    mounted(){
        this.get_count_ongoing_cases()
    }

}
</script>