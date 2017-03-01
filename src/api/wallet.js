import Vue from 'vue';

export default {
  getAccounts(ctx, scb, fcb) {
    Vue.rpc.call(ctx, "wallet", "getAccounts").then(scb, fcb);
  },
  getTransactions(ctx,offset,limit, scb, fcb) {
    Vue.rpc.call(ctx, "wallet", "getTransactions",offset,limit).then(scb, fcb);
  },
  getWallet(ctx, scb, fcb) {
    Vue.rpc.call(ctx, "wallet", "getWallet").then(scb, fcb);
  }
};