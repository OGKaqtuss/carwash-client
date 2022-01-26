import { AxiosInstance } from "axios";
import { ApiService, axiosInstance } from "./Api";

import tokenService from "./token.service";

export interface ILocalUserData {
    accessToken: string;
    darkTheme: boolean;
    admin: boolean;
    email: string;
    firstname: string;
    lastname: string;
    isSubscribed: boolean;
}

export class User implements ILocalUserData {
    accessToken: string;
    darkTheme: boolean;
    admin: boolean;
    email: string;
    firstname: string;
    lastname: string;
    isSubscribed: boolean;

    constructor(data: ILocalUserData) {
        this.accessToken = data.accessToken;
        this.darkTheme = data.darkTheme;
        this.admin = data.admin;
        this.email = data.email;
        this.firstname = data.firstname;
        this.lastname = data.lastname;
        this.isSubscribed = data.isSubscribed;
    }

    get fullName() {
        return this.firstname + ' ' + this.lastname;
    }

    get initials() {
        return this.firstname.charAt(0).toUpperCase() + this.lastname.charAt(0).toUpperCase();
    }

    get isAdmin() {
        return this.admin;
    }
}

class UserService extends ApiService {

    constructor(axiosInstance: AxiosInstance) {
        super(axiosInstance);
    }

    get user(): User | null {
        const user = tokenService.getUser();

        if (user === null) {
            return null;
        }

        return new User(user);
    }

    update(data: ILocalUserData) {
        return this.axiosInstance.put('User/settings/update', data)
            .then((result) => {
                console.log(result);

                if (result.data.accessToken) {
                    console.log("HELLO");
                    tokenService.setUser(result.data);
                }

                return result.data;
            });
    }
}

export default new UserService(axiosInstance);