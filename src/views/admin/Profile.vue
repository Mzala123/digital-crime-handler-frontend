<template>
    
  <v-card
    flat
    class="pa-3 mt-2 col-md-7"
  >
  <div class=col-md-8>
    <v-card-text elevation="1" class="d-flex">
        
      <v-avatar
        rounded
        size="200"
        class="me-6"
      >
        <v-img :src="PhotoPath+imagename"></v-img> 
      </v-avatar>    
    </v-card-text>

   <!-- form begins -->
     <v-card-text>


     </v-card-text>  
    <!--panotu-->
  </div>
  </v-card>
</template>

<script>
import {mdiCloudUploadOutline}from "@mdi/js"
export default {
    name: "ProfileView",
    data(){
        return{
         icons:{
             mdiCloudUploadOutline
         }
        }
    }
}
</script>

<style lang="scss">

</style>