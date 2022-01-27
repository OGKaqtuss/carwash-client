import { AxiosInstance } from "axios";
import { ApiService, axiosInstance } from "./Api";
import tokenService from "./token.service";

interface IUserLoginData {
    email: string,
    password: string
}

interface IUserRegisterData {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

class AuthService extends ApiService {
    constructor(axiosInstance: AxiosInstance) {
        super(axiosInstance);
    }

    login(userData: IUserLoginData) {
        return this.axiosInstance.post('Auth/login', userData)
            .then((result) => {
                if (result.data.accessToken) {
                    tokenService.setUser(result.data);
                }

                return result.data;
            });
    }

    logout() {
        tokenService.removeUser();
    }

    register(user: IUserRegisterData) {
        return this.axiosInstance.post('Auth/register', user)
            .then((result) => {
                if (result.data.accessToken) {
                    tokenService.setUser(result.data);
                }

                return result.data;
            });
    }
}

export default new AuthService(axiosInstance);