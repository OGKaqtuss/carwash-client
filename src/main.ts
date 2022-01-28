import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import './plugins/toast';

import Stomp from 'webstomp-client';

import './styles/main.scss';

Vue.config.productionTip = false

const sock = new WebSocket('ws://localhost:8080/ws');

const client = Stomp.over(sock);

client.debug = () => {const t = 'hello'};

Vue.$socket = client;
Vue.prototype.$socket = client;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
