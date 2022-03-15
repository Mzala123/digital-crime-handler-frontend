
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
      disabled
      v-model="user.name"
      :rules="nameRules"
      label="Full name"
      required
    ></v-text-field>

    <v-text-field
      class="mt-3"
      dense
      disabled
      v-model="user.email"
      :rules="emailRules"
      label="E-mail"
      required
      outlined
    ></v-text-field>

    <v-text-field
      class="mt-3"
      dense
      disabled
      v-model="user.userrole"
      :rules="emailRules"
      label="User role"
      required
      outlined
    ></v-text-field>

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

export default {
       data(){
           return{
      name: '',
      PhotoPath:"http://localhost:3000/images/",
      userId :"",

       user: {
             name: null,
             email:null,
             userrole: null,
             imagename:'null_profile.png',
           },

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
      updateUserDetails(){

      },
      onButtonClick() {
      this.isSelecting = true
      window.addEventListener('focus', () => {
        this.isSelecting = false
      }, { once: true })

      this.$refs.uploader.click()
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