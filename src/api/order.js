import Vue from 'vue';

export default {
  getDriverOrder(ctx, order_id, scb, fcb) {
    Vue.rpc.call(ctx, "order", "getDriverOrder", order_id).then(scb,fcb);
  },
  getDriverOrders(ctx, offset,limit,scb, fcb) {
    Vue.rpc.call(ctx, "order", "getDriverOrders", offset, limit,).then(scb, fcb);
  },
  getPlanOrder(ctx, order_id, scb, fcb) {
    Vue.rpc.call(ctx, "order", "getPlanOrder", order_id).then(scb, fcb);
  },
  getPlanOrders(ctx, offset,limit,scb, fcb) {
    Vue.rpc.call(ctx, "order", "getPlanOrders", offset, limit).then(scb, fcb);
  },
  getSaleOrder(ctx, order_id,scb, fcb) {
    Vue.rpc.call(ctx, "order", "getSaleOrder",order_id).then(scb, fcb);
  },
  getSaleOrders(ctx, offset,limit,scb,fcb) {
    Vue.rpc.call(ctx, "order", "getSaleOrders", offset,limit).then(scb, fcb);
  },
  placeAnDriverOrder(ctx, vid,dids,summary,payment,scb, fcb) {
    Vue.rpc.call(ctx, "order", "placeAnDriverOrder",vid,dids,summary,payment).then(scb, fcb);
  },
  placeAnPlanOrder(ctx, vid, plans, pmid, service_radio,summary,payment, scb, fcb) {
    Vue.rpc.call(ctx, "order", "placeAnPlanOrder", vid, plans, pmid, service_radio,summary,payment).then(scb, fcb);
  },
  placeAnSaleOrder(ctx, vid, pid, qid, items, summary, payment, scb, fcb) {
    console.log()
    Vue.rpc.call(ctx, "order", "placeAnSaleOrder",vid, pid, qid, items, summary, payment).then(scb, fcb);
  },
  updateSaleOrder(ctx, order_id, items, summary, payment, scb, fcb) {
    console.log(order_id, items, payment, summary);
    Vue.rpc.call(ctx, "order", "updateSaleOrder",order_id, items, summary, payment).then(scb, fcb);
  },
  getAllOrders(ctx, offset, limit, maxScore, nowScore, sorder_id, sownername, sphone, slicense_no, sbegintime, sendtime, sstate, scb, fcb) {
    console.log( offset, limit, maxScore, nowScore,sorder_id, sownername, sphone, slicense_no, sbegintime, sendtime, sstate)
    Vue.rpc.call(ctx, "order", "getAllOrders", offset, limit, maxScore, nowScore, sorder_id, sownername, sphone, slicense_no, sbegintime, sendtime, sstate).then(scb, fcb);
  },
  getOrder(ctx, order_id,scb, fcb) {
    Vue.rpc.call(ctx, "order", "getOrder",order_id).then(scb, fcb);
  },
  createUnderwrite(ctx, oid, plan_time, validate_place, scb, fcb) {
    Vue.rpc.call(ctx, "order", "createUnderwrite", oid, plan_time, validate_place).then(scb,fcb);
  },
  alterValidatePlace(ctx, uwid, plan_time, validate_place, scb, fcb) {
    Vue.rpc.call(ctx, "order", "alterValidatePlace", uwid, plan_time, validate_place).then(scb,fcb);
  },
  getUnderwriteByOrderId(ctx, orderid, scb, fcb) {
    Vue.rpc.call(ctx, "order", "getUnderwriteByOrderId", orderid).then(scb,fcb);
  },
  getUnderwriteByUWId(ctx, uwid, scb, fcb) {
    console.log("api uwid is " + uwid);
    Vue.rpc.call(ctx, "order", "getUnderwriteByUWId", uwid).then(scb,fcb);
  },
  alterUnderwriteResult(ctx, uwid, result, scb, fcb) {
    Vue.rpc.call(ctx, "order", "alterUnderwriteResult", uwid, result).then(scb,fcb);
  },
  alterRealPlace(ctx, uwid, real_place, scb, fcb) {
    console.log(uwid + "realplace api " + real_place);
    Vue.rpc.call(ctx, "order", "alterRealPlace", uwid, real_place).then(scb,fcb);
  },
  alterNote(ctx, uwid, note, scb, fcb) {
    Vue.rpc.call(ctx, "order", "alterNote", uwid, note).then(scb,fcb);
  },
  uploadPhotos(ctx, uwid, photo, scb, fcb) {
    Vue.rpc.call(ctx, "order", "uploadPhotos", uwid, photo).then(scb,fcb);
  },
};
