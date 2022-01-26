<template>
    <div class="user-profile__overview">
        <v-row>
            <v-col md="6">
                <h2 v-if="user.isAdmin">Admin</h2>

                <WashHistory v-else></WashHistory>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

import WashHistory from '@/components/User/WashHistory.vue';
import userService from '@/services/user.service';

@Component({
    components: {
        WashHistory
    }
})
export default class UserOverview extends Vue {
    get user() {
        return userService.user;
    }
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