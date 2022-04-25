<template>
    <v-card>

        <v-row class="ma-0 pa-0">
        <v-col cols="6"
          >
         

         <div id="chart">
            <apexchart type="bar" height="350" width="400" :options="chartOptions" :series="series"></apexchart>
         </div>   
   
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
          series: [
             {
            name:"count",
            data: []
          }
         ],
         
           chartOptions: {
            chart: {
              type: 'bar',
              height: 300
            },
          
            dataLabels: {
              enabled: false
            },
            xaxis: {
              categories: [],
            }
          },
        }
    },
      methods: {
      bar_chart_user_count_list_based_on_role(){
           axios
             .get(`${config.Base_URL}api/read_users_count_by_userrole`)
             .then((response)=>{
                 if(response.status === 200){
                     this.userList = response.data
                     for(this.count=0; this.count<this.userList.length; this.count++){            
                          this.chartOptions.xaxis.categories.push(this.userList[this.count]._id)
                          this.series[0].data.push(this.userList[this.count].userroleCount)
                     }
                 }
             })
      },
     },
    
    mounted(){
          this.bar_chart_user_count_list_based_on_role()
         // this.chartOptions.chart.render()
      }
}
</script>