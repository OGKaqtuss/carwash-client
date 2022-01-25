<template>
  <v-container>
    <mobile-scroller-row></mobile-scroller-row>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  import MobileScrollerRow from './Utils/MobileScrollerRow.vue';

  @Component({
    components: {
      MobileScrollerRow
    }
  })
  export default class HelloWorld extends Vue {

  }
</script>
