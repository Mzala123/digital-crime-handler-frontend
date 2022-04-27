<template>
     
     <v-row>
         
         <v-col
           cols="12"
           md="6"
          >
          <all-suspects> </all-suspects>
         </v-col>

         <v-col 
         cols="12"
         md="6">

          <all-crimes> </all-crimes>
         
         </v-col>

          <v-col cols="12" md="5">
            <suspects-by-gender> </suspects-by-gender>
          </v-col>

          <v-col cols="12" md="7">
             <crimes-by-category> </crimes-by-category>
          </v-col>

         
     </v-row>

</template>

<script>

import AllSuspects from '@/views/police_officer/PoliceDashComponents/AllSuspects.vue'
import SuspectsByGender from '@/views/police_officer/PoliceDashComponents/SuspectsByGender.vue'
import AllCrimes from '@/views/police_officer/PoliceDashComponents/AllCrimes.vue'
import CrimesByCategory from '@/views/police_officer/PoliceDashComponents/CrimesByCategory.vue'


export default {
    components: {
        AllSuspects,
        SuspectsByGender,
        AllCrimes,
        CrimesByCategory
    },
    data(){
      return {

      }
    }
}
</script>