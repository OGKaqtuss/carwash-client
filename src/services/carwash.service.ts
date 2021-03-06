import { ApiService, axiosInstance } from "./Api";

export enum WashStatusEnum {
    Available = 0,
    Running = 1,
    Stopped = 2,
    Error = 3
}

export interface ICarWash {
    id: string;
    name: string;
    city: string;
    zipCode: string;
    address: string;
    status: WashStatusEnum;
    price: number;
    endDate: number;
    startDate: number;
}

export interface ICarWashList {
    [key: number]: ICarWash;
}

class CarWashService extends ApiService {

    async getList(limit = 20, offset = 0): Promise<ICarWashList> {
        return this.axiosInstance.get(`CarWash/all?limit=${limit}&offset=${offset}`)
            .then(response => {
                return response?.data || [];
            })
            .catch(error => {
                console.log(error);
            });
    }

    async startCarWash(carWashId: string) {
        return this.axiosInstance.post(`CarWash/${carWashId}/start`)
            .then(response => {
                return response?.data || [];
            })
            .catch(error => {
                console.log(error);
            });
    }

    async getAdminList(limit = 20, offset = 0): Promise<ICarWashList> {
        return this.axiosInstance.get(`CarWash/admin/list?limit=${limit}&offset=${offset}`)
            .then(response => {
                return response?.data || [];
            })
            .catch(error => {
                console.log(error);
            });
    }

    async updateAdminStatus(carWashId: string, status: WashStatusEnum) {
        return this.axiosInstance.post(`CarWash/${carWashId}/admin/status/${status}`)
            .then(response => {
                return response?.data || [];
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export default new CarWashService(axiosInstance);