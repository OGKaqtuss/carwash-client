<template>
    <div class="user-profile__settings">
        <v-row>
            <v-col cols="12">
                <v-sheet rounded elevation="3">
                    <v-card-title>Account</v-card-title>
                    <v-divider></v-divider>

                    <v-card-text>
                        <v-switch v-model="subscribed" inset label="Subscribed" persistent-hint></v-switch>
                    </v-card-text>
                </v-sheet>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12">
                <v-sheet rounded elevation="3">
                    <v-card-title>General</v-card-title>
                    <v-divider></v-divider>

                    <v-card-text>
                        <v-switch
                            v-model="$vuetify.theme.dark"
                            hint="This toggles the global state of the Vuetify theme"
                            inset
                            label="Dark theme"
                            persistent-hint
                        ></v-switch>
                    </v-card-text>
                </v-sheet>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class UserSettings extends Vue {
    subscribed = false;
}
</script>

<style>
</style>