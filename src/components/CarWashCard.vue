<template>
    <div class="car-wash-card">
        <v-card>
            <v-img
                height="154"
                src="https://washworld.dk/_next/image?url=https%3A%2F%2Fwashworld-wordpress-production.storage.googleapis.com%2Fwp-content%2Fuploads%2F2021%2F11%2F28140221%2F2-vaskehaller.jpg.png&w=3840&q=75"
            ></v-img>

            <v-card-title>{{ carWash.name }}</v-card-title>

            <v-card-text>
                <div>{{ carWash.address }}</div>

                <div>{{ timerCount }}</div>
            </v-card-text>

            <v-card-actions v-if="isLoggedIn">
                <v-btn :loading="isLoading" v-if="canStart" color="primary" @click="start()">Start</v-btn>
                <v-btn :loading="isLoading" v-else color="error">Stopped</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
import carwashService, { WashStatus } from '@/services/carwash.service';
import Vue from 'vue';
import Component from 'vue-class-component';
import Watch from 'vue-property-decorator';

import userService from '@/services/user.service';

@Component({
    props: {
        carWash: {
            type: Object,
            required: true
        },
    },
})
export default class CarWashCard extends Vue {
    timerCount = 0;
    isLoading = false;

    @Watch('timerCount', {
        immediate: true
    })
    countDownTimer() {
        if (this.timerCount > 0) {
            setTimeout(() => {
                this.timerCount--;
            }, 1000);
        }
    }

    @Watch('carWash.endDate')
    updateTimer() {
        this.timerCount = this.getCountdown(this.carWash.endDate);
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

    start() {
        this.isLoading = true;

        carwashService.startCarWash(this.carWash.id).then((res) => {
            this.carWash.status = WashStatus.Running;

            this.isLoading = false;
        });
    }

    get canStart() {
        return this.carWash.status === WashStatus.Available;
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