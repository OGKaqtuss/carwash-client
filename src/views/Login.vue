<template>
    <div class="login-page">
        <v-container fluid>
            <v-row>
                <v-col class="mx-auto" cols="12" sm="6">
                    <v-card>
                        <v-form v-model="valid" @submit.prevent="login()" lazy-validation>

                            <v-card-title class="headline">
                                <span>Login</span>
                            </v-card-title>
                            <v-card-text>
                                <v-text-field
                                v-model="email"
                                :rules="emailRules"
                                label="E-mail"
                                required
                                ></v-text-field>

                                <v-text-field
                                    v-model="password"
                                    label="Password"
                                    type="password"
                                    required
                                ></v-text-field>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" type="submit" :loading="isLoading" :disabled="!valid">Login</v-btn>
                            </v-card-actions>

                        </v-form>
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
    isLoading = false;
    valid = true;
    emailRules = [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ];
    nameRules = [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ];

    login() {
        this.isLoading = true;

        authService.login({
            email: this.email,
            password: this.password,
        }).then((res) => {
            this.$router.push({ name: 'UserProfile' });
        }).catch((err) => {
            console.log(err);
            console.log(err?.response?.data);
        }).finally(() => {
            this.isLoading = false;
        });
    }
}
</script>

<style>
</style>