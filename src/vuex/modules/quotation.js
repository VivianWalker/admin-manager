import * as types from '../mutation-types';

// initial state
const state = {
  quotation: null,
  getQuotationApiStatus: true,
  quotations: null,
  getQuotationsApiStatus: null,
  addQuotationGroups: [],
  insertQuotationApiStatus: null,
  quotationid:null,
  getUnquotatedStatus:true,
  unquotated:null,
  getquotatedstatus:true,
  quotated:null,
  maxScore: null,
  svehicleid: null,
  sownername: null,
  sphone: null,
  slicense_no: null,
  sbegintime: null,
  sendtime: null,
  sstate: null,
};

// mutations
const mutations = {
  [types.SET_QUOTATION_ID] (state, {id}) {
    state.quotationid = id;
  },

  [types.GET_QUOTATION_REQUEST] (state) {
    state.getQuotationApiStatus = true;
  },
  [types.GET_QUOTATION_SUCCESS] (state, { quotation }) {
    state.quotation = quotation;
    state.getQuotationApiStatus = false;
  },
  [types.GET_QUOTATION_FAILURE] (state, { qid } ) {
    state.getQuotationApiStatus = false;
  },

  
  [types.GET_QUOTATIONS_REQUEST] (state) {
    state.getQuotationsApiStatus = 'loading';
  },
  [types.GET_QUOTATIONS_SUCCESS] (state, { quotations }) {
    state.quotations = quotations;
    state.getQuotaitonsApiStatus = 'successful';
  },
  [types.GET_QUOTATIONS_FAILURE] (state, { vid } ) {
    state.getQuotationsApiStatus = 'failed';
  },

  //获取未报价
  [types.GET_UNQUOTATED_REQUEST] (state) {
    state.getUnquotatedStatus = true;
  },
  [types.GET_UNQUOTATED_SUCCESS] (state, { quotations }) {
    state.unquotated = quotations;
    state.getUnquotatedStatus = false;
  },
  [types.GET_UNQUOTATED_FAILURE] (state, {error}) {
    state.getUnquotatedStatus = false;
  },

  //获取已报价
  [types.GET_QUOTATED_REQUEST] (state) {
    state.getquotatedstatus = true;
  },
  [types.GET_QUOTATED_SUCCESS] (state, { quotations }) {
    state.quotated = quotations;
    state.getquotatedstatus = false;
  },
  [types.GET_QUOTATED_FAILURE] (state, {error}) {
    state.getquotatedstatus = false;
  },

  [types.ADD_QUOTATION_GROUPS] (state , {qid, vid, groups, promotion}) {

  },
  [types.INSERT_QUOTATION_SUCCESS] (state, { quotations }) {
    state.quotations = quotations;
    state.insertQuotationApiStatus = 'successful';
  },
  [types.INSERT_QUOTATION_FAILURE] (state) {
    state.insertQuotationApiStatus = 'failed';
  },
  //storeMaxScore
  [types.STORE_MAX_SCORE] (state, {maxScore}) {
    state.maxScore = maxScore;
  },
  //storeCondition
  [types.STORE_QUOTATION_CONDITION] (state, {svehicleid, sownername, sphone, slicense_no, sbegintime, sendtime, sstate}) {
    state.svehicleid = svehicleid;
    state.sownername = sownername;
    state.sphone = sphone;
    state.slicense_no = slicense_no;
    state.sbegintime = sbegintime;
    state.sendtime = sendtime;
    state.sstate = sstate;
  },
};

export default {
  state,
  mutations
};
