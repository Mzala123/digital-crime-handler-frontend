<template>
    <v-container>
    <v-card
    flat
    class="pa-3 mt-2 col-md-7"
    >
    <div id="edit-suspect-details">
       {{suspectId}}
    </div>

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
      v-model="suspectList.nationalId"
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
      v-model="firstname"
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
      v-model="lastname"
      :rules="nameRules"
      label="Last name(mandotory)"
    ></v-text-field> </v-col>

     <v-col md="6"
     cols="12">
    <v-text-field
      class="mt-2"
      dense
      v-model="middlename"
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
      v-model="age"
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
      v-model="dob"
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

   <v-row>

     <v-col md="6"
     cols="12">
    <v-text-field
      class="mt-2"
      dense
      v-model="known_aliases"
      label="Known ALiases"
      outlined
    ></v-text-field> </v-col>

   <v-col md="6"
     cols="12">
    <v-text-field
      class="mt-2"
      dense
      v-model="city_origin"
      label="City of origin"
      outlined
    ></v-text-field> </v-col>

    <v-col md="6"
     cols="12">
    <v-text-field
      class="mt-2"
      dense
      v-model="current_city"
      label="Current City"
      outlined
    ></v-text-field> </v-col>

    <v-col md="6"
     cols="12">
    <v-text-field
      class="mt-2"
      dense
      v-model="race"
      label="Race/Tribe"
      outlined
    ></v-text-field> </v-col>

   <v-col md="6"
     cols="12">
    <v-text-field
      class="mt-2"
      dense
      v-model="height"
      label="Height"
      outlined
    ></v-text-field> </v-col>

    <v-col md="6"
     cols="12">
    <v-text-field
      class="mt-2"
      dense
      v-model="weight"
      label="Weight"
      outlined
    ></v-text-field> </v-col>

   <v-col md="6"
     cols="12">
     <v-text-field
      class="mt-2"
      dense
      v-model="eye_color"
      label="Eye Color"
      outlined
    ></v-text-field> </v-col>

    <v-col md="6"
     cols="12">
     <v-text-field
      class="mt-2"
      dense
      v-model="hair_color"
      label="Hair Color"
      outlined
    ></v-text-field> </v-col>

   </v-row>

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
import axios from "axios"

export default {
    data(){
        return{
        suspectList:[],
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
      suspectId:"",
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
  methods: {
       get_list_of_suspects_by_Id(suspectId){
             axios
              .get("http://localhost:3000/api/read_one_person_suspect/"+suspectId)
              .then((response)=>{
                  this.suspectList = response.data
                  this.loading = false
                  console.log(response.data)
              })  
       }
  },
  created: function(){
    this.get_list_of_suspects_by_Id($this.$route.params.id)
  }
}
</script>