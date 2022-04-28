<template>
     
     <v-container>
         <v-card
         flat
         >
              
        <v-row justify="center">
         <div class="col-md-11 auth-card">

             <v-overlay absolute opacity="0" :value="overlay">
                                <v-progress-circular
                                indeterminate
                                size="60"
                            ></v-progress-circular>
            </v-overlay>

            <v-row>
                <v-col class="col-xs-12">
                   <v-row>
                        <v-col class="col-xs-12 col-sm-12">
                
                 <router-link v-bind:to="'/concluded_case_details/'+suspect._id">
                <v-btn
                style="color:black;"
                x-small
                class="ml-2 mb-4 elevation-1"
                 >
                <v-icon
                  dark
                  left
                > 
                    {{ icons.mdiArrowLeft }}  
                </v-icon>
                back
              </v-btn>
               </router-link>
                            
                            <v-card
                            class="mx-auto ml-2 mr-2"
                            >
                             <h3 style="color:" class="pl-2"> {{suspect.firstname}}  {{suspect.lastname}}</h3>
                              <v-system-bar
                                        dark
                                        color="secondary"
                                        style="color: white; font-weight:bold"
                                >
                                  Crime Category - {{ suspect.crimes.category }} 
                                </v-system-bar>
                                 <v-card-text class="mt-3 black--text">
                                <div> Counts - {{ suspect.crimes.counts }} </div>
                                <div> Date crime committed - {{ suspect.crimes.offenseDate}} </div>  
                                <div> Date crime recorded - {{ suspect.crimes.chargeFiled}} </div>
                                <div> Offense Description - {{ suspect.crimes.offenseDescription }} </div>
                                <div> Case status - {{ suspect.crimes.status}} </div>  
                                <div> Status Description - {{ suspect.crimes.statusDescription}} </div>
                                </v-card-text>
                                <v-card-text>
                                Recorded By Officer - {{ suspect.crimes.registeringOfficer}}
                                </v-card-text>

                            </v-card>

                            <v-card
                            class="mx-auto ml-2 mr-2 mt-3"
                            >
                               <v-system-bar
                                        dark
                                        color="secondary"
                                        style="color: white; font-weight:bold"
                                >
                                 <v-icon
                                    dark
                                    right
                                    style="color:white"
                                    small
                                    > 
                                        {{ icons.mdiEmail }}  
                                    </v-icon>
                                  Notifications
                                </v-system-bar>

                                <v-timeline
                                    dense
                                >
                                 <v-timeline-item
                                    v-for="item in suspect.crimeDocs"
                                    :key="item._id"
                                    >
                                     <span slot="opposite">Tus eu perfecto</span>
                                     <v-card class="mr-2 elevation-1">
                                     <v-card-title class="text-h7">
                                        {{ item.subject }}
                                    </v-card-title>
                                   
                                    <v-card-text>
                                      <div> From: {{ item.from }} </div>
                                      <div> To: {{ item.to }} </div>
                                      <div> Message: {{ item.text }} </div>
                                    </v-card-text>
                                     </v-card>

                                 </v-timeline-item>

                                </v-timeline>
                              
                            </v-card>

                        </v-col>

                   </v-row>
                
                </v-col>
                 
            </v-row>

        </div>
        </v-row>
         </v-card>
     </v-container>

</template>

<script>

import axios from 'axios'
import config  from "@/config"
import {
    mdiMagnify,
    mdiDeleteOutline,
    mdiPencilOutline,
    mdiEye,
    mdiPlusCircleOutline,
    mdiListStatus,
    mdiEmail,
    mdiArrowLeft
} from '@mdi/js'

export default {
    data(){
        return{

            icons: {
                        mdiMagnify,
                        mdiDeleteOutline,
                        mdiPencilOutline,
                        mdiPlusCircleOutline,
                        mdiEye,
                        mdiListStatus,
                        mdiEmail,
                        mdiArrowLeft
                        
               },
             overlay: false,
             suspect: {
                        _id:null,
                        nationalId: null,
                        firstname:null,
                        lastname:null,
                        age:null,
                        gender:null,
                        dob:null,
                        middlename:null,
                        city_origin:null,
                        race:null,
                        height:null,
                        weight:null,
                        eye_color:null,
                        hair_color:null,
                        current_city:null,
                        address:null,
                        skin_tone:null,
                        known_aliases:null,
                        profile_photo:'null_profile.png'
                      },
        }
    },
    methods: {
         get_crime_details(id, crimeId){
                   this.overlay = true
                        axios
                        .get(`${config.Base_URL}api/read_nofification_email_details/`+id+"/crimes/"+crimeId)
                        .then((response)=>{
                            this.suspect = response.data
                            this.overlay = false
                            console.log(this.suspect)
                 })  
         }
    },
    mounted(){
        this.get_crime_details(this.$route.params.id, this.$route.params.crimeId)
    }
}
</script>

