<template>

       <v-container>
        <v-row justify="center">
        <div class="col-md-10 auth-card">
           <h2 class="mt-4"> SUSPECT PROFILE DETAILS </h2> 
             <p> <v-divider> </v-divider> </p>
            <v-row>
               <v-col class="col-xs-12">
                <v-row>
                     <v-col class="col-xs-12 col-sm-6">
                           <v-card flat >
                                <v-system-bar
                                        dark
                                        color="secondary"
                                    >
                                  Suspect Profile
                                </v-system-bar>
                    
                                <div class="mr-1 ml-1 mt-1 my-1">
                                    <v-avatar
                                        rounded
                                        height="300"
                                        width="100%"
                                        >
                                    <v-img :src="PhotoPath+suspect.profile_photo"></v-img> 
                                    </v-avatar> 
                                </div>
                           </v-card>
                       </v-col>

                     <v-col class="col-xs-12 col-sm-6">
                       <div>
                         <h3 class="mb-1"> {{suspect.firstname}} {{suspect.lastname}} </h3> 
                         <v-card flat class="mx-auto">
                              <v-system-bar
                                        dark
                                        color="secondary"
                                    >
                                  National Id - {{ suspect.nationalId }} 
                                </v-system-bar>
                                <v-card-text class="mt-3 black--text">
                                
                                    <div> Gender - {{ suspect.gender}} </div>
                                    <div> Age - {{ suspect.age}} </div>
                                    <div> Date of birth - {{ suspect.dob}} </div>
                                    <div> Known ALiases - {{ suspect.known_aliases}} </div>
                                    <div> City of Origin - {{suspect.city_origin }}</div>
                                    <div> Current City - {{suspect.current_city }}</div>
                                    <div> Race - {{suspect.race }}</div>
                                    <div> Home Address - {{suspect.address }}</div>
                                </v-card-text>
                         </v-card>
                        </div>

                     </v-col>
                      
                         <v-col class="col-xl-12">
                              <v-card flat>
                              <v-system-bar
                                        dark
                                        color="secondary"
                                    >
                                 Physical Appearance Description
                                </v-system-bar>

                                 <v-chip-group
                                    
                                    class="deep-purple accent-4 black--text ml-4"
                                    column
                                    >
                                       <v-chip>Height - {{ suspect.height}}</v-chip>
                                       <v-chip>Weight - {{ suspect.weight}}</v-chip>
                                       <v-chip>Eye Color - {{ suspect.weight}}</v-chip>
                                 </v-chip-group>

                                <v-chip-group
                                    
                                    class="deep-purple accent-4 black--text ml-4"
                                    column
                                    >
                                       <v-chip>Hair color - {{ suspect.hair_color}}</v-chip>
                                       <v-chip>Skin tone - {{ suspect.skin_tone}}</v-chip>
                                     
                                 </v-chip-group>

                            </v-card>
                         </v-col>
                 </v-row> 
                </v-col>
            </v-row>

            <v-overlay absolute opacity="0" :value="overlay">
                                <v-progress-circular
                                indeterminate
                                size="64"
                            ></v-progress-circular>
            </v-overlay>

         </div>
       </v-row>
  </v-container>
</template>

<script>
import axios from "axios"
import config from '@/config'
export default {
    data(){
        return{
  
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
                     PhotoPath:`${config.Base_URL}images/`,


        }
    },
    methods: {
            get_list_of_suspects_by_Id(id){
                       this.overlay = true
                        axios
                        .get(`${config.Base_URL}api/read_one_person_suspect/`+id)
                        .then((response)=>{
                            this.suspect = response.data
                            this.overlay = false
                            console.log(this.suspect)
                        })  
                },

    },
    
    mounted() {
      this.get_list_of_suspects_by_Id(this.$route.params.id)
    }
}
</script>

<style lang="scss">
   .v-card v-card-text{
         font-size: 40px;
   }
</style>