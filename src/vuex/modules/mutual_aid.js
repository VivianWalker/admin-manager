import * as types from '../mutation-types';

// initial state
const state = {
  applyfor: [],
  applyforStatus:null,
  getmutual:[],
  getmutualState:null,
  getmutuals:[],
  getmutualsStatus:null,
};

// mutations
const mutations = {
  // [types.RECEIVE_APPLYFOR_AID] (state, { mutual_aid }) {
  //   state.applyfor = mutual_aid;
  // },
  [types.APPLYFOR_AID_REQUEST] (state) {
    state.applyforStatus = 'loading';
  },
  [types.APPLYFOR_AID_SUCCESS] (state, { mutual_aid }) {
    state.applyfor = mutual_aid;
    state.applyforStatus = 'successful';
  },
  [types.APPLYFOR_AID_FAILURE] (state) {
    state.applyforStatus = 'failed';
  },
  // [types.RECEIVE_GETMUTUAL_AID] (state, { mutual_aid }) {
  //   state.getmutual = mutual_aid;
  // },
  [types.GETMUTUAL_AID_REQUEST] (state) {
    state.getmutualState = 'loading';
  },
  [types.GETMUTUAL_AID_SUCCESS] (state, { mutual_aid }) {
    state.getmutual = mutual_aid;
    state.getmutualState = 'successful';
  },
  [types.GETMUTUAL_AID_FAILURE] (state) {
    state.getmutualState = 'failed';
  },
  // [types.RECEIVE_GETMUTUALS_AID] (state, { mutual_aid }) {
  //   state.getmutuals = mutual_aid;
  // },
  [types.GETMUTUALS_AID_REQUEST] (state) {
    state.getmutualsStatus = 'loading';
  },
  [types.GETMUTUALS_AID_SUCCESS] (state, { mutual_aid }) {
    state.getmutuals = mutual_aid;
    state.getmutualsStatus = 'successful';
  },
  [types.GETMUTUALS_AID_FAILURE] (state) {
    state.getmutualsStatus = 'failed';
  },
};

export default {
  state,
  mutations
};
