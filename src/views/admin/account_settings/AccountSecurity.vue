<template>
  <v-card
    flat
    class="mt-5"
  >
    <v-form>
      <div class="px-3">
        <v-card-text class="pt-5">
          <v-row>
            <v-col
              cols="12"
              sm="8"
              md="6"
            >
              <!-- new password -->
              <v-text-field
                v-model="password"
                :type="isNewPasswordVisible ? 'text' : 'password'"
                :append-icon="isNewPasswordVisible ? icons.mdiEyeOffOutline:icons.mdiEyeOutline"
                label="New Password"
                outlined
                dense
                persistent-hint
                @click:append="isNewPasswordVisible = !isNewPasswordVisible"
              ></v-text-field>

              <!-- confirm password -->
              <v-text-field
                v-model="confirmPassword"
                :type="isCPasswordVisible ? 'text' : 'password'"
                :append-icon="isCPasswordVisible ? icons.mdiEyeOffOutline:icons.mdiEyeOutline"
                label="Confirm New Password"
                outlined
                dense
                class="mt-3"
                @click:append="isCPasswordVisible = !isCPasswordVisible"
              ></v-text-field>
            </v-col>

           
          </v-row>
        </v-card-text>
      </div>

      <div class="pa-3">
        <!-- action buttons -->
        <v-card-text>
          <v-btn
            @click="changeUserPassword()"
            color="primary"
            class="me-3 mt-3"
          >
            Save changes
          </v-btn>
          <v-btn
            color="secondary"
            outlined
            class="mt-3"
          >
            Cancel
          </v-btn>
        </v-card-text>
      </div>
    </v-form>
  </v-card>
</template>

<script>
import { mdiKeyOutline, mdiLockOpenOutline, mdiEyeOffOutline, mdiEyeOutline } from '@mdi/js'
import axios from 'axios'

export default {
  data() {
    return {
      isCurrentPasswordVisible: "",
      isNewPasswordVisible: "",
      currentPassword:"",
      isCPasswordVisible:"",
      password:"",
      confirmPassword:"",
      icons: {
        mdiKeyOutline,
        mdiLockOpenOutline,
        mdiEyeOffOutline,
        mdiEyeOutline,
      },
    }
  },
  methods: {
      changeUserPassword(){
         const user = JSON.parse(sessionStorage.getItem("user"))
         this.userId = user._id
         if(!this.password && !this.confirmPassword){
           this.$swal("Please fill in all fields")
         }else if(this.password !== this.confirmPassword){
              this.$swal("Information","Password mismatch", "warning")
         }else if(this.password === this.confirmPassword){
           axios
           .put("http://localhost:3000/api/update_user_password/"+this.userId,{
              password: this.password
           })
           .then((response)=>{
             if(response.status === 200){
                    this.$swal("Warning","Password changed successfully", "success")
             }else{
               this.$swal("error","There was an error which changing a user password", "error")
             }
           }).catch((error)=>{
               this.$swal("Error", error + ", couldn't reach API", "error");  
           })
         }
        
      }
  }
}
</script>

<style lang="scss" scoped>
.two-factor-auth {
  max-width: 25rem;
}
.security-character {
  position: absolute;
  bottom: -0.5rem;
}
</style>
