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
                                 v-bind:to="'/crime_details_for_suspect/'+suspect._id+'/crimes/'+item._id">  
                                 
                                 {{ item.category }} 

                                 </router-link>
                                 
                              </v-system-bar>
                               
                                <v-card-text class="mt-3 black--text">
                                <div> Offense Description - {{ item.offenseDescription }} </div>
                                  
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

                                       <!-- <v-btn
                                        class="ml-3"
                                        color="success"
                                        fab
                                        x-small
                                        dark
                                        @click="attachFiles(item._id)"
                                      >
                                        <v-icon> {{icons.mdiAttachment}}</v-icon>
                                      </v-btn> -->

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
        
                                <!-- <div v-for="attachment in suspect.crimes.attachments" :key="attachment"> 
                                   <v-card>
                                  <v-card-text class="mt-3 black--text">
                                     Attachment {{attachment}}
                                   </v-card-text>
                                   </v-card>
                                </div>
                                 -->
                               
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
                         
                            lazy-validation
                        >
                        <v-card-text>
                            <v-select
                               class="mr-6 ml-6 mt-4 pt-4"
                                dense
                                outlined
                                v-model="crimeList.category"
                                 :items="categoryOptions"
                                label="Crime category(*)"
                                required
                             ></v-select>

                             <v-text-field
                            class="mr-6 ml-6 pt-1"
                            outlined
                            dense
                            v-model="crimeList.counts"
                            label="Counts(*)"
                            type="number"
                            required
                            ></v-text-field>

                            <v-text-field
                            class="mr-6 ml-6 pt-1"
                            dense
                            v-model="crimeList.offenseDate"
                            label="Offense Date(*)"
                            type="date"
                            required
                            outlined
                            ></v-text-field>

                            <v-textarea
                                class="mr-6 ml-6 pt-1"
                                dense
                                v-model="crimeList.offenseDescription"
                                label="Crime Description(*)"
                                outlined
                             ></v-textarea>
                          
                            <v-text-field
                            class="mr-6 ml-6 pt-1"
                            dense
                            v-model="suspect._id"
                            required
                            outlined
                            v-show="false"
                            ></v-text-field>

                                 <v-text-field
                            class="mr-6 ml-6 pt-1"
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
                  class="mr-2 ml-6 mb-4"
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
                            :loading="isSelecting"
                            @click="sendEmail"
                            elevation="1"
                          >
                            Send
                          </v-btn>

                      </v-form>

                  </v-card>
    
              </v-dialog>

        <!--End of Email notification dialog -->

        <!-- start of status dialog -->
           <v-dialog
                  v-model="statusDialog"
                  max-width="700px"
            >
              
                  <v-card
                    elevation="1"
                  >
                    <v-system-bar
                          dark
                          color="secondary"
                          style="color: white; font-weight:bold; height:40px"
                          
                      >
                          Provide Current Case Status
                      </v-system-bar>
                      <v-form>

                             <v-select
                               class="mr-5 ml-5 mt-4 pt-4"
                                dense
                                v-model="crimeList.status"
                                 :items="statusOptions"
                                label="Status"
                                required
                             ></v-select>

                             <v-textarea
                                class="mr-5 ml-5 pt-3 mt-1"
                                dense
                                v-model="crimeList.statusDescription"
                                label="Status description"
                             ></v-textarea>

                              <v-btn
                            color="primary"
                            class="mr-5 ml-5 pt-1 mt-5 mb-5"
                            @click="saveStatusDetails"
                            elevation="1"
                          >
                            Save
                          </v-btn>

                      </v-form>
                  
                  </v-card>


           </v-dialog>

        <!-- end of status dialog-->
              <v-dialog
                  v-model="attachmentDialog"
                  max-width="700px"
            >
              
                  <v-card
                    elevation="1"
                  >
                    <v-system-bar
                          dark
                          color="secondary"
                          style="color: white; font-weight:bold; height:40px"
                          
                      >
                         Attach Files to Case {{crimeList.category}}
                      </v-system-bar>
                      <v-form>

                          <div class="mr-5 ml-5 pt-1 mt-5 mb-5">
                            <label >
                              <input 
                               multiple
                               type="file"
                               ref="files"
                               @change="selectFile"
                               class="file-input"
                              >
                            </label>
                          </div>
                          <div class="ml-2 pt-1 mt-2 mb-2">
                          <v-list flat dense>
                            <v-list-item-group
                              v-model="selectedItem"
                              color="primary"
                            >
                              <v-list-item
                               v-for="(file, index) in files" :key="index"
                              >
                                
                                <v-list-item-content>
                                  {{file.name}}
                                </v-list-item-content>
                                <v-list-item-icon>
                                     <v-btn
                                        class="ml-1"
                                        color="error"
                                        fab
                                        x-small
                                        dark
                                        @click.prevent="files.splice(index, 1)"
                                      >
                                        <v-icon> {{icons.mdiClose }}</v-icon>
                                      </v-btn>

                                </v-list-item-icon>
                              </v-list-item>
                            </v-list-item-group>
                          </v-list>

                          </div>
                        

                              <v-btn
                            color="primary"
                            class="mr-5 ml-5 pt-1 mt-5 mb-5"
                            @click="sendAttachments"
                            elevation="1"
                          >
                            Save
                          </v-btn>

                      </v-form>
                  
                  </v-card>
           </v-dialog>

        <!--attachment dialog-->
        
   

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
    mdiCloudUploadOutline,
    mdiPlusCircleOutline,
    mdiListStatus,
    mdiEmail,
    mdiAttachment,
    mdiFileDocumentMultiple,
    mdiClose,
    mdiPdfBox
    //mdiclose-circle
} from '@mdi/js'
import jsPDF from 'jspdf'
import autoTable  from 'jspdf-autotable'


