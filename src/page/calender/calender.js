import Vue from "vue";
import "@/utils/common";
import App from "./calender.vue";

import MuseUI from 'muse-ui';
import Toast from 'muse-ui-toast';
import axios from 'axios';
import 'muse-ui/dist/muse-ui.css';
import '@/assets/font/material-icons.css';

Vue.use(MuseUI);
Vue.use(Toast);
Vue.prototype.$axios = axios;
Vue.prototype.$serverUrl = 'http://www.aoie.ren:7379';

new Vue({
  el: "#app",
  render: h => h(App)
});
