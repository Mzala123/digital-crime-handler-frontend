<template>
    <v-container>
    <v-card
    flat
    elevation="1"
    class="pa-3 mt-2 col-md-7"
    >
 <v-row justify="center">
  <div class=col-md-10>
    <v-card-text class="bold">
        EDIT SUSPECT DETAILS
     </v-card-text>
    <v-card-text elevation="1" class="d-flex"> 
      <v-avatar
        rounded
        size="120"
        class="me-6"
      >
        <v-img :src="PhotoPath+suspect.profile_photo"></v-img> 
      </v-avatar> 
       <div>
      <v-btn
        color="primary"
        class="text-none me-3 mt-10"
        round
        depressed
        :loading="isSelecting"
        @click="onButtonClick"
      >
         <v-icon class="d-sm-none">
            {{ icons.mdiCloudUploadOutline }}
          </v-icon>
          <span class="d-none d-sm-block">Change Suspect Photo</span>
      </v-btn>
      <input
        ref="uploader"
        class="d-none"
        type="file"
        accept="image/*"
        @change="onImageUpload"
      >
         <p class="text-sm mt-5">
          Allowed JPG, GIF or PNG.
        </p>
    </div>
    </v-card-text>

     <v-card-text>
<v-form
    v-model="valid"
    lazy-validation
  >
  <v-row justify="center">

    <v-col md="6"
     cols="12">
     <v-text-field
      class="mt-4"
      outlined
      dense
      v-model="suspect.nationalId"
      :rules="nameRules"
      label="National Id(mandotory)"
      required
    ></v-text-field>
      </v-col>

      <v-col md="6"
     cols="12">

    <v-text-field
      class="mt-4"
      outlined
      dense
      v-model="suspect.firstname"
      :rules="nameRules"
      label="First name(mandotory)"
      required
    ></v-text-field>
    </v-col>

     <v-col md="6"
     cols="12">
    <v-text-field
      class="mt-2"
      outlined
      dense
      v-model="suspect.lastname"
      :rules="nameRules"
      label="Last name(mandotory)"
    ></v-text-field> </v-col>

     <v-col md="6"
     cols="12">
    <v-text-field
      class="mt-2"
      dense
      v-model="suspect.middlename"
      :rules="emailRules"
      label="Middle name"
      required
      outlined
    ></v-text-field> </v-col>

    <v-col md="6"
     cols="12">
    <v-text-field
      class="mt-2"
      dense
      v-model="suspect.age"
      label="Suspect Age(mandotory)"
      type="number"
      required
      outlined
    ></v-text-field> </v-col>

    <v-col md="6"
     cols="12">
    <v-text-field
      class="mt-2"
      dense
      v-model="suspect.dob"
      label="Date of birth(mandotory)"
      type="date"
      required
      outlined
    ></v-text-field> </v-col>

    </v-row>

    <v-select
      class="mt-2"
      dense
      outlined
      v-model="suspect.gender"
      :items="genderOptions "
      :rules="[v => !!v || 'Gender is required']"
      label="Gender(mandotory)"
      required
    ></v-select>

     <v-textarea
      class="mt-2"
      dense
      v-model="suspect.address"
      label="Address"
      outlined
    ></v-textarea>

   <v-row>

     <v-col md="6"
     cols="12">
    <v-text-field
      class="mt-2"
      dense
      v-model="suspect.known_aliases"
      label="Known ALiases"
      outlined
    ></v-text-field> </v-col>

   <v-col md="6"
     cols="12">
    <v-text-field
      class="mt-2"
      dense
      v-model="suspect.city_origin"
      label="City of origin"
      outlined
    ></v-text-field> </v-col>

    <v-col md="6"
     cols="12">
    <v-text-field
      class="mt-2"
      dense
      v-model="suspect.current_city"
      label="Current City"
      outlined
    ></v-text-field> </v-col>

    <v-col md="6"
     cols="12">
    <v-text-field
      class="mt-2"
      dense
      v-model="suspect.race"
      label="Race/Tribe"
      outlined
    ></v-text-field> </v-col>

   <v-col md="6"
     cols="12">
    <v-text-field
      class="mt-2"
      dense
      v-model="suspect.height"
      label="Height"
      outlined
    ></v-text-field> </v-col>

    <v-col md="6"
     cols="12">
    <v-text-field
      class="mt-2"
      dense
      v-model="suspect.weight"
      label="Weight"
      outlined
    ></v-text-field> </v-col>

   <v-col md="6"
     cols="12">
     <v-text-field
      class="mt-2"
      dense
      v-model="suspect.eye_color"
      label="Eye Color"
      outlined
    ></v-text-field> </v-col>

    <v-col md="6"
     cols="12">
     <v-text-field
      class="mt-2"
      dense
      v-model="suspect.hair_color"
      label="Hair Color"
      outlined
    ></v-text-field> </v-col>

   </v-row>

    <v-text-field
      class="mt-2"
      dense
      v-model="suspect.skin_tone"
      label="Skin Tone"
      outlined
    ></v-text-field>

  <v-text-field
      class="mt-2"
      dense
      hidden="true"
      v-show="false"
      v-model="suspect._id"
      label="suspect id"
      outlined
    ></v-text-field>
    

    <v-btn
      color="primary"
      class="mr-4 mt-4"
      @click="editSuspectDetails()"
     >
     Edit Suspect
    </v-btn>

    <v-btn
      color="success"
      class="mr-4 mt-4"
      @click="resetValidation()"
     >
      Cancel
    </v-btn>
  </v-form>
     </v-card-text>  
    <!--panotu-->
  </div>
 </v-row>
 </v-card>
 </v-container>
