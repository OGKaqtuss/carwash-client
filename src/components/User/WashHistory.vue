<template>
    <v-sheet elevation="3" rounded class="user-profile__overview-history">
        <v-card-title>History</v-card-title>

        <v-card-text>
            <v-timeline class="user-profile__overview-history-timeline" align-top dense>
                <v-timeline-item small v-for="i in 10" :key="i">
                    <v-layout justify-space-between align-center>
                        <h4 class="font-weight-semibold">Vaskning</h4>
                        <small>Mandag</small>
                    </v-layout>

                    <p class="mb-0">Betalt gennem medlemsskab</p>
                    <router-link to="/">Aalborg, Gug</router-link>
                </v-timeline-item>
            </v-timeline>
        </v-card-text>
    </v-sheet>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class WashHistory extends Vue {

}
</script>

<style>
</style>