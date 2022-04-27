<template>
  <v-card>
    <v-row class="ma-0 pa-0">
      <v-col cols="8">
        <div id="chart">
          <apexchart type="line" width="920" height="300" :options="chartOptions" :series="series"></apexchart>
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
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      crimes: [],
      crimesName: '',
      counter: 0,
      series: [],
      chartOptions: {
        chart: {
          height: 300,
          width: 920,
          type: 'line',
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: true,
        },
        stroke: {
          curve: 'straight',
        },
        title: {
          text: 'Crimes by Category',
          align: 'left',
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'],
            opacity: 0.5,
          },
        },
        // xaxis: {
        //   categories: [

        //   ],
        // },
      },
    }
  },
  methods: {
    get_crimes_count_by_category() {
      axios.get(`${config.Base_URL}api/read_count_crime_by_category`).then(response => {
        if (response.status === 200) {
          this.crimes = [...response.data]

          let _data = [];

          this.crimes.forEach(crime => {
            _data.push({
              y: crime.categoryCount,
              x: crime._id,
            })
          })
          this.series = [
            {
              name: 'count',
              data: _data,
            },
          ]
        }
      })
    },
  },

  mounted() {
    this.get_crimes_count_by_category()
  },
}
</script>

