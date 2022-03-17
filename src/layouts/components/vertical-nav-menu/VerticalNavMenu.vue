<template>

  <v-navigation-drawer
    :value="isDrawerOpen"
    app
    elevation="1"
    width="260"
    class="app-navigation-menu"
    :right="$vuetify.rtl"
    @input="val => $emit('update:is-drawer-open', val)"
  >
    <!-- Navigation Header -->
    <div class="vertical-nav-header d-flex items-center ps-6 pe-5 pt-5 pb-2">
      <router-link
        to="/"
        class="d-flex align-center text-decoration-none"
      >
        <v-img
          :src="require('@/assets/police_logo.png')"
          max-height="50px"
          max-width="50px"
          alt="logo"
          contain
          eager
          class="app-logo me-3"
        ></v-img>
        <v-slide-x-transition>
          <h4 class="app-title text--primary">
            DCH
          </h4>
        </v-slide-x-transition>
      </router-link>
    </div>

    <!-- Navigation Items -->
    <v-list expand
      class="vertical-nav-menu-items pr-5"
    >
    <div v-if="userrole === 'Admin' ">
      <nav-menu-link 
          v-for="item in admin"
          :key="item.title"
          :title="item.title"
          :to="{name: item.name}"
          :icon="item.icon"
      ></nav-menu-link>
    </div>
      <div v-if="userrole === 'Police Officer' ">
      <nav-menu-link 
          v-for="item in police_officer"
          :key="item.title"
          :title="item.title"
          :to="{name: item.name}"
          :icon="item.icon"
      ></nav-menu-link>
    </div>
     <!-- <nav-menu-link
        title="Dashboard"
        :to="{ name: 'dashboard' }"
        :icon="icons.mdiHomeOutline"
      ></nav-menu-link>
      <nav-menu-link
        title="Create Account"
        :to="{ name: 'create-account'}"
        :icon="icons.mdiAccountCogOutline"
      ></nav-menu-link> 

      <nav-menu-link
        title="User List"
        :to="{ name: 'user-list'}"
        :icon="icons.mdiFormatListBulletedSquare"
      ></nav-menu-link> -->
    </v-list>
  
  </v-navigation-drawer>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import {
  mdiHomeOutline,
  mdiAlphaTBoxOutline,
  mdiEyeOutline,
  mdiCreditCardOutline,
  mdiTable,
  mdiFileOutline,
  mdiFormSelect,
  mdiAccountCogOutline,
  mdiFormatListBulletedSquare,
  mdiFormatListBulleted,
  mdiHuman,
  mdiHumanMaleFemale,

} from '@mdi/js'
import NavMenuSectionTitle from './components/NavMenuSectionTitle.vue'
import NavMenuGroup from './components/NavMenuGroup.vue'
import NavMenuLink from './components/NavMenuLink.vue'

export default {
  components: {
    NavMenuSectionTitle,
    NavMenuGroup,
    NavMenuLink,
  },
  props: {
    isDrawerOpen: {
      type: Boolean,
      default: null,
    },
  },
  data() {
    return {
      icons: {
        mdiHomeOutline,
        mdiAlphaTBoxOutline,
        mdiEyeOutline,
        mdiCreditCardOutline,
        mdiTable,
        mdiFileOutline,
        mdiFormSelect,
        mdiAccountCogOutline,
        mdiFormatListBulletedSquare,
        mdiHuman,
        mdiHumanMaleFemale,
        mdiFormatListBulleted,
      },
       userrole: "",
       admin: [
         {title: 'Dashboard', icon:mdiHomeOutline, name:'dashboard'},
         {title: 'Create Account', icon:mdiAccountCogOutline, name:'create-account'},
         {title: 'List of Users', icon:mdiFormatListBulletedSquare, name:'user-list'}
       ],
       
       police_officer:[
         {title: 'Dashboard', icon:mdiHomeOutline, name:'police-dashboard'},
         {title: 'Add Suspect', icon:mdiHuman, name:'add-suspect'},
         {title: 'List of Suspects', icon:mdiFormatListBulleted, name:'suspect-list'},
         {title: 'Criminal List', icon:mdiFormatListBulletedSquare, name:'criminal-list'},
       ]

    }
  },
  mounted(){
    this.userrole = sessionStorage.getItem("role")
  }
   
}
</script>

<style lang="scss" scoped>
.app-title {
  font-size: 1.25rem;
  font-weight: 700;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.3px;
}

// ? Adjust this `translateX` value to keep logo in center when vertical nav menu is collapsed (Value depends on your logo)
.app-logo {
  transition: all 0.18s ease-in-out;
  .v-navigation-drawer--mini-variant & {
    transform: translateX(-4px);
  }
}

@include theme(app-navigation-menu) using ($material) {
  background-color: map-deep-get($material, 'background');
}

.app-navigation-menu {
  .v-list-item {
    &.vertical-nav-menu-link {
      ::v-deep .v-list-item__icon {
        .v-icon {
          transition: none !important;
        }
      }
    }
  }
}

// You can remove below style
// Upgrade Banner
.app-navigation-menu {
  .upgrade-banner {
    position: absolute;
    bottom: 13px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
