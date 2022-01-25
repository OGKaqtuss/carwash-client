<template>
    <div class="user-header">
        <v-app-bar dark color="primary" hide-on-scroll scroll-threshold="48" app>
            <v-container fluid class="d-flex align-center">
                <header-navigation></header-navigation>
            </v-container>
        </v-app-bar>
    </div>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

import HeaderNavigation from './Header/HeaderNavigation.vue';

@Component({
    components: {
        HeaderNavigation
    }
})
export default class UserHeader extends Vue {

}
</script>

<style>
</style>