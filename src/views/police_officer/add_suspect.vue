<template>
  <v-container>
    <v-card
    flat
    class="pa-3 mt-2 col-md-7"
    >
 <v-row justify="center">
  <div class=col-md-8>
    <v-card-text class="bold">
        ADD SUSPECT DETAILS
     </v-card-text>
    <v-card-text elevation="1" class="d-flex"> 
      <v-avatar
        rounded
        size="120"
        class="me-6"
      >
        <v-img :src="PhotoPath+imagename"></v-img> 
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
          <span class="d-none d-sm-block">Upload Suspect Photo</span>
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

        <v-avatar
        rounded
        size="120"
        class="me-6"
      >
       <v-html :src="imagename"></v-html> 
        
      </v-avatar> 

      <v-btn
      color="primary"
      class="mr-4 mt-4"
      @click="retrieveSuspectImage()"
    >
    retrieved image
    </v-btn>
      
<v-form
    v-model="valid"
    lazy-validation
  >
     <v-text-field
      class="mt-4"
      outlined
      dense
      v-model="nationalId"
      :rules="nameRules"
      label="National Id(mandotory)"
      required
    ></v-text-field>

    <v-text-field
      class="mt-2"
      outlined
      dense
      v-model="firstname"
      :rules="nameRules"
      label="First name(mandotory)"
      required
    ></v-text-field>

    <v-text-field
      class="mt-2"
      outlined
      dense
      v-model="lastname"
      :rules="nameRules"
      label="Last name(mandotory)"
    ></v-text-field>

    <v-text-field
      class="mt-2"
      dense
      v-model="middlename"
      :rules="emailRules"
      label="Middle name"
      required
      outlined
    ></v-text-field>
    
    <v-text-field
      class="mt-2"
      dense
      v-model="age"
      label="Suspect Age(mandotory)"
      type="number"
      required
      outlined
    ></v-text-field>

    <v-text-field
      class="mt-2"
      dense
      v-model="dob"
      label="Date of birth(mandotory)"
      type="date"
      required
      outlined
    ></v-text-field>

    <v-select
      class="mt-2"
      dense
      outlined
      v-model="gender"
      :items="genderOptions "
      :rules="[v => !!v || 'Gender is required']"
      label="Gender(mandotory)"
      required
    ></v-select>

     <v-textarea
      class="mt-2"
      dense
      v-model="address"
      label="Address"
      outlined
    ></v-textarea>

    <v-text-field
      class="mt-2"
      dense
      v-model="known_aliases"
      label="Known ALiases"
      outlined
    ></v-text-field>

    <v-text-field
      class="mt-2"
      dense
      v-model="city_origin"
      label="City of origin"
      outlined
    ></v-text-field>

    <v-text-field
      class="mt-2"
      dense
      v-model="current_city"
      label="Current City"
      outlined
    ></v-text-field>

    <v-text-field
      class="mt-2"
      dense
      v-model="race"
      label="Race/Tribe"
      outlined
    ></v-text-field>

    <v-text-field
      class="mt-2"
      dense
      v-model="height"
      label="Height"
      outlined
    ></v-text-field>

    <v-text-field
      class="mt-2"
      dense
      v-model="weight"
      label="Weight"
      outlined
    ></v-text-field>

     <v-text-field
      class="mt-2"
      dense
      v-model="eye_color"
      label="Eye Color"
      outlined
    ></v-text-field>

     <v-text-field
      class="mt-2"
      dense
      v-model="hair_color"
      label="Hair Color"
      outlined
    ></v-text-field>

    <v-text-field
      class="mt-2"
      dense
      v-model="skin_tone"
      label="Skin Tone"
      outlined
    ></v-text-field>

    <v-btn
      color="primary"
      class="mr-4 mt-4"
      @click="addSuspect()"
    >
     Add Suspect
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

       <v-overlay absolute opacity="0" :value="overlay">
                <v-progress-circular
                   indeterminate
                   size="64"
               ></v-progress-circular>
        </v-overlay>


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
      overlay: false,

      nationalId: "",
      firstname:"",
      lastname:"",
      age:"",
      gender:"",
      dob:"",
      middlename:"",
      city_origin:"",
      race:"",
      height:"",
      weight:"",
      eye_color:"",
      hair_color:"",
      current_city:"",
      address:"",
      skin_tone:"",
      known_aliases:"",

      imagename:'null_profile.png',
      imageDB: "",
      imageId:"",

      PhotoPath:"http://localhost:3000/images/",

       selectedFile: null,
       isSelecting: false
        }
    },
     computed: {
        buttonText(){
            return this.selectedFile  
        }
    },

    methods: {

      addSuspect(){
         if(!this.nationalId || !this.firstname || !this.lastname || !this.age
            || !this.gender || !this.dob){
                this.$swal("Warning","Please fill in all required fields","warning")
         }else{
            this.overlay = true
            axios
            .post("http://localhost:3000/api/add_person_suspect",{
               
                nationalId:this.nationalId,
                firstname:this.firstname,
                lastname:this.lastname,
                age: this.age,
                gender: this.gender,
                dob: this.dob,
                middlename: this.middlename,
                profile_photo: this.imagename,
                city_origin: this.city_origin,
                race: this.race,
                height: this.height,
                weight: this.weight,
                eye_color: this.eye_color,
                hair_color: this.hair_color,
                current_city: this.current_city,
                address: this.address,
                skin_tone: this.skin_tone,
                known_aliases: this.known_aliases

            }).then((response)=>{
                if(response.status === 201){
                     this.overlay=false
                     this.$swal("Info","Suspect details added", "success")
                }else if(response.status === 404){
                     this.$swal("error","Failed to add suspect record", "error")
                }

            }).catch((error)=>{

            })
         }
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
      axios.post("http://localhost:3000/api/upload_user_profile",
          formData)
          .then((response)=>{
          this.imagename = response.data.imagename
          this.imageId = response.data._id
          sessionStorage.setItem("imageId", Object(response.data._id))
          console.log("The image id is "+this.imageId)
      })
      // do something
    },
    retrieveSuspectImage(){
          var base = this;
          this.imageId = sessionStorage.getItem("imageId")
          console.log("The id for the image is "+this.imageId)
          axios
           .get("http://localhost:3000/api/get_user_profile_image/"+this.imageId)
           .then((response)=>{
             this.imagename = response.data.img
             
           })
    }

    },
    mounted(){
     //  this.retrieveSuspectImage()
    }

    

}
</script>

<style lang="scss">

</style>