import Vue from 'vue';

export default {
  getAvailablePlans(ctx,scb, fcb) {
    Vue.rpc.call(ctx, "plan", "getAvailablePlans").then(scb,fcb);
  },
  getJoinedPlans(ctx,scb, fcb) {
    Vue.rpc.call(ctx, "plan", "getJoinedPlans").then(scb,fcb);
  },
  getPlan(ctx, pid, scb, fcb) {
    Vue.rpc.call(ctx, "plan", "getPlan", pid).then(scb, fcb);
  }
};
