<template>
      <v-container>
    <v-card
    flat
    class="pa-3 mt-2"
    >
        <v-row justify="center">
        <div class=col-md-10>
           <h3 class="mt-2"> List of Concluded Cases</h3> 
             <p> <v-divider> </v-divider> </p>
             <v-row>
               <v-col class="col-xs-12">
                    <v-row>
                      <v-col class="col-xs-12 col-sm-8">
                         <v-text-field
                            class="mr-8"
                            v-model="search"
                            :append-icon="icons.mdiMagnify"
                            label="Find Suspect"
                            hide-details
                            dense
                            outlined
                        ></v-text-field>  
                     </v-col>
                       
                    </v-row>
                     <v-card class="auth-card mt-4" elevation="1">

                         <v-list three-line>
                            <template v-for="(item, index) in suspectList">
                
                             <v-divider
                                :key="index"
                                :inset="item.inset"
                            ></v-divider>
                            <v-list-item
                                :key="item.title"
                            >

                                <v-list-item-avatar>
                                <v-img :src="PhotoPath+item.profile_photo"></v-img>
                                </v-list-item-avatar>
                                <v-list-item-content>

                                <router-link v-bind:to="'/concluded_case_details/'+item._id">
                                <v-list-item-title v-html="item.firstname +' '+ item.lastname">
                                <v-icon
                                small
                                class="me-2"
                                color="blue"
                                @click="viewMore(item._id)"
                                >
                                {{ icons.mdiEye }}
                                </v-icon> 
                                </v-list-item-title>
                               
                                </router-link>

                                <v-list-item-subtitle v-html="item.crimes[0].offenseDescription"></v-list-item-subtitle>
                               
                                </v-list-item-content>

                            </v-list-item>

                            </template>
                        </v-list>

                             <v-overlay absolute opacity="0" :value="overlay">
                                <v-progress-circular
                                indeterminate
                                size="64"
                            ></v-progress-circular>
                           </v-overlay>

                     </v-card>
                     
               </v-col>
             </v-row>
          </div>
       </v-row>
       </v-card>
   </v-container>
    
</template>

<script>
import axios from 'axios'
import config from '@/config'
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
              suspectList :[],

               overlay: false,
               search:"",
               icons: {
               mdiMagnify,
               mdiDeleteOutline,
               mdiPencilOutline,
               mdiPlusCircleOutline,
               mdiEye
           },

                items: [
                { header: 'Suspects' },
                { divider: true, inset: true },
                ],

            PhotoPath:`${config.Base_URL}images/`,

        }
    },
    methods: {
           list_of_suspects(){
            this.overlay = true
            axios
              .get(`${config.Base_URL}api/read_all_concluded_cases`)
              .then((response)=>{
                  this.suspectList = response.data
                  this.overlay = false
                  console.log(response.data)
              })  
         },

    },

    mounted(){
        this.list_of_suspects()
    }
}
</script>

<style lang="sass">

</style>