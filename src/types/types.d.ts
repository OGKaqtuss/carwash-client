import Vue from 'vue';
import Api from 'vue-toast-notification/src/js/api';

import { Client } from 'webstomp-client';

interface IToastApi {
    open(options: Object): void;
    success(message: string, options?: Object): void;
    error(message: string, options?: Object): void;
    info(message: string, options?: Object): void;
    warning(message: string, options?: Object): void;
    default(message: string, options?: Object): void;
    clear(): void;
}

declare module 'vue/types/vue' {
    export interface Vue {
      $toast: IToastApi;
      $socket: Client;
    }

    export interface VueConstructor {
        $toast: IToastApi;
        $socket: Client;
    }
}

declare module 'sockjs-client' {
    import SockJS from 'sockjs-client';

    export default SockJS;
};