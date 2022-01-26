
import axios, { AxiosInstance } from 'axios';

import tokenService from './token.service';

export const axiosInstance = axios.create({
    baseURL: '/api/v1/',
    timeout: 1000,
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

export abstract class ApiService {
    axiosInstance: AxiosInstance;

    constructor(axiosInstance: AxiosInstance) {
        this.axiosInstance = axiosInstance;
    }
}

