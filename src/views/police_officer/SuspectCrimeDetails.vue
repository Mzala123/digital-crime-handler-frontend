<template>
       <v-container>
        <v-row justify="center">
        <div class="col-md-10 auth-card">
           <h2 class="mt-4"> SUSPECT AND ALLEGED CRIME DETAILS </h2> 
             <p> <v-divider> </v-divider> </p>
            <v-row>
               <v-col class="col-xs-12">
                <v-row>
                     <v-col class="col-xs-12 col-sm-7">
                       <div>
                         <h3 class="mb-1 ml-1"> {{suspect.firstname}} {{suspect.lastname}} </h3> 
                         <v-card flat class="mx-auto">
                              <v-system-bar
                                        dark
                                        color="primary"
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

                    <div class="mt-2">
                     <v-card flat>
                              <v-system-bar
                                        dark
                                        color="primary"
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
                                        <v-chip>Hair color - {{ suspect.hair_color}}</v-chip>
                                 </v-chip-group>

                                <v-chip-group
                                    
                                    class="deep-purple accent-4 black--text ml-4"
                                    column
                                    >
                                      
                                       <v-chip>Skin tone - {{ suspect.skin_tone}}</v-chip>
                                     
                                 </v-chip-group>

                            </v-card>
                        </div> 

                     </v-col>

            <v-col class="col-xs-12 col-sm-5">
                           <v-card flat >
                                <v-system-bar
                                        dark
                                        color="primary"
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
                      
                         <v-col class="col-xl-12">
                             <h3 class="ml-1"> Associated Alleged Crimes</h3>
                             <div v-for="item in suspect.crimes " :key="item._id">
                              <v-card flat class="mb-2">
                              <v-system-bar
                                        dark
                                        color="#26c6da"
                                    >
                                  {{item.category}} | Recorded By Officer {{ item.registeringOfficer}}
                                </v-system-bar>
                               
                                 <v-chip-group
                                    
                                    class="deep-purple accent-4 black--text ml-4"
                                    column
                                    >
                                       <v-chip>Counts - {{ item.counts }}</v-chip>
                                       <v-chip>Date offense commited - {{ item.offenseDate}}</v-chip>
                                       <v-chip>Date offense record - {{ item.chargeFiled}}</v-chip>
                                 </v-chip-group>
                                <v-card-text class="mt-3 black--text">
                                <div>
                                    Offense Description - {{ item.offenseDescription }}
                                </div>
                                 </v-card-text>

                            </v-card>
                             </div>
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
                    PhotoPath:"http://localhost:3000/images/",


        }
    },
    methods: {
            get_list_of_suspects_by_Id(id){
                       this.overlay = true
                        axios
                        .get("http://localhost:3000/api/read_one_person_suspect/"+id)
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