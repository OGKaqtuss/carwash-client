<template>
    <div class="mobile-scroller-row">
        <h3 class="mobile-scroller-row__header">Hello</h3>
        <v-row class="mobile-scroller-row__content">
            <slot>
                <v-col v-for="i in 5" :key="i" cols="5" sm="6" md="4" lg="3">  
                    <v-card color="primary" class="text-center">
                        <v-card-title class="justify-center">
                            {{i}}
                        </v-card-title>
                        <v-card-subtitle>
                            demo
                        </v-card-subtitle>
                    </v-card>
                </v-col>
            </slot>
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
    @import 'src/assets/scss/abstract/mixins.scss';

    div.mobile-scroller-row {
        &__content {
            @include media-breakpoint-only(xs) {
                flex-wrap: nowrap;
                overflow-x: auto;
            }
        }
    }
</style>