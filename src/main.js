/*
 =========================================================
 * Vue Black Dashboard - v1.1.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/black-dashboard
 * Copyright 2018 Creative Tim (http://www.creative-tim.com)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */
import Vue from "vue";
import VueRouter from "vue-router";
import RouterPrefetch from 'vue-router-prefetch'
import App from "./App";
// TIP: change to import router from "./router/starterRouter"; to start with a clean layout
import router from "./router/index";

import BlackDashboard from "./plugins/blackDashboard";
import i18n from "./i18n";
import './registerServiceWorker';
import Calendar from 'v-calendar/lib/components/calendar.umd';
import DatePicker from 'vuejs-datepicker';
import VTooltip from 'v-tooltip';
import excel from 'vue-excel-export';
import WebRTC from 'vue-webrtc';
import * as io from 'socket.io-client';

Vue.use(BlackDashboard);
Vue.use(VueRouter);
Vue.use(DatePicker);
Vue.use(VTooltip);
Vue.use(excel);
Vue.use(RouterPrefetch);
Vue.component('calendar', Calendar);
Vue.use(WebRTC);



/* eslint-disable no-new */
new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount("#app");
