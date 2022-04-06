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
                              
                              <v-card-text class="text-right">
                                   <div class="">

                                        <v-btn
                                        class=""
                                        color="secondary"
                                        fab
                                        x-small
                                        dark
                                        v-show="userrole !='Police Officer'"
                                        @click="provideCrimeUpdate(item._id)"
                                      >
                                        <v-icon> {{icons.mdiListStatus }}</v-icon>
                                      </v-btn>
                                       <v-btn
                                       class="ml-3"
                                        color="success"
                                        fab
                                        x-small
                                        dark
                                        v-show="userrole !='Police Officer'"
                                        @click="sendNofication(item._id)"
                                      >
                                        <v-icon> {{icons.mdiEmail}}</v-icon>
                                      </v-btn>

                                        <v-btn
                                        class="ml-3"
                                        color="primary"
                                        fab
                                        x-small
                                        dark
                                       
                                        @click="editCrimeDetail(item._id)"
                                      >
                                        <v-icon> {{icons.mdiPencilOutline }}</v-icon>
                                      </v-btn>
                               
                                      <v-btn
                                        class="ml-3"
                                        color="error"
                                        v-show="userrole !='Police Officer'"
                                        fab
                                        x-small
                                        dark
                                        @click="removeCrimeDetail(item._id)"
                                      >
                                        <v-icon> {{icons.mdiDeleteOutline }}</v-icon>
                                      </v-btn>
                                     

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

     <!-- edit dialog box!-->

      <v-dialog
            v-model="dialog"
            max-width="800px"
          >
            <v-card>
                <v-system-bar
                                        dark
                                        color="secondary"
                                        style="color: white; font-weight:bold; height:40px"
                                       
                                    >
                                  MODIFY CRIME DETAILS
                      </v-system-bar>
              
                       <v-form
                            v-model="valid"
                            lazy-validation
                        >
                        <v-card-text>
                            <v-select
                               class="mr-8 ml-8 mt-4 pt-4"
                                dense
                                outlined
                                v-model="crimeList.category"
                                 :items="categoryOptions "
                                label="Crime category(*)"
                                required
                                ></v-select>

                             <v-text-field
                            class="mr-8 ml-8 pt-1"
                            outlined
                            dense
                            v-model="crimeList.counts"
                            label="Counts(*)"
                            type="number"
                            required
                            ></v-text-field>

                            <v-text-field
                            class="mr-8 ml-8 pt-1"
                            dense
                            v-model="crimeList.offenseDate"
                            label="Offense Date(*)"
                            type="date"
                            required
                            outlined
                            ></v-text-field>

                            <v-textarea
                                class="mr-8 ml-8 pt-1"
                                dense
                                v-model="crimeList.offenseDescription"
                                label="Crime Description(*)"
                                outlined
                             ></v-textarea>
                          
                            <v-text-field
                            class="mr-8 ml-8 pt-1"
                            dense
                            v-model="suspect._id"
                            required
                            outlined
                            v-show="false"
                            ></v-text-field>

                                 <v-text-field
                            class="mr-8 ml-8 pt-1"
                            dense
                            v-model="username"
                            required
                            outlined
                            v-show="false"
                            ></v-text-field>
                            </v-card-text>
                       </v-form>
             <v-card-text>
                 <v-btn
                  class="mr-2 ml-8 mb-4"
                  color="primary"
                  outlined
                  @click="saveCrimeDetails"
                >
                  Save
                </v-btn>

                <v-btn
                  class="mb-4"
                  color="error"
                  outlined
                  @click="close"
                >
                  Close
                </v-btn>
               
              </v-card-text>
            </v-card>
          </v-dialog>

        <!--end of edit dialog box!-->

        <!--Email notification dialog -->
              <v-dialog
                  v-model="emailDialog"
                  max-width="700px"
                >
               
                  <v-card
                    class="flat"
                    elevation="1"
                  >
                    <v-system-bar
                                        dark
                                        color="secondary"
                                        style="color: white; font-weight:bold; height:40px"
                                       
                                    >
                                  Send Notification to Suspect
                      </v-system-bar>
                      <v-form
                            v-model="valid"
                            lazy-validation
                        >
                           <v-text-field
                            class="mr-5 ml-5 pt-1 mt-5"
                            dense
                            v-model="mail.from"
                            label="From"
                            :rules="emailRules"
                            required
                            ></v-text-field>

                             <v-text-field
                            class="mr-5 ml-5 pt-1 mt-1"
                            dense
                            v-model="mail.to"
                            label="To"
                            :rules="emailRules"
                            required
                            ></v-text-field>

                            <v-text-field
                            class="mr-5 ml-5 pt-1 mt-1"
                            dense
                            v-model="mail.subject"
                            label="Subject"
                            required
                            ></v-text-field>

                            <v-textarea
                                class="mr-5 ml-5 pt-1 mt-1"
                                dense
                                v-model="mail.message"
                                label="Message"
                              
                             ></v-textarea>


                           <v-btn
                            color="primary"
                            class="mr-5 ml-5 pt-1 mt-5 mb-5"
                            @click="sendEmail"
                            elevation="1"
                          >
                            Send
                          </v-btn>

                      </v-form>

                  </v-card>
    
              </v-dialog>

        <!--End of Email notification dialog -->


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
    mdiEmail
} from '@mdi/js'


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
               mdiEmail
               
               },
               overlay: false,
               dialog: false,
               emailDialog: false,

               emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                  ],

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
                    },

                    username: "",
                    userrole:"",

                categoryOptions: [
                "Theft",
                "Physical Assault",
                "Drug Dealing",
                "Damage of property",
                "Robbery",
                "Fraud",
                "Kidnapping",
                 "Murder"
            ],

                   mail: {
                     from: "",
                     to: "",
                     subject: "",
                     message: ""
                   }

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
            removeCrimeDetail(crimeId){
                this.crimeId = crimeId
                this.suspectId = this.suspect._id
                  this.$swal({
              title: "Are you sure?",
              text: "Once deleted, you will no longer have such crime details!",
              icon: "warning",
              buttons: true,
              dangerMode: true,
            }).then((result)=>{
                if(result.isConfirmed){
                 axios
                  .delete(`${config.Base_URL}api/read_one_person_suspect/`+this.suspectId+"/crimes/"+this.crimeId)
                    .then((response)=>{
                    if(response.status === 204){
                        this.$swal("Message", "Crime details removed", "success").then(() => {
                         this.get_list_of_suspects_by_Id(this.suspectId);
                       })
                    }
                  })
                }
             })     
            },
            editCrimeDetail(crimeId){
              this.crimeId = crimeId
              this.suspectId = this.suspect._id
              this.dialog = true
              console.log("The id is is"+this.crimeId)
              //read_one_person_suspect/:suspectId/crimes/:crimeId
              axios
                .get(`${config.Base_URL}api/read_one_person_suspect/`+this.suspectId+"/crimes/"+this.crimeId)
                .then((response)=>{
                  if(response.status === 200){
                     this.crimeList  = response.data
                     console.log(this.crimeList)
                  }
                })

            },
            close () {
              this.dialog = false
            },
            
            saveCrimeDetails(){
                  console.log("Hello" +this.crimeId)
                  this.suspectId = this.suspect._id
                  console.log("well well "+this.suspectId);
                  axios
                   .put(`${config.Base_URL}api/read_one_person_suspect/`+this.suspectId+"/crimes/"+this.crimeId,{
                        category: this.crimeList.category,
                        counts: this.crimeList.counts,
                        offenseDate: this.crimeList.offenseDate,
                        offenseDescription: this.crimeList.offenseDescription
                       //officer: this.username
                   }).then((response)=>{
                       if(response.status === 200){
                          this.$swal("Info","Crime details modified", "success")
                          .then(()=>{
                            this.get_list_of_suspects_by_Id(this.suspectId)
                            this.dialog = false
                          })
                       }else{
                           this.$swal("error","There was an error modifying crime details", "error")
                       }
                   }).catch((error)=>{
                        
                   })
            },

           sendNofication(crimeId){
               this.crimeId = crimeId
               this.suspectId = this.suspect._id
               this.emailDialog = true
            },

            sendEmail(){
                console.log("Hello" +this.crimeId)
                  if(!this.mail.from || !this.mail.to || !this.mail.subject || !this.mail.message){
                      this.$swal("warning","Fill in all required field","warning")
                  }else{
                    axios 
                      .post(`${config.Base_URL}api/send_nofification_email_to_suspect`,{
                          from: this.mail.from,
                          to: this.mail.to,
                          subject: this.mail.subject,
                          text: this.mail.message,  
                          crimeId: this.crimeId
                      },
                       {
                            headers: {Authorization: `Bearer${sessionStorage.getItem('Authorization')}`}
                       },
                      ).then((response)=>{
                        if(response.status === 201){
                          this.$swal("Info","Notification sent", "success")
                          .then(()=>{
                            this.get_list_of_suspects_by_Id(this.suspectId)
                            this.emailDialog = false
                          })
                        }else{
                            this.$swal("Error","Failed to send Notification", "error")
                        }
                      })
                  }
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