<template>
       <v-container>
        <v-row justify="center">
        <div class="col-md-10 auth-card">
           <h2 class="mt-4"> SUSPECT AND ALLEGED CRIME DETAILS 
              <span>
             
              <v-btn
              class="ml-6"
              color="secondary"
              x-small
              dark
              @click="createTrackSheet"
            >
            <v-icon> {{icons.mdiPdfBox }} </v-icon> Track sheet
            </v-btn>
            
           </span>
           </h2> 
             <p> <v-divider> </v-divider> </p>
            <v-row>
               <v-col class="col-xs-12">
                <v-row>
                     <v-col class="col-xs-12 col-sm-7">
                       <div>
                         <v-text-field
                          v-model="suspect._id"
                          v-show="false"
                         > 
                           okay
                         </v-text-field>
                         <h3 class="mb-1 ml-1"> {{suspect.firstname}} {{suspect.lastname}} </h3> 
                         <v-card flat class="mx-auto">
                              <v-system-bar
                                        dark
                                        color="secondary"
                                        style="color: white; font-weight:bold"
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
                                        color="secondary"
                                        style="color: white; font-weight:bold"
                                    >
                                 Physical Appearance Description

                                </v-system-bar>

                                 <v-chip-group
                                    
                                    class="deep-purple accent-4 black--text ml-4"
                                    column
                                    >
                                       <v-chip>Height - {{ suspect.height}}</v-chip>
                                       <v-chip>Weight - {{ suspect.weight}}</v-chip>
                                       <v-chip>Eye Color - {{ suspect.eye_color}}</v-chip>
                                        <v-chip>Hair color - {{ suspect.hair_color}}</v-chip>
                                        <v-chip>Skin tone - {{ suspect.skin_tone}}</v-chip>
                                 </v-chip-group> 

                            </v-card>
                        </div> 

                     </v-col>

            <v-col class="col-xs-12 col-sm-5">
                           <v-card flat >
                                <v-system-bar
                                        dark
                                        color="secondary"
                                        style="color: white; font-weight:bold"
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
                                        color="secondary"
                                        style="color: white; font-weight:bold"
                                        class="text--light"
                                    >
                                
                                 <router-link 
                                 style="color:#66CCFF;"
                                 v-bind:to="'/concuded_case_detail_notification/'+suspect._id+'/crimes/'+item._id">  
                                 
                                 {{ item.category }} 

                                 </router-link>
                                 
                              </v-system-bar>
                               
                                <v-card-text class="mt-3 black--text">
                                <div> Offense Description - {{ item.offenseDescription }} </div>
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
                                size="60"
                            ></v-progress-circular>
            </v-overlay>

         </div>
       </v-row>    
        <!-- end of status dialog-->
  </v-container>
</template>

<script>
import axios from "axios"
import config  from "@/config"

import {
    mdiMagnify,
    mdiDeleteOutline,
    mdiPencilOutline,
    mdiEye,
    mdiPlusCircleOutline,
    mdiListStatus,
    mdiEmail,
    mdiPdfBox
} from '@mdi/js'
import jsPDF from 'jspdf'
import autoTable  from 'jspdf-autotable'

export default {
    data(){
        return{
               crimeId: "",
               suspectId: "",
                 icons: {
               mdiMagnify,
               mdiDeleteOutline,
               mdiPencilOutline,
               mdiPlusCircleOutline,
               mdiEye,
               mdiListStatus,
               mdiEmail, mdiPdfBox
               
               },
               overlay: false,
               dialog: false,
               emailDialog: false,
               statusDialog:  false,

               emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                  ],

                isSelecting: false,

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
                    PhotoPath:`${config.Base_URL}/images/`,

                    crimeList: {
                        category:null,
                        counts:null,
                        offenseDate:null,
                        offenseDescription:null,
                        status: null,
                        statusDescription: null
                    },

                    username: "",
                    userrole:"",
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

               createTrackSheet(){
             const doc = new jsPDF()
             var Title = []
             var temp = [doc.addImage(this.PhotoPath+this.suspect.profile_photo,"JPEG",70,35,50,50,this.suspect.profile_photo)]
             Title.push(temp)
             var suspectDetails = [];
             var tempSuspectDetails =[this.suspect.nationalId, this.suspect.gender, this.suspect.age, this.suspect.dob, this.suspect.known_aliases, this.suspect.city_origin, this.suspect.current_city]
             suspectDetails.push(tempSuspectDetails)
             var cont_d_suspects = [];
             var temp_cont_d_suspects =[this.suspect.race, this.suspect.address, this.suspect.height, this.suspect.weight, this.suspect.eye_color, this.suspect.hair_color, this.suspect.skin_tone]
             cont_d_suspects.push(temp_cont_d_suspects)
             
             var crimes = []
             this.suspect.crimes.forEach(crime =>{
               var temp_crime = [crime.category, crime.offenseDescription, crime.status, crime.counts, crime.offenseDate]
               crimes.push(temp_crime)
             })

             doc.text("Malawi Police: Suspect Track Sheet", 15, 10)
             doc.text("Name of suspect: "+this.suspect.firstname+" "+this.suspect.lastname, 15, 20)
             doc.line(0, 30, 400, 30)

             autoTable(doc, {
                  head: [['National ID', 'Gender', 'Age', 'Date of birth', 'Known Aliases', 'City Of Origin', 'Current City']],
                       margin:{top:95},
                       body:[...suspectDetails]
             })
             
             autoTable(doc, {
                  head: [['Race', 'Address', 'Height', 'Weight', 'Eye Color', 'Hair Color', 'Skin Tone']],
                       margin:{top:110},
                       body:[...cont_d_suspects]
             })

             autoTable(doc, {
                  head: [['Category', 'Offense Description', 'Status', 'Count', 'Date Crime Committed']],
                       margin:{top:95},
                       body:[...crimes]
             })

             doc.setFontSize("12px")
             doc.save("suspect tract sheet.pdf");
             
           },


            setUserDetails(){
         const user = JSON.parse(sessionStorage.getItem("user"))
         this.username = user.name
         this.userrole = user.userrole
         this.userId = user._id
         console.log(this.imagename)
         console.log(this.userId)
         console.log("The userrole "+this.userrole)
       },

    },
    
    mounted() {

      this.get_list_of_suspects_by_Id(this.$route.params.id)
      this.setUserDetails()
    }
}
</script>

<style lang="scss">
   .v-card v-card-text{
         font-size: 40px;
   }
</style>