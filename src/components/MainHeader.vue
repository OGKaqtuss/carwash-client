<template>
  <div class="main-header">
    <v-app-bar dark color="primary" hide-on-scroll scroll-threshold="48" app>
      <v-container class="d-flex align-center">
        <v-toolbar-title>
          <router-link class="d-flex align-center" tag="div" to="/">
            <v-img max-width="48px" :src="require('@/assets/logo.png')"></v-img>

            <span class="pl-4">SuperWash</span>
          </router-link>
        </v-toolbar-title>

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
export default class MainHeader extends Vue {

}
</script>

<style lang="scss">
.main-header {
  .v-toolbar {
    &__content {
      padding: 0;
    }
  }
}
</style>