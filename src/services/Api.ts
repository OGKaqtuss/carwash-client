
import axios, { AxiosInstance } from 'axios';

import Vue from 'vue';

import tokenService from './token.service';

export const axiosInstance = axios.create({
    baseURL: '/api/v1/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

axiosInstance.interceptors.request.use((config) => {
    const token = tokenService.getLocalAccessToken();
    if (token) {
        config.headers = Object.assign({
            Authorization: `Bearer ${token}`
        }, config.headers || {})
    }
    return config;
});

axiosInstance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    Vue.$toast.error(error.toString());
});

export abstract class ApiService {
    axiosInstance: AxiosInstance;

    constructor(axiosInstance: AxiosInstance) {
        this.axiosInstance = axiosInstance;
    }
}