</template>

<script>
import { mdiAccountOutline, mdiEmailOutline,
 mdiCellphone, mdiLockOutline, mdiAlertOutline,
 mdiCloudUploadOutline, mdiEyeOffOutline,mdiEyeOutline
 } from '@mdi/js'
import axios from 'axios'

export default {
    data(){
        return{
        icons: {
                mdiAccountOutline,
                mdiEmailOutline,
                mdiCellphone,
                mdiLockOutline,
                mdiAlertOutline,
                mdiCloudUploadOutline,
                mdiEyeOffOutline,
                mdiEyeOutline  
            },

      genderOptions: [
          "Male",
          "Female"
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


       PhotoPath:"http://localhost:3000/images/",
       selectedFile: null,
       isSelecting: false
    }
  },
  methods: {
       editSuspectDetails() {
        axios
           .put("http://localhost:3000/api/update_person_suspect/"+this.suspect._id,{
                nationalId:this.suspect.nationalId,
                firstname:this.suspect.firstname,
                lastname:this.suspect.lastname,
                age: this.suspect.age,
                gender: this.suspect.gender,
                dob: this.suspect.dob,
                middlename: this.suspect.middlename,
                profile_photo: this.suspect.profile_photo,
                city_origin: this.suspect.city_origin,
                race: this.suspect.race,
                height: this.suspect.height,
                weight: this.suspect.weight,
                eye_color: this.suspect.eye_color,
                hair_color: this.suspect.hair_color,
                current_city: this.suspect.current_city,
                address: this.suspect.address,
                skin_tone: this.suspect.skin_tone,
                known_aliases: this.suspect.known_aliases
           })
           .then((response)=>{
             if(response.status === 200){
                    this.$swal("Information","Suspect Details Updated", "success")
                      .then(()=>{
                         this.$router.push({path:"/list_suspects"})
                      })
             }else{
               this.$swal("error","There was an error which updating suspect details", "error")
             }
           }).catch((error)=>{
               this.$swal("Error", error + ", couldn't reach API", "error");  
           })
       },

       get_list_of_suspects_by_Id(id){
             axios
              .get("http://localhost:3000/api/read_one_person_suspect/"+id)
              .then((response)=>{
                  this.suspect = response.data
                  this.suspect.imagename = response.data.imagename
                  console.log(this.suspect)
              })  
       },
       onButtonClick() {
      this.isSelecting = true
      window.addEventListener('focus', () => {
        this.isSelecting = false
      }, { once: true })

      this.$refs.uploader.click()
    },

    onImageUpload(e) {
      //this.selectedFile = e.target.files[0]
      let formData = new FormData
      formData.append('file',e.target.files[0]);
      axios.post("http://localhost:3000/api/upload_user_imagefile",
          formData)
          .then((response)=>{
          this.suspect.profile_photo = response.data
         /* this.imageId = response.data._id
          sessionStorage.setItem("imageId", Object(response.data._id)) */
          console.log("The image id is "+this.imagename)
      })
      // do something
    },

  },

  mounted() {
    this.get_list_of_suspects_by_Id(this.$route.params.id)
  }
}
</script>