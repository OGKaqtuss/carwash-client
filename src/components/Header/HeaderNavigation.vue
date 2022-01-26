<template>
    <v-layout align-center class="header-navigation">
        <v-container fluid class="d-none d-sm-flex align-center">
            <v-tabs class="header-navigation__tabs" color="white">
                <v-tab v-for="item in items" :key="item.route">
                    <router-link :to="{ name: item.route }" tag="span">{{ item.name }}</router-link>
                </v-tab>
            </v-tabs>
        </v-container>

        <v-spacer></v-spacer>

        <v-btn icon link :to="{ name: 'Login' }">
            <v-icon>mdi-account</v-icon>
        </v-btn>

        <v-app-bar-nav-icon class="d-sm-none" @click="drawer = true"></v-app-bar-nav-icon>

        <v-theme-provider root>
            <v-navigation-drawer v-model="drawer" absolute temporary app>
                <v-list nav dense>
                    <v-list-item-group>
                        <v-list-item v-for="item in items" :key="item.route">
                            <v-list-item-content>
                                <router-link :to="{ name: item.route }">{{ item.name }}</router-link>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-navigation-drawer>
        </v-theme-provider>
    </v-layout>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
    props: {
        items: {
            type: Array,
            default: () => [
                {
                    name: 'Home',
                    route: 'Home',
                }
            ]
        }
    }
})
export default class HeaderNavigation extends Vue {
    drawer = false;
}
</script>

<style lang="scss">
div.header-navigation {
    &__tabs {
        &.v-tabs {
            .v-tabs-bar {
                background-color: inherit;
            }
        }
    }
}
</style>
