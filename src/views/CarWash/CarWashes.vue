<template>
  <v-container>
    <mobile-scroller-row>
      <template slot="header">Find vaskehal nær dig</template>

      <template v-if="carWashes.length">
        <v-col v-for="carWash in carWashes" :key="carWash.id" cols="11" sm="6" md="4">
          <CarWashCard :carWash="carWash" :ref="'car-wash' + carWash.id"></CarWashCard>
        </v-col>
      </template>

      <template v-else>
        <v-col v-for="i in 3" :key="i" cols="11" sm="6" md="4">
          <v-skeleton-loader type="card, text"></v-skeleton-loader>
        </v-col>
      </template>
    </mobile-scroller-row>
  </v-container>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

import MobileScrollerRow from '@/components/Utils/MobileScrollerRow.vue';
import carwashService, { WashStatus } from '@/services/carwash.service';

import userService from '@/services/user.service';
import CarWashCard from '@/components/CarWashCard.vue';

@Component({
  components: {
    MobileScrollerRow,
    CarWashCard
  }
})
export default class CarWashes extends Vue {
  carWashes = [];

  mounted() {
    this.$root.$on('socketConnected', (client) => {

      client.subscribe('/queue/testqueue', (message) => {
        const data = JSON.parse(message.body);

        const carWash = this.findCarWash(data.CarwashId);

        if (carWash) {
          carWash.status = data.Status;
          carWash.endDate = data.EndDate;
        }
      });
    });

    this.loadCarWashList();
  }

  // Find carwash item by id
  findCarWash(id) {
    return this.carWashes.find(carWash => carWash.id === id);
  }

  loadCarWashList() {
    carwashService.getList().then((response) => {
      this.carWashes = response;
    });
  }

  get washAvailable() {
    return WashStatus.Available;
  }

  get user() {
    return userService.user;
  }

  get isLoggedIn() {
    return this.user !== null;
  }
}
</script>

<style>
</style>