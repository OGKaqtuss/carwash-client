<template>
  <v-app>
    <MainHeader></MainHeader>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import MainHeader from './components/MainHeader.vue';

@Component({
  components: {
    MainHeader
  }
})
export default class App extends Vue {
  message = '';

  mounted(): void {
    this.message = 'Hello World!';
  }

}
</script>

<style lang="scss">
  body {
    min-height: 150vh;
  }
</style>