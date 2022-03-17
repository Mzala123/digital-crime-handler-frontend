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
      :items="gender"
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

      gender: [
          "Male",
          "Female"
      ],

      imagename:'null_profile.png',
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
          this.imagename = response.data
      })
      // do something
    }
    }


}
</script>

<style lang="scss">

</style>