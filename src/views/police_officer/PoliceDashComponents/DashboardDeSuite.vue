<template>
     
     <v-row>
         
         <v-col
           cols="12"
           md="4"
          >
          <all-suspects> </all-suspects>
         </v-col>

         <v-col 
         cols="12"
         md="8">
         <suspects-by-gender> </suspects-by-gender>
         </v-col>

     </v-row>

</template>

<script>

import AllSuspects from '@/views/police_officer/PoliceDashComponents/AllSuspects.vue'
import SuspectsByGender from '@/views/police_officer/PoliceDashComponents/SuspectsByGender.vue'

export default {
    components: {
        AllSuspects,
        SuspectsByGender
    },
    data(){
      return {

      }
    }
}
</script>