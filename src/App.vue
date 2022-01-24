<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
    <h1>{{ message }}</h1>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  name: 'App'
})
export default class App extends Vue {
  message = '';

  mounted() {
    this.message = 'Hello World!';
  }

}
</script>
