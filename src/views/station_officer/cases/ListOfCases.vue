<template>
     <v-card id="account-setting-card" flat>
           <v-tabs
      v-model="tab"
      show-arrows
    >
      <v-tab
        v-for="tab in tabs"
        :key="tab.icon"
      >
        <v-icon
          size="20"
          class="me-3"
        >
          {{ tab.icon }}
        </v-icon>
        <span>{{ tab.title }}</span>
      </v-tab>
    </v-tabs>

 <!-- tabs item -->
    <v-tabs-items v-model="tab">

       <v-tab-item>
          <ongoing-case-list> </ongoing-case-list>
       </v-tab-item>
       <v-tab-item>
           <concluded-case-list> </concluded-case-list>
       </v-tab-item>

    </v-tabs-items>

     </v-card>
</template>

<script>
import { mdiAccountOutline, mdiLockOpenOutline, mdiFolder, mdiFolderInformation} from '@mdi/js'
import OngoingCaseList from './OngoingCasesList.vue'
import ConcludedCaseList  from './ConcludedCaseList.vue'

export default {
    components: {
          OngoingCaseList,
          ConcludedCaseList
    },
    data(){
        return{
            tab : null,

      tabs : [
      { title: 'Ongoing Cases', icon: mdiFolderInformation },
      { title: 'Concluded Cases', icon: mdiFolder },
     
      ],

        }
    }
}
</script>