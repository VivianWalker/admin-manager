import * as types from '../mutation-types';

// initial state
const state = {
  group: [],
  getGroupStatus:null,
  groupEvent:[],
  getEventStatus:null,
  groupInfo:[],
  getInfoStatus:null,
  groupStatus:[],
  getStatus:null
};

// mutations
const mutations = {
  // [types.RECEIVE_GROUP_HIVE] (state, { group }) {
  //   state.group = group;
  // },

   [types.GROUP_HIVE_REQUEST] (state) {
    state.getGroupStatus = 'loading';
  },
  [types.GROUP_HIVE_SUCCESS] (state, { group }) {
    state.group = group;
    state.getGroupStatus = 'successful';
  },
  [types.GROUP_HIVE_FAILURE] (state) {
    state.getGroupStatus = 'failed';
  },


  // [types.RECEIVE_GROUPEVENT_HIVE] (state, { group }) {
  //   state.groupEvent = group;
  // },
  [types.GROUPEVENT_HIVE_REQUEST] (state) {
    state.getEventStatus = 'loading';
  },
  [types.GROUPEVENT_HIVE_SUCCESS] (state, { group }) {
    state.groupEvent = group;
    state.getEventStatus = 'successful';
  },
  [types.GROUPEVENT_HIVE_FAILURE] (state) {
    state.getEventStatus = 'failed';
  },

  // [types.RECEIVE_GROUPINFO_HIVE] (state, { group }) {
  //   state.groupInfo = group;
  // },
    [types.GROUPINFO_HIVE_REQUEST] (state) {
    state.getInfoStatus = 'loading';
  },
  [types.GROUPINFO_HIVE_SUCCESS] (state, { group }) {
    state.groupInfo = group;
    state.getInfoStatus = 'successful';
  },
  [types.GROUPINFO_HIVE_FAILURE] (state) {
    state.getInfoStatus = 'failed';
  },
  // [types.RECEIVE_GROUPSTATUS_HIVE] (state, { group }) {
  //   state.groupStatus = group;
  // },
  [types.GROUPSTATUS_HIVE_REQUEST] (state) {
    state.getStatus = 'loading';
  },
  [types.GROUPSTATUS_HIVE_SUCCESS] (state, { group }) {
    state.groupStatus = group;
    state.getStatus = 'successful';
  },
  [types.GROUPSTATUS_HIVE_FAILURE] (state) {
    state.getStatus = 'failed';
  },
};

export default {
  state,
  mutations
};
