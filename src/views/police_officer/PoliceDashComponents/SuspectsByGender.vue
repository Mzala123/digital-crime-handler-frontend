<template>
  <v-card>

        <v-row class="ma-0 pa-0">
        <v-col cols="8"
          >
            
       <div id="chart">
           <p> Suspects by Gender</p>
           <apexchart 
              type="pie" width="350" 
              :options="chartOptions" 
              :series="series"></apexchart> 

       </div> 

        </v-col>
        
        </v-row>

    </v-card>
</template>

<script>
import axios from 'axios'
import config from '@/config'
import apexchart from 'vue-apexcharts'
import VueApexCharts from 'vue-apexcharts'
import data from '@/views/dashboard/datatable-data'

export default {
   components:{
    apexchart: VueApexCharts
   }, 

    data(){
        return{
           suspects: "",
           count: 0,
             series: [],
         
         chartOptions: {
            chart: {
              width: 350,
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
         get_count_suspects_by_gender(){
             axios
               .get(`${config.Base_URL}api/read_count_suspects_by_gender`)
               .then((response)=>{
                   if(response.status === 200){
                       this.suspects = response.data
                       console.log(this.suspects)
                       for(this.count=0; this.count<this.suspects.length; this.count++){
                          this.chartOptions.labels.push(this.suspects[this.count]._id)
                           //this.chartOptions.labels.push(this.userList[this.count]._id)
                          this.series.push(this.suspects[this.count].countByGender)
                       } 
                   }
               })
         }
  },

  mounted(){
           this.get_count_suspects_by_gender()
  }


}

</script>