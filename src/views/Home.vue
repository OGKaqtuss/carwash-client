<template>
  <div class="home">
    <v-container>
      <mobile-scroller-row>
        <template slot="header">Find vaskehal nær dig</template>

        <v-col v-for="i in 5" :key="i" cols="11" sm="6" md="4">
          <v-card>
            <v-img
              height="154"
              src="https://washworld.dk/_next/image?url=https%3A%2F%2Fwashworld-wordpress-production.storage.googleapis.com%2Fwp-content%2Fuploads%2F2021%2F11%2F28140221%2F2-vaskehaller.jpg.png&w=3840&q=75"
            ></v-img>

            <v-card-title>Aalborg</v-card-title>

            <v-card-text>
              <div>Otto Mønsteds Vej 5, 9200 Aalborg</div>
            </v-card-text>

            <v-card-actions>
              <v-btn color="deep-purple lighten-2" text @click="reserve">Reserve</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </mobile-scroller-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import MobileScrollerRow from '../components/Utils/MobileScrollerRow.vue';

@Component({
  components: {
    MobileScrollerRow
  }
})
export default class Home extends Vue {


}
</script>
