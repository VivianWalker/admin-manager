import * as types from '../mutation-types';

const state = {
  ctx: {
    wxuser: null
  }
}

const mutations = {
  [types.RECEIVE_COOKIE] (state, { openid }) {
    state.ctx.wxuser = openid
  }
};

export default {
  state,
  mutations
};
