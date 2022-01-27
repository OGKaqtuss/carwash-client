<template>
    <div class="mobile-scroller-row">
        <h3 class="mobile-scroller-row__header">
            <slot name="header">Header</slot>
        </h3>
        <v-row class="mobile-scroller-row__content">
            <slot></slot>
        </v-row>
    </div>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class MobileScrollerRow extends Vue {

}
</script>

<style lang="scss">
@import "~/src/styles/abstract/mixins.scss";

div.mobile-scroller-row {
    &__content {
        @include media-breakpoint-only(xs) {
            flex-wrap: nowrap;
            overflow-x: auto;
        }
    }
}
</style>