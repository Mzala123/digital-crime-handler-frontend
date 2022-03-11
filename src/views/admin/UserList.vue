<template>
 <div>
    <v-card flat
    class="pa-3 mt-2">
    <v-card-text>
      <v-row>
        <v-col
          cols="12"
          offset-md="8"
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
      <template #[`item.email`]="{item}">
        <div class="d-flex flex-column">
          <div class="d-flex align-center">
          </div>
          <span class="text-xs text-no-wrap">{{ item.email }}</span>
        </div>
      </template>

      <template #[`item.actions`]="{ item }">
        <v-icon
          small
          class="me-2"
          @click="editUser(item)"
        >
          {{ icons.mdiPencilOutline }}
        </v-icon>
        <v-icon
          small
          @click="removeUser(item)"
        >
          {{ icons.mdiDeleteOutline }}
        </v-icon>
      </template>


    </v-data-table>
    </v-card>
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
                    @click="closeDelete"
                >
                    Cancel
                </v-btn>
                <v-btn
                    color="success"
                    @click="deleteItemConfirm"
                >
                   YES
                </v-btn>
                <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>

  </div>

</template>

<script>
import axios from 'axios'
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
           headers: [
            {text:"FULLNAME", value:"name"},
            {text:"EMAIL", value:"email"},
            {text:"USER ROLE", value:"userrole"},
            {text:"ACTION", value:"actions"}
           ],
           userList: [],
           editedItem: {},
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
              .get("http://localhost:3000/api/users")
              .then((response)=>{
                  this.userList = response.data
                  this.loading = false
                  console.log(response.data)
              })     
        },
        removeUser(userId){
             
             this.dialogDelete = true
             console.log("Delete button clicked"); 
        },
        editUser(userId){
             console.log("edit button clicked"); 
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