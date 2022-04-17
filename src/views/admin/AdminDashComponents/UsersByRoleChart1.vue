<template>
    <v-card>

          <v-row class="ma-0 pa-0">
        <v-col cols="6"
          >
          <div id="chart">
              <apexchart 
              type="pie" width="400" 
              :options="chartOptions" 
              :series="series"></apexchart> 
          </div>     
        </v-col>
       
        <v-col cols="6">

        </v-col>
        
        </v-row>
    </v-card>
</template>

<script>

import config from '@/config'
import axios from 'axios'
import apexchart from 'vue-apexcharts'
import VueApexCharts from 'vue-apexcharts'

export default {
    components:{
    apexchart: VueApexCharts
   },
    data(){
        return{
          
          userList:"",
          count: 0,
          series: [],
          chartOptions: {
            chart: {
              width: 380,
              height: 400,
              type: 'pie',
            },
            labels: [],
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: 'bottom'
                }
              }
            }],
            }

        }
    },
      methods: {
      user_count_list_based_on_role(){
           axios
             .get(`${config.Base_URL}api/read_users_count_by_userrole`)
             .then((response)=>{
                 if(response.status === 200){
                     this.userList = response.data
                     console.log(this.userList)
                     for(this.count=0; this.count<this.userList.length; this.count++){
                           console.log(this.userList[this.count].userroleCount)
                           this.chartOptions.labels.push(this.userList[this.count]._id)
                           this.series.push(this.userList[this.count].userroleCount)
                           
                     }
                 }
             })
      },
    
      },
      mounted(){
          this.user_count_list_based_on_role()
      }
}
</script>