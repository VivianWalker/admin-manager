import Vue from 'vue';

export default {
  getApplyFor(ctx, offset, limit, scb, fcb) {
    Vue.rpc.call(ctx, "mutual-aid", "applyForMutualAid").then(scb, fcb);
  },
  getMutual(ctx, aid, scb, fcb) {
    Vue.rpc.call(ctx, "mutual-aid", "getMutualAid").then(scb,fcb);
  },
  getMutuals(ctx, offset, limit, scb,fcb) {
    Vue.rpc.call(ctx, "mutual-aid", "getMutualAids").then(scb, fcb);
  }
};
