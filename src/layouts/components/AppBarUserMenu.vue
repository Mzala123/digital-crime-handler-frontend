<template>
  <v-menu
    offset-y
    left
    nudge-bottom="14"
    min-width="230"
    content-class="user-profile-menu-content"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-badge
        bottom
        color="success"
        overlap
        offset-x="12"
        offset-y="12"
        class="ms-4"
        dot
      >
        <v-avatar
          size="40px"
          v-bind="attrs"
          v-on="on"
        >
          <v-img :src="PhotoPath+imagename"></v-img>
        </v-avatar>
      </v-badge>
    </template>
    <v-list>
      <div class="pb-3 pt-2">
        <v-badge
          bottom
          color="success"
          overlap
          offset-x="12"
          offset-y="12"
          class="ms-4"
          dot
        >
          <v-avatar size="40px">
            <v-img :src="PhotoPath+imagename"></v-img>
          </v-avatar>
        </v-badge>
        <div
          class="d-inline-flex flex-column justify-center ms-3"
          style="vertical-align:middle"
        >
          <small><span class="text--primary font-weight-semibold mb-n1"> 
            {{username}}
          </span> </small>
          <small class="text--disabled text-capitalize">{{userrole}}</small>
        </div>
      </div>

      <v-divider></v-divider>
        <!-- Settings -->
      <v-list-item link
        :to="{name: 'settings'}"
      >
        <v-list-item-icon class="me-2">
          <v-icon size="22">
            {{ icons.mdiCogOutline }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Settings</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      
      <v-divider class="my-2"></v-divider>

      <!-- Logout -->
      <v-list-item link @click="signOut()">
        <v-list-item-icon class="me-2">
          <v-icon size="22">
            {{ icons.mdiLogoutVariant }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>LogOut</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import {
  mdiAccountOutline,
  mdiEmailOutline,
  mdiCheckboxMarkedOutline,
  mdiChatOutline,
  mdiCogOutline,
  mdiCurrencyUsd,
  mdiHelpCircleOutline,
  mdiLogoutVariant,
} from '@mdi/js'

export default {
  data() {
    return {
      icons: {
        mdiAccountOutline,
        mdiEmailOutline,
        mdiCheckboxMarkedOutline,
        mdiChatOutline,
        mdiCogOutline,
        mdiCurrencyUsd,
        mdiHelpCircleOutline,
        mdiLogoutVariant,
      },
     username:"",
     imagename:"",
     userrole:"",
     userId :"",
     PhotoPath:"http://localhost:3000/images/",

    }
  },

  methods: {
       setUserDetails(){
         const user = JSON.parse(sessionStorage.getItem("user"))
         this.username = user.name
         this.userrole = user.userrole
         this.imagename = user.imagename
         this.userId = user._id
         console.log(this.imagename)
         console.log(this.userId)
       },

       signOut(){
         sessionStorage.removeItem("Authorization");
         this.$router.push({path:"/"})
       }

  },

  mounted(){
      this.setUserDetails()
  }
}
</script>

<style lang="scss">
.user-profile-menu-content {
  .v-list-item {
    min-height: 2.5rem !important;
  }
}
</style>
