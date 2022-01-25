<template>
  <div class="main-header">
    <v-app-bar
      dark
      color="secondary"
      hide-on-scroll
      scroll-threshold="48"
      app>
      <v-container class="d-flex align-center">
        <v-toolbar-title>
          <router-link to="/">
          SuperWash
          </router-link>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon :to="{name: 'Login'}"><v-icon>mdi-account</v-icon></v-btn>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </v-container>

    </v-app-bar>
  </div>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
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