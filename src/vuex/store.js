import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';

import cookie from './modules/cookie';
import plan from './modules/plan';
import group from './modules/group';
import mutual_aid from './modules/mutual_aid';
import order from './modules/order';
import vehicle from './modules/vehicle';
import wallet from './modules/wallet';
import profile from './modules/profile';
import quotation from './modules/quotation';
import megatron from './modules/megatron';

Vue.use(Vuex);

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    cookie,
    plan,
    group,
    mutual_aid,
    order,
    vehicle,
    wallet,
    profile,
    quotation,
    megatron
  
//---------------

//-------------------

  },
  plugins: [],
});
 
