import Vue from 'vue';

export default {
  getOperatorInfo(ctx, opid, scb, fcb) {
    Vue.rpc.call(ctx, "operator", "getOperatorInfo", opid).then(scb, fcb);
  }
};