<template>
    <div class="user-profile__overview">
        <v-row>
            <v-col md="6">
                <v-sheet elevation="3" rounded class="user-profile__overview-history">
                    <v-card-title>History</v-card-title>

                    <v-card-text>
                        <v-timeline class="user-profile__overview-history-timeline" align-top dense>
                            <v-timeline-item small v-for="i in 10" :key="i">
                                <v-layout justify-space-between align-center>
                                    <h4 class="font-weight-semibold">Vaskning</h4>
                                    <small>Mandag</small>
                                </v-layout>

                                <p class="mb-0">Betalt gennem medlemsskab</p>
                                <router-link to="/">Aalborg, Gug</router-link>
                            </v-timeline-item>
                        </v-timeline>
                    </v-card-text>
                </v-sheet>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class UserOverview extends Vue {

}
</script>

<style lang="scss">
.user-profile__overview {
    .user-profile__overview {
        &-history {
            &-timeline {
                padding-top: 0;

                &::before {
                    right: auto !important;
                    left: 11px !important;
                }

                .v-timeline-item {
                    justify-content: flex-end;

                    &__body {
                        max-width: unset;
                    }

                    &__divider {
                        min-width: unset;
                        align-items: flex-start;
                        margin-right: 1rem;
                    }

                    &:last-of-type {
                        padding-bottom: 0;
                    }
                }
            }
        }
    }
}
</style>