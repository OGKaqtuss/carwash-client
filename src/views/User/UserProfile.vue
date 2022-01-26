<template>
    <div class="user-profile">
        <v-navigation-drawer mobile-breakpoint="xs" class="elevation-5 user-profile__nav" app>
            <v-layout class="accent align-center pl-5" :style="navigationDrawerHeaderStyle">
                <v-img max-width="48px" :src="require('@/assets/logo.png')"></v-img>

                <h2 class="pl-4 white--text">SuperWash</h2>
            </v-layout>

            <v-divider></v-divider>

            <v-list class="user-profile__nav-items">
                <v-list-item>
                    <v-list-item-icon>
                        <v-avatar color="primary" size="48">
                            <span class="white--text text-h5">{{ user.initials }}</span>
                        </v-avatar>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ user.fullName }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item link :to="{ name: 'UserOverview' }">
                    <v-list-item-icon>
                        <v-icon>mdi-account</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>Oversigt</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item link :to="{ name: 'UserSettings' }">
                    <v-list-item-icon>
                        <v-icon>mdi-cog</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>Settings</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-divider></v-divider>

                <v-list-item>
                    <v-list-item-icon>
                        <v-icon>mdi-logout</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>Log out</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-container fluid class="pa-4 pa-md-7">
            <router-view />
        </v-container>
    </div>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

import userService from '@/services/user.service';

@Component
export default class UserProfile extends Vue {
    get navigationDrawerHeaderStyle() {
        return {
            'height': `${this.$vuetify.application.top}px`,
        }
    }

    get user() {
        return userService.user;
    }
}
</script>

<style lang="scss">
.user-profile {
    &__nav-items {
        .v-list-item {
            &--active {
                &::after {
                    position: absolute;
                    z-index: 1;
                    left: 0;
                    height: 100%;
                    border: 2px solid var(--v-primary-base);
                }
            }
        }
    }
}
</style>

