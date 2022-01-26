import { ILocalUserData } from "./user.service";

export class TokenService {
    getLocalAccessToken(): string | null {
        const user = this.getUser();

        if (user === null) {
            return null;
        }

        return user.accessToken;
    }

    getUser(): ILocalUserData | null {
        const data = localStorage.getItem("user");

        if (data === null) {
            return null;
        }

        return JSON.parse(data);
    }

    setUser(user: ILocalUserData) {
        localStorage.setItem("user", JSON.stringify(user));
    }

    removeUser() {
        localStorage.removeItem("user");
    }
}

export default new TokenService();