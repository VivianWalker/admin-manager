import Vue from 'vue';

export default {
  getQuotations(ctx, vid, scb, fcb) {
    Vue.rpc.call(ctx, "quotation", "getQuotations", vid).then(scb, fcb);
  },
  getTicketInfo(ctx, oid, scb, fcb) {
    console.log("------ticketapi--------" + oid)
    Vue.rpc.call(ctx, "quotation", "getTicket", oid).then(scb, fcb);
  },
  getQuotation(ctx, qid, scb, fcb) {
    Vue.rpc.call(ctx, "quotation", "getQuotation", qid).then(scb, fcb);
  },
  getQuotatedQuotations(ctx, start, limit, maxScore, nowScore, svehicleid, sownername, sphone, slicense_no, sbegintime, sendtime, sstate, scb, fcb) {
    console.log(start, limit, maxScore, nowScore, svehicleid, sownername, sphone, slicense_no, sbegintime, sendtime, sstate);
    Vue.rpc.call(ctx, "quotation", "getQuotatedQuotations", start, limit, maxScore, nowScore,  svehicleid, sownername, sphone, slicense_no, sbegintime, sendtime, sstate).then(scb, fcb);
  },
  getUnQuotatedQuotations(ctx, start, limit, maxScore, nowScore,  svehicleid, sownername, sphone, slicense_no, sbegintime, sendtime, sstate, scb, fcb) {
    console.log(start, limit, maxScore, nowScore, svehicleid, sownername, sphone, slicense_no, sbegintime, sendtime, sstate);
    Vue.rpc.call(ctx, "quotation", "getUnquotatedQuotations", start, limit, maxScore, nowScore, svehicleid, sownername, sphone, slicense_no, sbegintime, sendtime, sstate).then(scb, fcb);
  },
  addQuotationGroups(ctx, qid, vid, groups, promotion, scb, fcb) {
    console.log("promotion======" + promotion);
    Vue.rpc.call(ctx, "quotation", "addQuotationGroups",  qid, vid, groups, promotion).then(scb, fcb);
  },
  newMessageNotify(ctx, scb, fcb) {
    console.log("newMessageNotify api--------")
    Vue.rpc.call(ctx, "quotation", "newMessageNotify").then(scb, fcb);
  },
}
