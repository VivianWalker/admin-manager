import Vue from 'vue';

export default {
  getGroup(ctx, scb, fcb) {
    Vue.rpc.call(ctx,"group", "getGroup").then(scb,fcb);
  },
  getGroupEvent(ctx, scb, fcb) {
    Vue.rpc.call(ctx, "group", "getGroupEvent").then(scb,fcb);
  },
  getGroupInfo(ctx, scb,fcb) {
    Vue.rpc.call(ctx, "group", "getGroupInfo").then(scb,fcb);
  },
  getGroupStatus(ctx,scb,fcb) {
    Vue.rpc.call(ctx, "group", "getGroupStatus").then(scb,fcb);
  }
}
