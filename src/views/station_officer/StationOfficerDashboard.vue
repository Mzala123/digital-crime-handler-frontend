<template>
    
    <v-row>

         <v-col
            cols="12"
            md="4"
        >
         <all-crimes/>
      </v-col>
 
        <v-col
            cols="12"
            md="4"
        >
         <concluded-case-dashboard/>
      </v-col>
      <v-col
            cols="12"
            md="4"
        >
        <ongoing-case-dashboard/> 
      </v-col>
      <v-col cols="12" md="6">
           <group-cases-graph/> 
      </v-col>


    </v-row>

</template>

<script>
import ConcludedCaseDashboard from '@/views/station_officer/StationDashComponents/ConcludedCaseDashboard.vue'
import OngoingCaseDashboard from '@/views/station_officer/StationDashComponents/OngoingCaseDashboard.vue'
import GroupCasesGraph from '@/views/station_officer/StationDashComponents/GroupCasesGraph.vue'
import AllCrimes from  '@/views/police_officer/PoliceDashComponents/AllCrimes.vue'

export default {
    components:{
      ConcludedCaseDashboard,
      OngoingCaseDashboard,
      GroupCasesGraph,
      AllCrimes
    },
    data(){
        return{

        }
    }
}
</script>

