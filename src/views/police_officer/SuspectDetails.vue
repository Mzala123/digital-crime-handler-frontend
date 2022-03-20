<template>
<v-card>
<v-row justify="center">
 <div class=col-md-10>
    <v-card-title>
        SUSPECT DETAILS
      </v-card-title>
   <v-card class="d-flex align-center" elevation="1">
          <div class="d-flex justify-space-between flex-wrap flex-md-nowrap flex-column flex-md-row">
            <div class="mx-auto mt-2 my-2 ml-2">
             <v-avatar
                    rounded
                    size="120"
                    class="me-6"
                    height="300"
                    width="300"
                >
               <v-img :src="PhotoPath+suspect.profile_photo"></v-img> 
            </v-avatar> 
             <v-card-title class="black--text">
                 {{ suspect.firstname }} {{ suspect.middlename }}  {{ suspect.lastname }} 
              </v-card-title>
            </div>
            <v-divider :vertical="$vuetify.breakpoint.mdAndUp"></v-divider>
            <div>
               
               <v-card-text class="black--text">
                National ID: {{ suspect.nationalId }} 
                </v-card-text>

              <v-card-text class="black--text">
                Suspect name: {{ suspect.firstname }} {{ suspect.middlename }}
              </v-card-text>

            <v-card-text class="black--text">
                Suspect Gender: {{ suspect.gender}} 
            </v-card-text>

             <v-card-text class="black--text">
                Suspect Age: {{ suspect.age}} 
            </v-card-text>

             <v-card-text class="black--text">
                Suspect Date of birth: {{ suspect.dob}} 
            </v-card-text>

             <v-card-text class="black--text">
                Suspect Home Address: {{ suspect.address}} 
            </v-card-text>

             <v-card-text class="black--text">
                Suspect City of residence: {{ suspect.current_city}} 
            </v-card-text>

             <v-card-text class="black--text">
                Suspect Home Address: {{ suspect.address}} 
            </v-card-text>

             <v-card-text class="black--text">
                Suspect Home Address: {{ suspect.address}} 
            </v-card-text>
            
             <v-card-text class="black--text">
                Suspect Home Address: {{ suspect.address}} 
            </v-card-text>
              
            
            </div>
          </div>
          <v-divider> </v-divider>
        </v-card>
        <v-divider> </v-divider>
 </div>
</v-row>
</v-card>
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

