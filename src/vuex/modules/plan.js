import * as types from '../mutation-types';

// initial state
const state = {
  availables: [],
  getAvailablesStatus:null,
  joined: [],
  getJoinedStatus:null,
  plan: null,
  getPlanApiStatus: null
};

// mutations
const mutations = {
  // [types.RECEIVE_AVAILABLE_PLANS] (state, { plans }) {
  //   state.availables = plans;
  // },
  [types.AVAILABLE_PLANS_REQUEST] (state) {
    state.getAvailablesStatus = 'loading';
  },
  [types.AVAILABLE_PLANS_SUCCESS] (state, { plan }) {
    state.availables = plan;
    state.getAvailablesStatus = 'successful';
  },
  [types.AVAILABLE_PLANS_FAILURE] (state) {
    state.getAvailablesStatus = 'failed';
  },


  // [types.RECEIVE_JOINED_PLANS] (state, { plans }) {
  //   state.joined = plans;
  // },
  [types.JOINED_PLANS_REQUEST] (state) {
    state.getJoinedStatus = 'loading';
  },
  [types.JOINED_PLANS_SUCCESS] (state, { plan }) {
    state.joined = plan;
    state.getJoinedStatus = 'successful';
  },
  [types.JOINED_PLANS_FAILURE] (state) {
    state.getJoinedStatus = 'failed';
  },

  [types.GET_PLAN_REQUEST] (state) {
    state.getPlanApiStatus = 'loading';
  },
  [types.GET_PLAN_SUCCESS] (state, { plan }) {
    state.plan = plan;
    state.getPlanApiStatus = 'successful';
  },
  [types.GET_PLAN_FAILURE] (state, { qid } ) {
    state.getPlanApiStatus = 'failed';
  }
};

export default {
  state,
  mutations
};
