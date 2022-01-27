<template>
    <div class="user-profile__settings">
        <v-form @submit.prevent="onSave">
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
                                v-model="darkTheme"
                                hint="This toggles the global state of the Vuetify theme"
                                inset
                                label="Dark theme"
                                persistent-hint
                            ></v-switch>
                        </v-card-text>
                    </v-sheet>
                </v-col>
            </v-row>

            <v-layout class="pt-4" justify-center>
                <v-btn color="primary" type="submit">Save</v-btn>
            </v-layout>
        </v-form>
    </div>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

import userService, { User } from '@/services/user.service';

Component.registerHooks([
    'beforeRouteLeave'
])

@Component
export default class UserSettings extends Vue {
    subscribed = false;

    beforeRouteLeave(to, from, next) {
        this.$vuetify.theme.dark = this.user.darkTheme;

        next();
    }

    mounted() {
        this.subscribed = this.user.isSubscribed;
        this.darkTheme = this.user.darkTheme;
    }

    set darkTheme(value) {
        this.$vuetify.theme.dark = value;
    }

    get darkTheme() {
        return this.$vuetify.theme.dark;
    }

    get user() {
        console.log(userService.user);

        return userService.user;
    }

    onSave() {
        this.user.darkTheme = this.darkTheme;
        this.user.isSubscribed = this.subscribed;

        userService.update(this.user).then(() => {
            this.$toast.success('Settings saved');
        });
    }
}
</script>

<style>
</style>