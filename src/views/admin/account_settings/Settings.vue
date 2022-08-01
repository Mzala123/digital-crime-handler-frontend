
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
        <v-img :src="PhotoPath+user.imagename"></v-img> 
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
      v-model="user.name"
      :rules="nameRules"
      label="Full name"
      required
    ></v-text-field>

    <v-text-field
      class="mt-3"
      dense
      v-model="user.email"
      :rules="emailRules"
      label="E-mail"
      required
      outlined
    ></v-text-field>

    <v-btn
      color="primary"
      class="mr-4 mt-4"
      @click="updateUser()"
    >
     Update
    </v-btn>

    <!--<v-btn
      color="success"
      class="mr-4 mt-4"
      @click="resetValidation()"
     >
      Cancel
    </v-btn> -->
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


import axios from 'axios'
import {store} from '@/store.js'

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
      PhotoPath:"http://localhost:3000/images/",
      userId :"",
      store,

       user: {
             name: null,
             email:null,
             imagename: "null_profile.png"
           },


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
      updateUser(){
         const user = JSON.parse(sessionStorage.getItem("user"))
         this.userId = user._id
         console.log("the new image is "+this.user.imagename)
           axios
           .put("http://localhost:3000/api/update_admin_name_and_email/"+this.userId,{
               name : this.user.name,
               email : this.user.email,
               imagename: this.user.imagename
           })
           .then((response)=>{
             if(response.status === 200){
                    console.log("The new username is"+this.user.name)
                    this.store.username = this.user.name
                    console.log("The new username2 is"+this.store.username )
                    this.$swal("Information","User Updated", "success")
             }else{
               this.$swal("error","There was an error which changing a userrole", "error")
             }
           }).catch((error)=>{
               this.$swal("Error", error + ", couldn't reach API", "error");  
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
          this.user.imagename = response.data
      })
      // do something
    },
     setUserDetails(){
         const user = JSON.parse(sessionStorage.getItem("user"))
         this.userId = user._id
         console.log("The retrieved id is "+this.userId)
          axios
              .get("http://localhost:3000/api/read_one_user/"+this.userId)
              .then((response)=>{
                if(response.status === 200){
                   this.user = response.data
                   console.log(this.user)
                } 
              })
       },
  },

  mounted(){
     this.setUserDetails();
  }
}
</script>

<style lang="css">
.v-icon--left {
  margin-right: 8px;
}
</style>