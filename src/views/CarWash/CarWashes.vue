<template>
    <v-container>
      <mobile-scroller-row>
        <template slot="header">Find vaskehal nær dig</template>

          <template v-if="carWashes.length">
            <v-col v-for="carWash in carWashes" :key="carWash.id" cols="11" sm="6" md="4">
              <v-card>
                <v-img
                  height="154"
                  src="https://washworld.dk/_next/image?url=https%3A%2F%2Fwashworld-wordpress-production.storage.googleapis.com%2Fwp-content%2Fuploads%2F2021%2F11%2F28140221%2F2-vaskehaller.jpg.png&w=3840&q=75"
                ></v-img>

                <v-card-title>{{ carWash.name }}</v-card-title>

                <v-card-text>
                  <div>{{ carWash.address }}</div>

                  <div>{{ carWash.time }}</div>
                </v-card-text>

                <v-card-actions v-if="isLoggedIn">
                  <v-btn :loading="carWash.loading" v-if="carWash.status == washAvailable" color="primary" @click="start(carWash.id)">Start</v-btn>
                  <v-btn :loading="carWash.loading" v-else color="error">Stopped</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </template>

          <template v-else>
            <v-col  v-for="i in 3" :key="i" cols="11" sm="6" md="4">
              <v-skeleton-loader type="card, text"></v-skeleton-loader>
            </v-col>
          </template>
      </mobile-scroller-row>

    </v-container>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import Watch from 'vue-property-decorator';

import MobileScrollerRow from '@/components/Utils/MobileScrollerRow.vue';
import carwashService, { WashStatus } from '@/services/carwash.service';

import userService from '@/services/user.service';

@Component({
    components: {
        MobileScrollerRow
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
          }

          const interval = setInterval(() => {
            carWash.time = this.getCountdown(data.EndDate);

            if (carWash.time <= 0) {
              clearInterval(interval);
            }
          }, 500);
        });
      });

      this.loadCarWashList();
  }

  @Watch('timerCount')
  countDownTimer() {

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

  start(id) {
    carwashService.startCarWash(id).then((res) => {
      this.findCarWash(id).status = WashStatus.Running;
    });
  }
  
  canStart(id) {
    return this.findCarWash(id).status === WashStatus.Available;
  }

  // Function to count down to date
  getCountdown(milliseconds) {
    const date = new Date(milliseconds);

    const now = new Date();
    const diff = date.getTime() - now.getTime();

    if (diff < 0) {
      return '0';
    }

    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return seconds;
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