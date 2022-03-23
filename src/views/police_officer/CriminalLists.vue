<template>
     <v-container>
        <v-row justify="center">
        <div class=col-md-10>
           <h2 class="mt-2"> LIST OF SUSPECTS </h2> 
             <p> <v-divider> </v-divider> </p>
             <v-row>
               <v-col class="col-xs-12">
                    <v-row>
                      <v-col class="col-xs-12 col-sm-8">
                         <v-text-field
                            class="mr-8"
                            v-model="search"
                            :append-icon="icons.mdiMagnify"
                            label="Find Suspect"
                            hide-details
                            dense
                            outlined
                        ></v-text-field>  
                     </v-col>
                       
                    </v-row>
                     <v-card class="mt-4">

                         <v-list three-line>
                            <template v-for="(item, index) in items">
                            <v-subheader
                                v-if="item.header"
                                :key="item.header"
                                v-text="item.header"
                            ></v-subheader>
                    
                            <v-divider
                                v-else-if="item.divider"
                                :key="index"
                                :inset="item.inset"
                            ></v-divider>
                    
                            <v-list-item
                                v-else
                                :key="item.title"
                            >
                                <v-list-item-avatar>
                                <v-img :src="item.avatar"></v-img>
                                </v-list-item-avatar>
                    
                                <v-list-item-content>
                                <v-list-item-title v-html="item.title"></v-list-item-title>
                                <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>

                            </template>
                        </v-list>

                     </v-card>
               </v-col>
             </v-row>
       </div>
       </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'
import {
    mdiMagnify,
    mdiDeleteOutline,
    mdiPencilOutline,
    mdiEye,
    mdiPlusCircleOutline
} from '@mdi/js'

export default {
    data(){
        return{
               icons: {
               mdiMagnify,
               mdiDeleteOutline,
               mdiPencilOutline,
               mdiPlusCircleOutline,
               mdiEye
           },

                items: [
                { header: 'Suspects' },

                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                    title: 'Brunch this weekend?',
                    subtitle: `<span class="text--primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
                },
                { divider: true, inset: true },
                ],
            

        }
    },
    methods: {
           list_of_suspects(){
            this.loading = true
            axios
              .get("http://localhost:3000/api/get_list_of_person_suspects")
              .then((response)=>{
                  this.suspectList = response.data
                  this.loading = false
                  console.log(response.data)
              })  
         },

    },

    mounted(){
        this.list_of_suspects()
    }
}
</script>

<style lang="sass">

</style>