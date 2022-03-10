<template>
  <div class="auth-wrapper auth-v1">
    <div class="auth-inner">
      <v-card class="auth-card"  elevation="1">
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
              <!--<v-checkbox
                label="Remember Me"
                hide-details
                class="me-3 mt-3"
              >
              </v-checkbox> -->
              <a
                href="javascript:void(0)"
                class="mt-3"
               >
                Forgot Password?
              </a>
            </div>

            <v-btn
              block
              color="primary"
              class="mt-6"
              :append-icon ="icons.mdiEmail"
            >
              Login
            </v-btn>
          </v-form>
        </v-card-text>

        <v-card-actions class="d-flex justify-center">
          <v-btn
            v-for="link in socialLink"
            :key="link.icon"
            icon
            class="ms-1"
          >
            <v-icon :color="$vuetify.theme.dark ? link.colorInDark : link.color">
              {{ link.icon }}
            </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import {mdiFacebook, mdiTwitter, mdiGithub, mdiGoogle, mdiEyeOutline, mdiEyeOffOutline, mdiEmail, mdiLogin } from '@mdi/js'

export default {
  name: 'LoginView',
  data() {
    return {

      isPasswordVisible : false,
      email : '',
      password : '',
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
    Login(){

    }
  }
     
}
</script>

<style lang="scss">
@import '~@/plugins/vuetify/default-preset/preset/pages/auth.scss';
</style>