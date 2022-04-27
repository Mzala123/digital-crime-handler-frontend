<template>
     <v-card>
      <v-row class="ma-0 pa-0">
        <v-col cols="8">
            
            <div id="chart">

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
    data(){
        return{
             crimes:""
        }
    },
    methods: {
        get_crimes_count_by_category(){
            axios
            .get(`${config.Base_URL}api/read_count_crime_by_category`)
            .then((response)=>{
                if(response.status === 200){
                    this.crimes = response.data
                    console.log(this.crimes)
                }
            })
        }
    },

    mounted(){
            this.get_crimes_count_by_category()
    }
}
</script>

