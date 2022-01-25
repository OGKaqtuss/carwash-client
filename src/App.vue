<template>
  <v-app :style="{
    background: $vuetify.theme.themes[theme].background
  }">
    <MainHeader v-if="headerType == 'main'"></MainHeader>
    <UserHeader v-else-if="headerType == 'user'"></UserHeader>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import MainHeader from './components/MainHeader.vue';
import UserHeader from './components/UserHeader.vue';

@Component({
  components: {
    MainHeader,
    UserHeader
  }
})
export default class App extends Vue {
  message = '';

  mounted(): void {
    this.message = 'Hello World!';
  }

  get theme() {
    return (this.$vuetify.theme.dark) ? 'dark' : 'light'
  }

  get headerType() {
    return this.$route.meta?.header || 'main';
  }
}
</script>

<style lang="scss">
.v-application {
  //min-height: 150vh;
}
</style>