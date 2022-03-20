<template>
 <div>
    <v-card flat
    elevation="1"
    class="pa-3 mt-2">
    <v-card-text>
     LIST OF SUSPECTS
    </v-card-text>
    <v-card-text>
      <v-row>
        <v-col
          cols="6"
          md="4"
          mt="4"
        >
          <v-text-field
            v-model="search"
            :append-icon="icons.mdiMagnify"
            label="Find Suspect"
         
            hide-details
            dense
            outlined
          ></v-text-field>  
        </v-col>

        <v-col
          cols="6"
          md="4"
        >
        </v-col>

      </v-row>
    </v-card-text>

    <!-- Table -->
    <v-data-table
      :headers="headers"
      :items="suspectList"
      :search="search"
      :items-per-page="5"
      class="table-kitchen-sink"
      :loading ="loading"
      loading-text="Loading... Please wait"
    >
      <!-- users list -->
      <template #[`item.actions`]="{ item }">

        <v-icon
          small
          class="me-2"
          color="blue"
          @click="AddCrime(item._id)"
        >
          {{ icons.mdiPlusCircleOutline }}
        </v-icon>
        <router-link v-bind:to="'/view_suspect_details/'+item._id">
        <v-icon
           small
          class="me-2"
          color="blue"
          @click="viewMore(item._id)"
        >
          {{ icons.mdiEye }}
        </v-icon>
        </router-link>

         <router-link v-bind:to="'/edit_suspect/'+item._id">
        <v-icon
             small
          class="me-2"
        >
          
          {{ icons.mdiPencilOutline }}
        </v-icon>
         </router-link>

        <v-icon
            small
          @click="delete_suspect(item._id)"
        >
          {{ icons.mdiDeleteOutline }}
        </v-icon>
      </template> 
    </v-data-table>
    </v-card>
 </div>



</template>

<script>

import axios from 'axios'
import {
    mdiMagnify,
    mdiDeleteOutline,
    mdiPencilOutline,
    mdiEye,
    mdiPlusCircleOutline
} from '@mdi/js'


export default {
    data(){
        return{
         suspectList : [],
         search:"",
         loading: false,
         headers: [
            {text:"National Id", value:"nationalId"},
            {text:"Firstname", value:"firstname"},
            {text:"Lastname", value:"lastname"},
            {text:"Age", value:"age"},
            {text:"Gender", value:"gender"},
            {text:"ACTION", value:"actions"}
           ],

         icons: {
               mdiMagnify,
               mdiDeleteOutline,
               mdiPencilOutline,
               mdiPlusCircleOutline,
               mdiEye
           },

           suspectId : ""

        }
    },
    methods: {
         list_of_suspects(){
            this.loading = true
            axios
              .get("http://localhost:3000/api/get_list_of_person_suspects")
              .then((response)=>{
                  this.suspectList = response.data
                  this.loading = false
                  console.log(response.data)
              })  
         },

         delete_suspect(suspectId){
             this.suspectId = suspectId
             console.log("The id is ",this.suspectId)
            this.$swal({
              title: "Are you sure?",
              text: "Once deleted, you will no longer have such suspect details!",
              icon: "warning",
              buttons: true,
              dangerMode: true,
            }).then((result)=>{
              if(result.isConfirmed){
                  axios.delete("http://localhost:3000/api/delete_person_suspect/"+this.suspectId)
                  .then((response)=>{
                    if(response.status === 204){
                        this.$swal("Message", "Suspect details removed", "success").then(() => {
                         this.list_of_suspects()
                       })
                    }
                  })
              }
            })           
         },
    
         add_crime_to_suspect(){

         }

    },

    mounted(){
       this.list_of_suspects();
    }
}
</script>

<style lang="scss">

</style>