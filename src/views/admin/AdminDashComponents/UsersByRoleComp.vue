<template>
    
</template>

<script>
import config from '@/config'
import axios from 'axios'

export default {
    data(){
        return{
             userList: ""
        }
    },
    methods: {
      user_count_list_based_on_role(){
           axios
             .get(`${config.Base_URL}api/read_users_count_by_userrole`)
             .then((response)=>{
                 if(response.status === 200){
                     this.userList = response.data
                     console.log(this.userList)
                 }
             })
      }
    },
    mounted(){
          this.user_count_list_based_on_role()
    }
}
</script>