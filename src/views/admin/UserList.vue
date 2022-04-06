<template>
 <div>
    <v-card flat
    class="pa-3 mt-2">
    <v-card-text>
      <v-row>
        <v-col
          cols="6"
          md="4"
        >
          <v-text-field
            v-model="search"
            :append-icon="icons.mdiMagnify"
            label="Search"
            single-line
            hide-details
            dense
            outlined
          ></v-text-field>
          
        </v-col>

      </v-row>
    </v-card-text>

    <!-- Table -->
    <v-data-table
      :headers="headers"
      :items="userList"
      :search="search"
      :items-per-page="5"
      class="table-kitchen-sink"
      :loading ="loading"
      loading-text="Loading... Please wait"
    >
      <!-- users list -->
      <template #[`item.actions`]="{ item }">
        <v-icon
          small
          class="me-2"
          @click="editUser(item._id)"
        >
          {{ icons.mdiPencilOutline }}
        </v-icon>
        <v-icon
          small
          @click="removeUser(item._id)"
        >
          {{ icons.mdiDeleteOutline }}
        </v-icon>
      </template> 


    </v-data-table>
    </v-card>

        <!-- edit dialog box!-->

      <v-dialog
            v-model="dialog"
            max-width="500px"
          >
            <v-card>
         
              <v-system-bar
                                        dark
                                        color="secondary"
                                        style="color: white; font-weight:bold; height:40px"
                                       
                                    >
                                  Change Userrole
                </v-system-bar>
            <v-card-text>
                   <v-select
                    class="mt-5 mr-4 ml-4"
                    dense
                    outlined
                    v-model="user.userrole"
                    :items="userroles"
                    :rules="[v => !!v || 'userrole is required']"
                    label="User role"
                    required 
                  >
                  </v-select>
              </v-card-text>
  
              <v-card-text>
                <v-btn
                  class="mr-2 ml-4 mb-1"
                  color="primary"
                  outlined
                  @click="editUserRole"
                >
                  Save
                </v-btn>

                 <v-btn
                  class="mr-4 mb-1"
                  color="error"
                  outlined
                  @click="close"
                >
                  Close
                </v-btn>

               </v-card-text>
            </v-card>
          </v-dialog>

        <!--end of edit dialog box!-->

        
        <v-dialog
            v-model="dialogDelete"
            max-width="500px"
            >
            <v-card>
                <v-card-title>
                Are you sure you want to remove this user?
                </v-card-title>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="error"
                    outlined
                    @click="closeDeleteModal"
                >
                    Cancel
                </v-btn>
                <v-btn
                    color="success"
                     outlined
                    @click="deleteUserConfirm"
                >
                   YES
                </v-btn>
                
                <div class="input-group mb-3">
                <input type="hidden" class="form-control"  aria-label="Username" 
                aria-describedby="basic-addon1" v-model="userId">
                </div> 
              
                <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>

  </div>

</template>

<script>
import axios from 'axios'
import config from '@/config'

import {
    mdiMagnify,
    mdiDeleteOutline,
    mdiPencilOutline
} from '@mdi/js'

export default {
    name: "UserList",
    data() {
        return {
           dialog: false,
           dialogDelete: false,
           search:"",
           loading: false,
           userroles: [
              'Police Officer',
              'Station Officer',  
            ],
           headers: [
            {text:"FULLNAME", value:"name"},
            {text:"EMAIL", value:"email"},
            {text:"USER ROLE", value:"userrole"},
            {text:"ACTION", value:"actions"}
           ],
           userList: [],
           user: {
             userrole: null
           },
           userrole:"",
           userId:"",
           icons: {
               mdiMagnify,
               mdiDeleteOutline,
               mdiPencilOutline
           }
        }
    },
    methods:{
        viewListOfUsers(){
            this.loading = true
            axios
              .get(`${config.Base_URL}api/users`)
              .then((response)=>{
                  this.userList = response.data
                  this.loading = false
                  console.log(response.data)
              })     
        },
        removeUser(userId){
              this.dialogDelete = true
              this.userId = userId
              console.log(userId)
              console.log("Delete button clicked"); 
              console.log();
        },
        editUser(userId){
             this.dialog = true
             this.userId = userId
             axios
              .get(`${config.Base_URL}api/read_one_user/`+this.userId)
              .then((response)=>{
                if(response.status === 200){
                   this.user = response.data
                   console.log(this.user)
                } 
              })
             //console.log("Edit button clicked");
        },

        deleteUserConfirm(){
             axios
             .delete(`${config.Base_URL}api/delete_user/`+this.userId)
             .then((response)=>{
               if(response.status === 204){
                   console.log("The status code is "+response.status);
                    this.viewListOfUsers()
                    this.dialogDelete = false
               }else{
                  this.$swal("error","There was an error deleting a user account ", "error")
               }
             }).catch((error)=>{
                 this.$swal("Error", error + ", couldn't reach API", "error");   
              })
        },

        closeDeleteModal(){
           this.dialogDelete = false
        },

      close () {
      this.dialog = false
       },
       editUserRole(){
         axios
           .put(`${config.Base_URL}api/update_userrole/`+this.userId,{
               userrole : this.user.userrole
           })
           .then((response)=>{
             if(response.status === 200){
               this.viewListOfUsers()
               this.dialog = false
             }else{
               this.$swal("error","There was an error which changing a userrole", "error")
             }
           }).catch((error)=>{
               this.$swal("Error", error + ", couldn't reach API", "error");  
           })

       }

    },
    mounted: function(){
       this.viewListOfUsers()
    }
}
</script>

<style lang="scss" scoped>
.table-kitchen-sink ::v-deep {
  .v-data-table-header {
    white-space: nowrap;
  }
}
</style>