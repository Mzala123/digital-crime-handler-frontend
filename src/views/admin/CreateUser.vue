
<template>

  <v-card
    flat
    class="pa-3 mt-2 col-md-7"
  >
  <div class=col-md-8>
    <v-card-text class="d-flex">
      <v-avatar
        rounded
        size="120"
        class="me-6"
      >
        <v-img :src="require('@/assets/profile.png')"></v-img>
      </v-avatar>

      <!-- upload photo -->
       <div>
        <v-btn
          color="primary"
          class="me-3 mt-15" 
         >
          <v-icon class="d-sm-none">
            {{ icons.mdiCloudUploadOutline }}
          </v-icon>
          <span class="d-none d-sm-block">Upload user photo</span>
        </v-btn>

        <input
         
          type="file"
          accept=".jpeg,.png,.jpg,GIF"
          :hidden="true"
        />
      
      </div>
    </v-card-text>

   <!-- form begins -->
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
      v-model="select"
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
      @click="reset()"
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

export default {
       data(){
           return{
      isPasswordVisible : false,
      firstname:"",
      email:"",
      mobile:"",
      password:"",
      checkbox:false,
      valid: true,
      name: '',
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

       }
    },

     methods: {
      validate() {
        this.form.validate()
      },
      reset () {
        this.form.reset()
      },
      resetValidation () {
        this.form.resetValidation()
      },
    },
}
</script>