<template>
    <div class="login-page">
        <v-container fluid>
            <v-row>
                <v-col class="mx-auto" cols="12" sm="6">
                    <v-card>
                        <v-card-title class="headline">
                            <span>Login</span>
                        </v-card-title>
                        <v-card-text>
                            <v-text-field
                                v-model="email"
                                label="Email"
                                type="email"
                                required
                                autofocus
                                :error-messages="errorMessages.email"
                            ></v-text-field>
                            <v-text-field
                                v-model="password"
                                label="Password"
                                type="password"
                                required
                                :error-messages="errorMessages.password"
                            ></v-text-field>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" @click="login" :disabled="!isValid">Login</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

import authService from '@/services/auth.service';

@Component
export default class LoginPage extends Vue {
    email = '';
    password = '';

    get isValid() {
        return this.email && this.password;
    }

    get errorMessages() {
        return {
            email: this.email ? '' : 'Email is required',
            password: this.password ? '' : 'Password is required',
        };
    }

    login() {
        authService.login({
            email: this.email,
            password: this.password,
        }).then((res) => {
            console.log(res);
            this.$router.push({ name: 'UserProfile' });
        }).catch((err) => {
            console.log(err.response.data);
        });
    }
}
</script>

<style>
</style>