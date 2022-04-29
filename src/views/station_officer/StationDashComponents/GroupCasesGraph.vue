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

          casesList:[],
          count: 0,
          series: [],
           chartOptions: {
            chart: {
              type: 'bar',
              height: 300
            },
          
            dataLabels: {
              enabled: false
            },
          },


        }
    },
    methods:{
           bar_chart_cases_count_list_based_on_role(){
           axios
             .get(`${config.Base_URL}api/group_cases_by_status`)
             .then((response)=>{
                 if(response.status === 200){
                     this.casesList = [...response.data]
                     console.log(this.casesList)
                     this.casesList = [...response.data]
                      let _data = [];
                       this.casesList.forEach(casesList=>{
                         _data.push({
                           y: casesList.CountByStatus,
                           x: casesList._id
                         })
                       })
                       this.series = [
                         {
                           name:'count',
                           data: _data
                         }
                       ]
                 } 
             })
      },
    },

    mounted(){
        this.bar_chart_cases_count_list_based_on_role()
    }

}
</script>