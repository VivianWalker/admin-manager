import Vue from 'vue';
import App from './App.vue';
import store from './vuex/store';
import router from './router';
import { sync } from 'vuex-router-sync';
import RPC from 'vue-hive-rpc';

sync(store, router);

//Vue.use(RPC, {server: "http://m.fengchaohuzhu.com/api/"});
Vue.use(RPC, {server: "http://dev.fengchaohuzhu.com/admin-api/"});
//Vue.use(RPC, {server: "http://192.168.1.120:8000/"});

new Vue(Vue.util.extend({
  router,
  store
}, App)).$mount('app');
