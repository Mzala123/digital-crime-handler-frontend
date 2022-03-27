<template>
    <v-container>
        <v-row justify="center">
        <div class=col-md-10>
           <h2 class="mt-2"> Add alleged crime details to suspect {{ suspect.firstname}} {{suspect.lastname}}</h2> 
             <p> <v-divider> </v-divider> </p>
             <v-row>
               <v-col class="col-xs-12">
                   <v-card flat>
                       <v-form
                            v-model="valid"
                            lazy-validation
                        >
                     
                            <v-select
                               class="mr-8 ml-8 pt-4"
                                dense
                                outlined
                                v-model="category"
                                :items="categoryOptions"
                                label="Crime category(*)"
                                required
                                ></v-select>

                             <v-text-field
                            class="mr-8 ml-8 pt-1"
                            outlined
                            dense
                            v-model="counts"
                            label="Counts(*)"
                            type="number"
                            required
                            ></v-text-field>

                            <v-text-field
                            class="mr-8 ml-8 pt-1"
                            dense
                            v-model="offenseDate"
                            label="Offense Date(*)"
                            type="date"
                            required
                            outlined
                            ></v-text-field>

                            <v-textarea
                                class="mr-8 ml-8 pt-1"
                                dense
                                v-model="offenseDescription"
                                label="Crime Description(*)"
                                outlined
                             ></v-textarea>
                            
                             <v-text-field
                            class="mr-8 ml-8 pt-1"
                            dense
                            v-model="username"
                            
                            required
                            outlined
                            v-show="false"
                            ></v-text-field>

                            <v-text-field
                            class="mr-8 ml-8 pt-1"
                            dense
                            v-model="suspect._id"
                            required
                            outlined
                            v-show="false"
                            ></v-text-field>

                            <v-btn
                            color="primary"
                            class="mr-8 ml-8 pt-1 mb-4"
                            @click="addCrime()"
                            >
                            Save
                            </v-btn>

                            <v-btn
                            color="error"
                             class="mr-8 pt-1 mb-4"
                            @click="clearForm()"
                            >
                            Cancel
                            </v-btn>

                       </v-form>
                   </v-card>
               </v-col>
             </v-row>
       </div>
       </v-row>
  </v-container>
</template>

<script>
import axios  from 'axios'

export default {
    data(){
        return {
            suspect:{
                firstname: null,
                lastname: null,
                _id:null,
            },
                username:"",
                userId :"",

            categoryOptions: [
                "Theft",
                "Physical Assault",
                "Drug Dealing",
                "Damage of property",
                "Robbery",
                "Fraud",
                "Kidnapping",
                "Murder"
            ],

            category:"",
            counts:"",
            offenseDate:"",
            offenseDescription:"",

        }

    },
      methods: {
           addCrime(){
               console.log("The suspect id "+this.suspect._id)
               if(!this.category || !this.counts || !this.offenseDate || !this.offenseDescription ){
                      this.$swal("warning","Please fill in the required details", "warning")
               }
               else{
                axios
                 .post("http://localhost:3000/api/add_person_suspect/"+this.suspect._id+"/add_crime_details",{
                    category: this.category,
                    counts: this.counts,
                    offenseDate: this.offenseDate,
                    offenseDescription: this.offenseDescription,
                    officer: this.username
              }).then((response)=>{
                   if(response.status === 201){
                        this.$swal("Info","Crime details added", "success")
                   }
              })
           }
         },

         get_list_of_suspects_by_Id(id){
                        axios
                        .get("http://localhost:3000/api/read_one_person_suspect/"+id)
                        .then((response)=>{
                            this.suspect = response.data
                            console.log(this.suspect)
                        })  
                },

         setUserDetails(){
         const user = JSON.parse(sessionStorage.getItem("user"))
         this.username = user.name
         this.userId = user._id
         console.log(this.imagename)
         console.log(this.userId)
       },

    },
    mounted() {
      this.get_list_of_suspects_by_Id(this.$route.params.id)
      this.setUserDetails()
    }
}
</script>

<style lang="scss">

</style>