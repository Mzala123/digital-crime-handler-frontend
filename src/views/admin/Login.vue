<template>
  <div class="auth-wrapper auth-v1" id="logins">
    <div class="auth-inner">
      <v-card class="auth-card" 
       elevation="1">
        <v-card-title class="d-flex align-center justify-center">
              <v-img
              :src="require('@/assets/police_logo.png')"
              max-height="80px"
              max-width="80px"
              alt="logo"
              contain
              class="me-1"
            ></v-img>  
        </v-card-title>
        <!-- logo -->
        <v-card-title class="d-flex align-center justify-center py-2">
          <router-link
            to="/home"
            class="d-flex align-center"
          >
            <h4 class="text-2xl font-weight-bold">
              DIGITAL CRIME HANDLER
            </h4>
          </router-link>
        </v-card-title>

        <!-- title -->
        <v-card-text>
          <p class="text font-weight-bold text--primary mb-1">
            Welcome to Police DCH! 👋🏻
          </p>
        </v-card-text>
        <!-- login form -->
        <v-card-text>
          <v-form>
            <div>
            <v-text-field
              v-model="email"
              outlined
              label="Email"
              placeholder=""
              :append-icon="icons.mdiEmail"
              hide-details
              class="mb-3"
              dense
            ></v-text-field>
            </div>

            <div class="mt-3">
            <v-text-field
              v-model="password"
              outlined
              dense
              class="mb-3"
              :type="isPasswordVisible ? 'text' : 'password'"
              label="Password"
              placeholder=""
              :append-icon="isPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
              hide-details
              @click:append="isPasswordVisible = !isPasswordVisible"
            ></v-text-field> 
            </div>

            <div class="d-flex align-center justify-space-between flex-wrap">
              <a
                href="javascript:void(0)"
                class="mt-3"
               >
                Forgot Password?
              </a>
            </div>

            <v-btn
             @click="SignIn()"
              block
              color="primary"
              class="mt-6"
              :append-icon ="icons.mdiEmail"
            >
              SignIn
            </v-btn>
          </v-form>
        </v-card-text>

 <!-- overray-->

       <v-overlay absolute opacity="0" :value="overlay">
                <v-progress-circular
                   indeterminate
                   size="64"
               ></v-progress-circular>
        </v-overlay>
             <!-- overray-->

      </v-card>
    </div>
  </div>
</template>

<script>
import {mdiFacebook, mdiTwitter, mdiGithub, mdiGoogle, mdiEyeOutline, mdiEyeOffOutline, mdiEmail, mdiLogin } from '@mdi/js'
import axios from 'axios'
import config from '@/config'
import {store} from '@/store.js'

export default {
  name: 'LoginView',
  data() {
    return {

      isPasswordVisible : false,
     
      email: '',
      password: '',
      overlay: false,
     

     socialLink : [
            {
              icon: mdiFacebook,
              color: '#4267b2',
              colorInDark: '#4267b2',
            },
            {
              icon: mdiTwitter,
              color: '#1da1f2',
              colorInDark: '#1da1f2',
            },
            {
              icon: mdiGithub,
              color: '#272727',
              colorInDark: '#fff',
            },
            {
              icon: mdiGoogle,
              color: '#db4437',
              colorInDark: '#db4437',
            },
          ],
          icons: {
            mdiEyeOutline,
            mdiEyeOffOutline,
            mdiEmail,
            mdiLogin 
          },
          
    }
  },

  methods: {
    SignIn(){
      if(!this.email || !this.password){
        this.$swal("Field Validation","Please Fill in all required fields")
      }else{
        this.overlay = true
        let authEndpoint = `${sessionStorage.getItem("BASE_URL")}api/login`;
        console.log(authEndpoint);
        axios
          .post(authEndpoint,{
               email : this.email,
               password: this.password
          })
          .then((response)=>{
           
                 if(response.status === 201){
                   sessionStorage.setItem("Authorization", response.data.token)
                   console.log(sessionStorage.getItem("Authorization"))
                   sessionStorage.setItem("user", JSON.stringify(response.data.user))
                   console.log(sessionStorage.getItem("user"))
                   sessionStorage.setItem("temp_pass", this.password)
                   console.log(sessionStorage.getItem("temp_pass"))
                   this.overlay = false
                   const user = JSON.parse(sessionStorage.getItem("user"))
                  
                   let userrole = user.userrole
                   let userId = user._id

                   sessionStorage.setItem("role", userrole)
                   sessionStorage.setItem("userId", userId)
                   
                   if(userrole === "Admin"){
                     this.$router.push('/admin_dashboard')
                   }else if(userrole === "Police Officer"){
                    this.$router.push('/police_dashboard')
                   }else if(userrole === "Station Officer"){
                     this.$router.push('/station_officer_dashboard')
                   }
                 }else {
                   this.$swal("Warning", response.data.info, "warning")
                 }
          }).catch((error)=>{
              this.$swal("Error", error + ", Couldn't reach API", "error")
              this.overlay = false
          }) 
      }
    }
  },
  mounted(){
     sessionStorage.setItem("BASE_URL",`${config.Base_URL}`)
  }
     
}
</script>

<style lang="scss">
@import '~@/plugins/vuetify/default-preset/preset/pages/auth.scss';


</style>