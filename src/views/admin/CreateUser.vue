
<template>

  <v-card
    flat
    class="pa-3 mt-2 col-md-7"
  >
  <div class=col-md-8>
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
          <span class="d-none d-sm-block">Upload user photo</span>
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
      class="mt-5"
      outlined
      dense
      v-model="name"
      :rules="nameRules"
      label="Full name"
      required
    ></v-text-field>

    <v-text-field
      class="mt-3"
      dense
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
      outlined
    ></v-text-field>

    <v-select
      class="mt-3"
      dense
      outlined
      v-model="userrole"
      :items="items"
      :rules="[v => !!v || 'userrole is required']"
      label="User role"
      required
    ></v-select>

     <v-text-field
              v-model="password"
              class="mt-3"
              outlined
              dense
              :rules="passwordRules"
              :type="isPasswordVisible ? 'text' : 'password'"
              label="Password"
              placeholder=""
              :append-icon="isPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
              hide-details
              @click:append="isPasswordVisible = !isPasswordVisible"
            ></v-text-field> 

    <v-btn
      color="primary"
      class="mr-4 mt-4"
      @click="createUserAccount()"
    >
     Register
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
  </v-card>

</template>

<script>

import { mdiAccountOutline, mdiEmailOutline,
 mdiCellphone, mdiLockOutline, mdiAlertOutline,
 mdiCloudUploadOutline, mdiEyeOffOutline,mdiEyeOutline
 
 } from '@mdi/js'

import VueSweetAlert from "vue-sweetalert2"
import axios from 'axios'
import config from '@/config'

export default {
       data(){
           return{
      isPasswordVisible : false,
      firstname:"",
      email:"",
      mobile:"",
      password:"",
      userrole:"",
      checkbox:false,
      valid: true,
      name: '',
      imagename:'null_profile.png',
      
      PhotoPath:`${config.Base_URL}images/`,

      nameRules: [
        v => !!v || 'Name is required',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],

      password:'',
      passwordRules:[
        v => !!v || 'Password is required',
      ],

      select: null,
      items: [
        'Police Officer',
        'Station Officer',  
      ],

      icons: {
        mdiAccountOutline,
        mdiEmailOutline,
        mdiCellphone,
        mdiLockOutline,
        mdiAlertOutline,
        mdiCloudUploadOutline,
        mdiEyeOffOutline,mdiEyeOutline
      },

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
      createUserAccount(){
          if(!this.name || !this.email || !this.userrole || !this.password){
            this.$swal("Please fill in all required fields")
          }else{
            axios
              .post(`${config.Base_URL}api/register`,{
                  name: this.name,
                  email: this.email,
                  userrole: this.userrole,
                  password: this.password,
                  imagename: this.imagename
              },
               {
                 headers: {Authorization: `Bearer${sessionStorage.getItem('Authorization')}`}
               },

              ).then((response)=>{
                  console.log(response.status)
                  if(response.status == 201){
                      this.$swal("Information","User Registered", "success")
                  } else {
                      this.$swal("error","There was an error creating a user account ", "error")
                  }
              }).catch((error)=>{
                 this.$swal("Error", error + ", couldn't reach API", "error");   
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
      axios.post(`${config.Base_URL}api/upload_user_imagefile`,
          formData)
          .then((response)=>{
          this.imagename = response.data
      })
      // do something
    }
  },
}
</script>

<style lang="css">
.v-icon--left {
  margin-right: 8px;
}
</style>