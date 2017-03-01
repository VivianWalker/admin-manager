import * as types from '../mutation-types';

// initial state
const state = {
  getDriverOrder: [],
  getDriverOrderStatus:null,
  getDriverOrders:[],
  getDriverOrdersStatus:null,
  planOrder: undefined,
  planOrderStatus:null,
  getPlanOrders:[],
  getPlanOrdersStatus:null,
  getSaleOrder:[],
  getSaleOrderStatus:null,
  getSaleOrders:[],
  getSaleOrdersStatus:null,
  placeAnDriverOrder:[],
  placeAnDriverOrderStatus:null,
  placeAnPlanOrder:[],
  placeAnPlanOrderStatus:null,
  placeAnSaleOrder:[],
  placeAnSaleOrderStatus:null,
  allOrder:null,
  allOrderStatus:true,
  orderid:null,
  aorderStatus:true,
  aOrder:null,
  aVehicle:null,
  createuw:null,
  getunderwrite:null,
  selectAddress:null,
  sorder_id: null,
  oownername: null,
  ophone: null,
  olicense_no: null,
  obegintime: null,
  oendtime: null,
  ostate: null,
  maxScore2: null,
};

// mutations
const mutations = {

//获取underwrite
  [types.GET_UNDERWRITE_REQUEST] (state) {
  },
  [types.GET_UNDERWRITE_SUCCESS] (state, { underwrite }) {
    state.getunderwrite = underwrite;
  },
  [types.GET_UNDERWRITE_FAILURE] (state) {
  },

  [types.SET_ORDER_ID] (state, {id}) {
    state.orderid = id;
  }, 

//设置地点
  [types.SELECT_ADDRESS_SET] (state, {address}) {
    state.selectAddress = address;
  },
//all orders
  [types.ALL_ORDER_REQUEST] (state) {
    state.allOrderStatus = false;
  },
  [types.ALL_ORDER_SUCCESS] (state, { order }) {
    
    // console.log(JSON.stringify(order) + "==========")
    state.allOrder = order;
    state.allOrderStatus = false;
  },
  [types.ALL_ORDER_FAILURE] (state) {
    state.allOrderStatus = false;
  },

  [types.GET_ORDER_REQUEST] (state) {
    state.aorderStatus = true;
  },
  [types.GET_ORDER_SUCCESS] (state, { order, vehicle }) {
    state.aOrder = order;
    state.aVehicle = vehicle;
    // console.log("mutation---------------------------" + JSON.stringify(vehicle))
    state.aorderStatus = false;
  },
  [types.GET_ORDER_FAILURE] (state) {
    state.aorderStatus = false;
  },

  [types.DRIVER_ORDER_REQUEST] (state) {
    state.getDriverOrderStatus = 'loading';
  },
  [types.DRIVER_ORDER_SUCCESS] (state, { order }) {
    state.getDriverOrder = order;
    state.getDriverOrderStatus = 'successful';
  },
  [types.DRIVER_ORDER_FAILURE] (state) {
    state.getDriverOrderStatus = 'failed';
  },
  // [types.RECEIVE_DRIVER_ORDERS] (state, { order }) {
  //   state.getDriverOrders = order;
  // },
  [types.DRIVER_ORDERS_REQUEST] (state) {
    state.getDriverOrdersStatus = 'loading';
  },
  [types.DRIVER_ORDERS_REQUEST] (state, { order }) {
    state.getDriverOrders = order;
    state.getDriverOrdersStatus = 'successful';
  },
  [types.DRIVER_ORDERS_REQUEST] (state) {
    state.getDriverOrdersStatus = 'failed';
  },
  // [types.RECEIVE_PLAN_ORDER] (state, { order }) {
  //   state.planOrder = order;
  // },
    [types.PLAN_ORDER_REQUEST] (state) {
      state.planOrderStatus = 'loading';
    },
    [types.PLAN_ORDER_SUCCESS] (state, { order }) {
      state.planOrder = order;
      state.planOrderStatus = 'successful';
    },
    [types.PLAN_ORDER_FAILURE] (state) {
      state.planOrderStatus = 'failed';
    },
  // [types.RECEIVE_PLAN_ORDERS] (state, { order }) {
  //   state.getPlanOrders = order;
  // },
   [types.PLAN_ORDERS_REQUEST] (state) {
      state.getPlanOrdersStatus = 'loading';
    },
    [types.PLAN_ORDERS_SUCCESS] (state, { order }) {
      state.getPlanOrders = order;
      state.getPlanOrdersStatus = 'successful';
    },
    [types.PLAN_ORDERS_FAILURE] (state) {
      state.getPlanOrdersStatus = 'failed';
    },
  // [types.RECEIVE_SALE_ORDER] (state, { order }) {
  //   state.getSaleOrder = order;
  // },
    [types.SALE_ORDER_REQUEST] (state) {
      state.getSaleOrderStatus = 'loading';
    },
    [types.SALE_ORDER_SUCCESS] (state, { order }) {
      state.getSaleOrder = order;
      state.getSaleOrderStatus = 'successful';
    },
    [types.SALE_ORDER_FAILURE] (state) {
      state.getSaleOrderStatus = 'failed';
    },
  // [types.RECEIVE_SALE_ORDERS] (state, { order }) {
  //   state.getsaleOrders = order;
  // },
    [types.SALE_ORDERS_REQUEST] (state) {
      state.getSaleOrdersStatus = 'loading';
    },
    [types.SALE_ORDERS_SUCCESS] (state, { order }) {
      state.getsaleOrders = order;
      state.getSaleOrdersStatus = 'successful';
    },
    [types.SALE_ORDERS_FAILURE] (state) {
      state.getSaleOrdersStatus = 'failed';
    },
  // [types.RECEIVE_ANDRIVER_ORDER] (state, { order }) {
  //   state.placeAnDriverOrder = order;
  // },
  [types.ANDRIVER_ORDER_REQUEST] (state) {
      state.placeAnDriverOrderStatus = 'loading';
    },
    [types.ANDRIVER_ORDER_SUCCESS] (state, { order }) {
      state.placeAnDriverOrder = order;
      state.placeAnDriverOrderStatus = 'successful';
    },
    [types.ANDRIVER_ORDER_FAILURE] (state) {
      state.placeAnDriverOrderStatus = 'failed';
    },
  // [types.RECEIVE_ANPLAN_ORDER] (state, { order }) {
  //   state.placeAnPlanOrder = order;
  // },
    [types.ANPLAN_ORDER_REQUEST] (state) {
      state.placeAnPlanOrderStatus = 'loading';
    },
    [types.ANPLAN_ORDER_SUCCESS] (state, { order }) {
      state.placeAnPlanOrder = order;
      state.placeAnPlanOrderStatus = 'successful';
    },
    [types.ANPLAN_ORDER_FAILURE] (state) {
      state.placeAnPlanOrderStatus = 'failed';
    },
  // [types.RECEIVE_ANSALE_ORDER] (state, { order }) {
  //   state.placeAnSaleOrder = order;
  // },
    [types.ANSALE_ORDER_REQUEST] (state) {
      state.placeAnSaleOrderStatus = 'loading';
    },
    [types.ANSALE_ORDER_SUCCESS] (state, { order }) {
      state.placeAnSaleOrder = order;
      state.placeAnSaleOrderStatus = 'successful';
    },
    [types.ANSALE_ORDER_FAILURE] (state) {
      state.placeAnSaleOrderStatus = 'failed';
    },
     //storeMaxScore
    [types.STORE_MAX_SCORE2] (state, {maxScore2}) {
      state.maxScore2 = maxScore2;
    },
     //storeCondition
    [types.STORE_ORDER_CONDITION] (state, {sorder_id, oownername, ophone, olicense_no, obegintime, oendtime, ostate}) {
      state.sorder_id = sorder_id;
      state.oownername = oownername;
      state.ophone = ophone;
      state.olicense_no = olicense_no;
      state.obegintime = obegintime;
      state.oendtime = oendtime;
      state.ostate = ostate;
    }
};

export default {
  state,
  mutations
};
