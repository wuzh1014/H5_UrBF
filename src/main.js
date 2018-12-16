// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
// import hotfix from 'h5plus-hotfix';
import "./utils/common";
import App from "./App";

const appId = "com.femirror.mogoh5";


import MuseUI from 'muse-ui';
import Toast from 'muse-ui-toast';
import axios from 'axios';
import 'muse-ui/dist/muse-ui.css';
import './assets/font/material-icons.css';

Vue.use(MuseUI);
Vue.use(Toast);
Vue.prototype.$axios = axios;
Vue.prototype.$serverUrl = 'http://www.aoie.ren:7379';

Vue.config.productionTip = false;
new Vue({
  el: "#app",
  components: {App},
  template: "<App/>"
});
