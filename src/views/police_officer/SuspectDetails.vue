<template>

       <v-container>
        <v-row justify="center">
        <div class=col-md-10>
           <h2 class="mt-4"> SUSPECT PROFILE DETAILS </h2> 
             <p> <v-divider> </v-divider> </p>
            <v-row>
               <v-col class="col-xs-12">
                <v-row>
                     <v-col class="col-xs-12 col-sm-6">
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

                     <v-col class="col-xs-12 col-sm-6">
                       <div>
                         <h3 class="mb-1"> {{suspect.firstname}} {{suspect.lastname}} </h3> 
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

                       <!-- <div>
                       <v-card elevation="1" class="mx-auto mt-6">
                              <v-system-bar
                                        dark
                                        color="primary"
                                    >
                                 Physical Appearance Description
                                </v-system-bar>
                                <v-card-text class="mt-3 black--text">
                                    <div> Gender - {{ suspect.gender}}  </div>
                                    <div> Age - {{ suspect.age}} </div>
                                    <div> Date of birth - {{ suspect.dob}} </div>
                                    <div> Known ALiases - {{ suspect.known_aliases}} </div>
                                    <div> Home Address - {{suspect.address }}</div>
                                </v-card-text>
                         </v-card>
                        </div> -->

                     </v-col>
                      
                         <v-col class="col-xl-12">
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
         </div>
       </v-row>
  </v-container>
</template>

<script>
import axios from "axios"
export default {
    data(){
        return{
 
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

                    classes: [
                    ['h1', 'Heading 1', '6rem', '300', '-.015625em', -1],
                    ['h2', 'Heading 2', '3.75rem', '300', '-.0083333333em', 0],
                    ['h3', 'Heading 3', '3rem', '400', 'normal', 1],
                    ['h4', 'Heading 4', '2.125rem', '400', '.0073529412em', 2],
                    ['h5', 'Heading 5', '1.5rem', '400', 'normal', 2],
                    ['h6', 'Heading 6', '1.25rem', '500', '.0125em', 3],
                    ['subtitle-1', 'Subtitle 1', '1rem', '400', '.009375em', 4],
                    ['subtitle-2', 'Subtitle 2', '0.875rem', '500', '.0071428571em', 4],
                    ['body-1', 'Body 1', '1rem', '400', '.03125em', 4],
                    ['body-2', 'Body 2', '0.875rem', '400', '.0178571429em', 4],
                    ['button', 'Button', '0.875rem', '500', '.0892857143em', 4],
                    ['caption', 'Caption', '0.75rem', '400', '.0333333333em', 4],
                    ['overline', 'Overline', '0.75rem', '500', '.1666666667em', 4],
                    ],

        }
    },
    methods: {
            get_list_of_suspects_by_Id(id){
                        axios
                        .get("http://localhost:3000/api/read_one_person_suspect/"+id)
                        .then((response)=>{
                            this.suspect = response.data
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