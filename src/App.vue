<template>
  <v-app :style="{
    background: $vuetify.theme.themes[theme].background
  }">
    <MainHeader v-if="headerType == 'main'"></MainHeader>
    <UserHeader v-else-if="headerType == 'user'"></UserHeader>

    <v-main>
      <router-view :key="$route.path" />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import MainHeader from './components/MainHeader.vue';
import UserHeader from './components/UserHeader.vue';

import userService, { User } from './services/user.service';

@Component({
  components: {
    MainHeader,
    UserHeader
  }
})
export default class App extends Vue {
  message = '';

  created() {
    this.$socket.connect('guest', 'guest', (frame) => {
        console.log("CONNECTED");

        this.$root.$emit('socketConnected', this.$socket);

    }, (err) => {
      console.log(err);
      console.log('STOMP error: ' + err);
    }, '/');
  }

  mounted(): void {
    const user = userService.user;

    if (user) {
      this.initializeUser(user);
    }
  }

  get theme() {
    return (this.$vuetify.theme.dark) ? 'dark' : 'light'
  }

  get headerType() {
    return this.$route.meta?.header || 'main';
  }

  initializeUser(user: User) {
    this.$vuetify.theme.dark = user.darkTheme;
  }
}
</script>

<style lang="scss">
.v-application {
  //min-height: 150vh;
}
</style>