export default {
    data(){
        return{
               crimeId: "",
               suspectId: "",
               files: [],
               fileName: [],
               selectedItem: 1,
               
                 icons: {
               mdiMagnify,
               mdiDeleteOutline,
               mdiPencilOutline,
               mdiPlusCircleOutline,
               mdiEye,
               mdiListStatus,
               mdiEmail,
               mdiAttachment,
               mdiCloudUploadOutline,
               mdiClose,mdiPdfBox

               
               },

               overlay: false,
               dialog: false,
               emailDialog: false,
               statusDialog:  false,
               attachmentDialog: false,

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
                        statusDescription: null,
                        attachments: null
                    },
                  police_logo: "police_logos.png",
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
               
               statusOptions: [
                 "Pending",
                 "Ongoing",
                 "Closed",
                 "Dismissed",
                 "Transferred"
               ],

                   mail: {
                     from: "",
                     to: "",
                     subject: "",
                     message: ""
                   },
                count: 0

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
                    this.isSelecting = true
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
                            this.isSelecting = false
                            this.get_list_of_suspects_by_Id(this.suspectId)
                            this.emailDialog = false
                          })
                        }else{
                            this.$swal("Error","Failed to send Notification", "error")
                        }
                      })
                  }
            },
           provideCrimeUpdate(crimeId){
                this.statusDialog = true
                this.crimeId = crimeId
                this.suspectId = this.suspect._id
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

          selectFile() {
           const files = this.$refs.files.files;
           this.files = [ ...this.files, ...files]
           let formData = new FormData()
           for(this.count=0; this.count<this.files.length; this.count++){
                formData.append('file', files[this.count])
           }
           console.log(formData);
           axios.post(`${config.Base_URL}api/upload_multiple_files`,formData)
                .then((response)=>{
                  console.log(this.files);
                  
                 // this.files = []
                })
          },

           sendAttachments() {
               console.log("Hello" +this.crimeId)
               this.suspectId = this.suspect._id
               console.log("well well "+this.suspectId);
               this.fileName = this.files
               console.log(this.fileName);
               for(this.count=0; this.count<this.files.length; this.count++){
                 console.log(this.files[this.count].name)
                   axios.post(`${config.Base_URL}api/add_person_suspect/`+this.suspectId+"/add_attachment_names/"+this.crimeId, {
                     attachments: this.files[this.count].name
                }) 
               .then((response)=>{
                 if(response.status === 201){
                   this.$swal("Info","Files uploaded", "success")
                 }
               })
             } 
               this.attachmentDialog = false
          },
            
           attachFiles(crimeId){
             this.attachmentDialog = true
             this.crimeId = crimeId
             this.suspectId = this.suspectId._id
            
           },

           saveStatusDetails(){
               if(!this.crimeList.status || !this.crimeList.statusDescription){
                 this.$swal("Info","Fill in all required fields","warning")
               }else{
                 axios
                   .put(`${config.Base_URL}api/update_crime_case_status_details/`+this.suspectId+"/crimes/"+this.crimeId,{
                         status: this.crimeList.status,
                         statusDescription: this.crimeList.statusDescription
                   })
                   .then((response)=>{
                     if(response.status===200){
                         this.$swal("info","case status details updated","success")
                         .then(()=>{
                            this.get_list_of_suspects_by_Id(this.suspectId)
                            this.statusDialog = false
                         })
                         
                     }else{
                         this.$swal("Error","Failed to update case status details","error")
                     }
                   })
               }
           },
           createTrackSheet(){
             const doc = new jsPDF()
             var logo = []
             var temp_logo = [doc.addImage(this.PhotoPath+this.police_logo,"JPEG",75,2,40,40,this.police_logo)]
             logo.push(temp_logo)
             var Title = []
             var temp = [doc.addImage(this.PhotoPath+this.suspect.profile_photo,"JPEG",150,50,45,45,this.suspect.profile_photo)]
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

             doc.text("Malawi Police: Suspect Track Sheet", 15, 65)
             doc.text("Name of suspect: "+this.suspect.firstname+" "+this.suspect.lastname, 15, 75)
             doc.line(0, 45, 400, 45)

             autoTable(doc, {
                  head: [['National ID', 'Gender', 'Age', 'Date of birth', 'Known Aliases', 'City Of Origin', 'Current City']],
                       margin:{top:105},
                       body:[...suspectDetails]
             })
             
             autoTable(doc, {
                  head: [['Race', 'Address', 'Height', 'Weight', 'Eye Color', 'Hair Color', 'Skin Tone']],
                       margin:{top:110},
                       body:[...cont_d_suspects]
             })

             autoTable(doc, {
                  head: [['Category', 'Offense Description', 'Status', 'Count', 'Date Crime Committed']],
                       margin:{top:110},
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