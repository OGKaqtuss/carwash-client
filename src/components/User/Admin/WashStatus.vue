<template>
  <v-sheet class="wash-status" elevation="3">
    <v-card-title>Statuses</v-card-title>

    <v-data-table 
    :headers="headers"
    :items="items"
    :loading="isLoading">
        <template v-slot:item.action="{ item }">
            <v-btn 
                :disabled="item.action.disabled" 
                @click="updateStatus(item.id, item.action.status)" 
                :color="item.action.color">
                    {{ item.action.value }}
            </v-btn>
        </template>

    </v-data-table>
  </v-sheet>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

import carwashService, { WashStatusEnum } from '@/services/carwash.service';

@Component
export default class WashStatus extends Vue {
    isLoading = true;
    subscription = null;
    carWashStatuses = [];
    headers = [
        {
            text: 'Car Wash',
            align: 'start',
            sortable: false,
            value: 'name',
        },
        {
            text: 'Status',
            align: 'start',
            sortable: false,
            value: 'status',
        },
        {
            text: 'Action',
            align: 'end',
            sortable: false,
            value: 'action',
        },
    ]
    created() {
        if (this.$socket.connected) {
            this.subscribeEvents();
        } else {
            this.$root.$on('socketConnected', () => {
                this.subscribeEvents();
            });
        }

        this.fetchList();
    }

    destroyed() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    subscribeEvents() {
        this.subscription = this.$socket.subscribe('/queue/admin', (message) => {
            const data = JSON.parse(message.body);

            const carWashStatus = this.findCarWashStatus(data.CarwashId);

            if (carWashStatus) {
                if (data.Status === WashStatusEnum.Available) {
                    console.log("REMOVE FINISHED");
                    this.carWashStatuses.splice(this.findCarWashStatusIndex(data.CarwashId), 1);
                } else {
                    console.log("UPDATE STATUS");
                    carWashStatus.status = data.Status;
                    carWashStatus.endDate = data.EndDate;
                    carWashStatus.startDate = data.StartDate;
                }
            } else {
                console.log("NEW STATUS");

                this.carWashStatuses.push({
                    id: data.CarwashId,
                    name: data.Name,
                    status: data.Status,
                    endDate: data.EndDate,
                    startDate: data.StartDate,
                });
            }
        });
    }

    findCarWashStatus(id) {
        return this.carWashStatuses.find(carWashStatus => carWashStatus.id === id);
    }

    findCarWashStatusIndex(id) {
        return this.carWashStatuses.findIndex(carWashStatus => carWashStatus.id === id);
    }

    fetchList() {
        carwashService.getAdminList().then(result => {
            this.carWashStatuses = result;

            this.isLoading = false;
        });
    }

    updateStatus(id, status) {
        this.isLoading = true;
        carwashService.updateAdminStatus(id, status).then(result => {
            this.isLoading = false;
        });
    }

    get items() {
        const items = [];

        this.carWashStatuses.forEach((item) => {
            items.push({
                id: item.id,
                name: item.name,
                status: WashStatusEnum[item.status],
                action: this.getAction(item.status)
            });
        });

        return items;
    }

    getAction(status) {
        switch (status) {
            case WashStatusEnum.Running:
                return {
                    value: 'stop',
                    color: 'error',
                    status: WashStatusEnum.Stopped
                }
            case WashStatusEnum.Stopped:
                return {
                    value: 'available',
                    color: 'primary',
                    status: WashStatusEnum.Available
                };
            case WashStatusEnum.Error:
                return {
                    value: 'error',
                    color: 'error',
                    status: WashStatusEnum.Error,
                    disabled: true
                }
        }
    }
}
</script>

<style>

</style>