import plan_api from '../api/plan';
import group_api from '../api/group';
import mutual_aid_api from '../api/mutual_aid';
import order_api from '../api/order';
import vehicle_api from '../api/vehicle';
import wallet_api from '../api/wallet';
import profile_api from '../api/profile';
import quotation_api from '../api/quotation';
import operator_api from '../api/operator';

import * as types from './mutation-types';

//cookie
export const fetchCookie = ({ commit, state }, cookies) => {
  if (!state.cookie.ctx.wxuser) {
    for (let cookie of cookies.split(";")) {
      let pair = cookie.split("=");
      if (pair[0] === "wxuser") {
        commit(types.RECEIVE_COOKIE, { openid: pair[1] });
        break;
      }
    }
  }
};
//plan
export const getAvailablePlans = ({ commit, state }) => {
  return new Promise((resolve, reject) => {
    commit(types.AVAILABLE_PLANS_REQUEST);
    plan_api.getAvailablePlans(state.cookie.ctx,
      (plan) => {
        commit(types.AVAILABLE_PLANS_SUCCESS, { plan });
        resolve();
      },
      (err) => {
        commit(types.AVAILABLE_PLANS_FAILURE);
        reject();
      });
  });
};
export const getJoinedPlans = ({ commit, state }) => {
  return new Promise((resolve, reject) => {
    commit(types.JOINED_PLANS_REQUEST);
    plan_api.getJoinedPlans(state.cookie.ctx,
      (plan) => {
        commit(types.JOINED_PLANS_SUCCESS, { plan });
        resolve();
      },
      (err) => {
        commit(types.JOINED_PLANS_FAILURE);
        reject();
      });
  })
};
export const getPlan = ({ commit, state }, pid) => {
  return new Promise((resolve, reject) => {
    commit(types.GET_PLAN_REQUEST);
    plan_api.getPlan(state.cookie.ctx, pid,
      (plan) => {
        commit(types.GET_PLAN_SUCCESS, { plan });
        resolve();
      },
      (err) => {
        commit(types.GET_PLAN_FAILURE, { pid });
        reject();
      });
  })
};

//order

//上传图片
export const uploadPhotos = ({ commit, state }, {uwid, photo}) => {
  return new Promise((resolve, reject) => {
    commit(types.UPLOAD_PHOTOS_REQUEST);
    order_api.uploadPhotos(state.cookie.ctx, uwid, photo, (uwinfo) => {
      resolve(uwinfo);
     },
      (err) => {
        commit(types.UPLOAD_PHOTOS_FAILURE, { err: "修改核保失败" });
        reject();
      });
  })
};

//修改备注
export const alterNote = ({ commit, state }, {uwid, note}) => {
  return new Promise((resolve, reject) => {
    commit(types.ALERT_NOTE_REQUEST);
    order_api.alterNote(state.cookie.ctx, uwid, note, (uwinfo) => {
      resolve(uwinfo);
    },
      (err) => {
        commit(types.ALERT_NOTE_FAILURE, { err: "修改核保失败" });
        reject();
      });
  });
};

//修改实际验车地点
export const alterRealPlace = ({ commit, state }, {uwid, real_place}) => {
  return new Promise((resolve, reject) => {
    commit(types.ALERT_REALPLACE_REQUEST);
    order_api.alterRealPlace(state.cookie.ctx, uwid, real_place, (uwinfo) => {
      resolve(uwinfo);
    },
      (err) => {
        commit(types.ALERT_REALPLACE_FAILURE, { err: "修改核保失败" });
        reject()
      });
  })
};

//修改审核结果
export const alterUnderwriteResult = ({ commit, state }, {uwid, result}) => {
  return new Promise((resolve, reject) => {
    commit(types.ALERT_RESULT_REQUEST);
    order_api.alterUnderwriteResult(state.cookie.ctx, uwid, result, (uwinfo) => {
      resolve(uwinfo);
    },
      (err) => {
        commit(types.ALERT_RESULT_FAILURE, { err: "修改核保失败" });
        reject();
      });
  })
};

export const alterValidatePlace = ({ commit, state }, {uwid, plan_time, validate_place}) => {
  return new Promise((resolve, reject) => {
    commit(types.ALERT_VALIDATE_REQUEST);
    order_api.alterValidatePlace(state.cookie.ctx, uwid, plan_time, validate_place, (uwinfo) => {
      resolve(uwinfo);
    },
      (err) => {
        commit(types.ALERT_VALIDATE_FAILURE, { err: "修改核保失败" });
        reject();
      });
  })
};

//获取核保信息
export const getUnderwriteByOrderId = ({ commit, state }, orderid) => {
  return new Promise((resolve, reject) => {
    commit(types.GET_UNDERWRITE_REQUEST);
    order_api.getUnderwriteByOrderId(state.cookie.ctx, orderid,
      (underwrite) => {
        commit(types.GET_UNDERWRITE_SUCCESS, { underwrite });
        resolve()
      },
      (err) => {
        commit(types.GET_UNDERWRITE_FAILURE);
        reject()
      });
  })
};

//生成核保
export const createUnderwrite = ({ commit, state }, {oid, plan_time, validate_place}) => {
  return new Promise((resolve, reject) => {
    commit(types.CREATE_UNDERWRITE_REQUEST);
    order_api.createUnderwrite(state.cookie.ctx, oid, plan_time, validate_place, (uwinfo) => {
      resolve(uwinfo)
    },
      (err) => {
        commit(types.CREATE_UNDERWRITE_FAILURE, { err: "无法获取核保id" });
        reject()
      });
  })
};

export const setOrderId = ({ commit, state }, id) => {
  commit(types.SET_ORDER_ID, {
    id: id
  })
};

export const getAllOrders = ({ commit, state }, {start, limit, maxScore2, nowScore, sorder_id, oownername, ophone, olicense_no, obegintime, oendtime, ostate}) => {
  return new Promise((resolve, reject) => {
    commit(types.ALL_ORDER_REQUEST);
    order_api.getAllOrders(state.cookie.ctx, start, limit, maxScore2, nowScore, sorder_id, oownername, ophone, olicense_no, obegintime, oendtime, ostate,
      (order) => {
        commit(types.ALL_ORDER_SUCCESS, { order });
        resolve(order);
      },
      (err) => {
        commit(types.ALL_ORDER_FAILURE);
        reject(err);
      });
  })
};
export const getOrder = ({ commit, state }, orderid) => {
  return new Promise((resolve, reject) => {
    commit(types.GET_ORDER_REQUEST);
    order_api.getOrder(state.cookie.ctx, orderid, (order) => {
      resolve(order);
      if (order.code == 200) {
        vehicle_api.getVehicleInfo(state.cookie.ctx, order.data.vehicle.id, (vehicle) => {
          commit(types.GET_ORDER_SUCCESS, { order, vehicle });
        },
          (err) => {
            commit(types.GET_ORDER_FAILURE, { err: "无法获取车数据" });
          });
      }
    },
      (err) => {
        commit(types.GET_ORDER_FAILURE, { err: "无法获取订单数据" });
        reject(err);
      });
  })
};

export const getDriverOrder = ({ commit, state }, order_id) => {
  return new Promise((resolve, reject) => {
    commit(types.DRIVER_ORDER_REQUEST);
    order_api.getDriverOrder(state.cookie.ctx, order_id,
      (order) => {
        commit(types.DRIVER_ORDER_SUCCESS, { order });
        resolve()
      },
      (err) => {
        commit(types.DRIVER_ORDER_FAILURE);
        reject()
      });
  })
};
export const getDriverOrders = ({ commit, state }, offset, limit) => {
  return new Promise((resolve, reject) => {
    commit(types.DRIVER_ORDERS_REQUEST);
    order_api.getDriverOrders(state.cookie.ctx, offset, limit,
      (order) => {
        commit(types.DRIVER_ORDERS_SUCCESS, { order });
        resolve()
      },
      (err) => {
        commit(types.DRIVER_ORDERS_FAILURE);
        reject()
      });
  })
};

export const getPlanOrder = ({ commit, state }, order_id) => {
  return new Promise((resolve, reject) => {
    commit(types.PLAN_ORDER_REQUEST);
    order_api.getPlanOrder(state.cookie.ctx, order_id,
      (order) => {
        commit(types.PLAN_ORDER_SUCCESS, { order });
        resolve()
      },
      (err) => {
        commit(types.PLAN_ORDER_FAILURE);
        reject()
      });
  })
};
export const getPlanOrders = ({ commit, state }, offset, limit) => {
  return new Promise((resolve, reject) => {
    commit(types.PLAN_ORDERS_REQUEST);
    order_api.getPlanOrders(state.cookie.ctx, offset, limit,
      (order) => {
        commit(types.PLAN_ORDERS_SUCCESS, { order });
        resolve()
      },
      (err) => {
        commit(types.PLAN_ORDERS_FAILURE);
        reject()
      });
  })
};
export const getSaleOrder = ({ commit, state }, order_id) => {
  return new Promise((resolve, reject) => {
    commit(types.SALE_ORDER_REQUEST);
    order_api.getSaleOrder(state.cookie.ctx, order_id,
      (order) => {
        commit(types.SALE_ORDER_SUCCESS, { order });
        resolve(order);
      },
      (err) => {
        commit(types.SALE_ORDER_FAILURE);
        reject(err);
      });
  })
};
export const updateSaleOrder = ({ commit, state }, {order_id, items, summary, payment}) => {
  return new Promise((resolve, reject) => {
    order_api.updateSaleOrder(state.cookie.ctx, order_id, items, summary, payment,
      (order) => {
        resolve(order);
      },
      (err) => {
        reject(err);
      });
  })
}
export const getSaleOrders = ({ commit, state }, offset, limit) => {
  return new Promise((resolve, reject) => {
    commit(types.SALE_ORDERS_REQUEST);
    order_api.getSaleOrders(state.cookie.ctx, offset, limit,
      (order) => {
        commit(types.SALE_ORDERS_SUCCESS, { order });
        resolve()
      },
      (err) => {
        commit(types.SALE_ORDERS_FAILURE);
        reject()
      });
  })
};
export const placeAnDriverOrder = ({ commit, state }, vid, dids, summary, payment, scb) => {
  return new Promise((resolve, reject) => {
    commit(types.ANDRIVER_ORDER_REQUEST);
    order_api.placeAnDriverOrder(state.cookie.ctx, vid, dids, summary, payment, scb,
      (order) => {
        commit(types.ANDRIVER_ORDER_SUCCESS, { order });
        resolve()
      },
      (err) => {
        commit(types.ANDRIVER_ORDER_FAILURE);
        reject()
      });
  })
};
export const placeAnPlanOrder = ({ commit, state }, vid, plans, pmid, service_radio, summary, payment) => {
  return new Promise((resolve, reject) => {
    commit(types.ANPLAN_ORDER_REQUEST);
    order_api.placeAnPlanOrder(state.cookie.ctx, vid, plans, pmid, service_radio, summary, payment,
      (order) => {
        commit(types.ANPLAN_ORDER_SUCCESS, { order });
        resolve()
      },
      (err) => {
        commit(types.ANPLAN_ORDER_FAILURE);
        reject()
      });
  })
};
export const placeAnSaleOrder = ({ commit, state }, {vid, pid, qid, items, summary, payment}) => {
  console.log(vid + " " + pid + " " + qid + " " + items + " " + summary + " " + payment)
  return new Promise((resolve, reject) => {
    commit(types.ANSALE_ORDER_REQUEST);
    order_api.placeAnSaleOrder(state.cookie.ctx, vid, pid, qid, items, summary, payment,
      (order) => {
        commit(types.ANSALE_ORDER_SUCCESS, { order });
        resolve(order);
      },
      (err) => {
        commit(types.ANSALE_ORDER_FAILURE);
        reject(err);
      });
  })
};

//vehicle

//提交出险次数
export const damageCount = ({commit, state }, {vid, count}) => {
  return new Promise((resolve, reject) => {
    vehicle_api.damageCount(state.cookie.ctx, vid, count, (vehicle) => {
        console.log(vehicle + "action")
        resolve(vehicle)
      },
      (err) => {
        reject()
      })
  })
}

export const setVehicleId = ({ commit, state }, id) => {
  commit(types.SET_VEHICLE_ID, {
    id: id
  })
};

export const getVehicleModel2 = ({ commit, state }, vehiclecode) => {
  return new Promise((resolve, reject) => {
    commit(types.VEHICLE_MODELS2_REQUEST);
    vehicle_api.getVehicleModel2(state.cookie.ctx, vehiclecode,
      (vehicle) => {
        commit(types.VEHICLE_MODELS2_SUCCESS, { vehicle });
        resolve()
      },
      (err) => {
        commit(types.VEHICLE_MODELS2_FAILURE);
        reject()
      });
  })
};

//getVehicleModelByMake
export const getVehicleModel = ({ commit, state }, code) => {
  return new Promise((resolve, reject) => {
    commit(types.VEHICLE_VEHICLE_REQUEST);
    vehicle_api.getVehicleModel(state.cookie.ctx, code,
      (vehicle) => {
        commit(types.VEHICLE_VEHICLE_SUCCESS, { vehicle });
        resolve()
      },
      (err) => {
        commit(types.VEHICLE_VEHICLE_FAILURE);
        reject()
      });
  })
};

export const getVehicleInfos = ({ commit, state }) => {
  return new Promise((resolve, reject) => {
    commit(types.INFOS_VEHICLE_REQUEST);
    vehicle_api.getVehicleInfos(state.cookie.ctx,
      (vehicle) => {
        commit(types.INFOS_VEHICLE_SUCCESS, { vehicle });
        resolve()
      },
      (err) => {
        commit(types.INFOS_VEHICLE_FAILURE);
        reject()
      });
  })
};

//提交驾驶人信息 setDriverInfo
export const setDriverInfo = ({ commit, state }, driver) => {
  return new Promise((resolve, reject) => {
    commit(types.SET_DRIVER_INFO_REQUSET);
    let [vid, drivers] = driver;
    vehicle_api.setDriverInfo(state.cookie.ctx, vid, drivers,
      (vehicle) => {
        commit(types.SET_DRIVER_INFO_SUCCESS, { vehicle });
        resolve()
      },
      (err) => {
        commit(types.SET_DRIVER_INFO_FAILURE);
        reject()
      })
  })
}
//修改驾驶人信息 changeDriverInfo
export const changeDriverInfo = ({ commit, state }, driver) => {
  return new Promise((resolve, reject) => {
    commit(types.CHANGE_DRIVER_INFO_REQUSET);
    let [vid, name, identity_no, phone] = driver;
    vehicle_api.setDriverInfo(state.cookie.ctx, vid, name, identity_no, phone,
      (vehicle) => {
        commit(types.CHANGE_DRIVER_INFO_SUCCESS, { vehicle });
        resolve()
      },
      (err) => {
        commit(types.CHANGE_DRIVER_INFO_FAILURE);
        reject()
      })
  })
}
//获取某个车信息 getVehicleInfo
export const getVehicleInfo = ({ commit, state}, vid) => {
  return new Promise((resolve, reject) => {
    console.log("action------------" + vid)
    commit(types.GET_VEHICLE_INFO_REQUSET);
    vehicle_api.getVehicleInfo(state.cookie.ctx, vid,
      (vehicle) => {
        commit(types.GET_VEHICLE_INFO_SUCCESS, { vehicle });
        resolve()
      },
      (err) => {
        commit(types.GET_VEHICLE_INFO_FAILURE);
        reject()
      });
  })
}
//上传证件照 uploadDriverImages
export const uploadDriverImages = ({ commit, state}, vid, driving_frontal_view, driving_rear_view, identity_frontal_view, identity_rear_view, license_frontal_views) => {
  return new Promise((resolve, reject) => {
    commit(types.UPLOAD_IMAGE_REQUSET);
    vehicle_api.uploadDriverImages(state.cookie.ctx, vid, driving_frontal_view, driving_rear_view, identity_frontal_view, identity_rear_view, license_frontal_views,
      (vehicle) => {
        commit(types.UPLOAD_IMAGE_SUCCESS, { vehicle });
        resolve()
      },
      (err) => {
        commit(types.UPLOAD_IMAGE_FAILURE);
        reject()
      })
  })
}
//暂时存放用户输入的一组数据
export const addDrivers = ({ commit, state }) => {
  vehicle_api.getAddDriver((vehicle) => {
    commit(types.ADD_DRIVER_VEHICLE, { vehicle })
  });
};
//传入暂存数据
export const setDriver = ({ commit, state }, driver) => {
  commit(types.ADD_DRIVER, {
    name: driver.name,
    identity: driver.identity,
    phone: driver.phone,
  })
};
//状态
export const setChecked = ({ commit, state }, checked) => {
  commit(types.STATE_CHECKED, {
    check: checked
  })
};


//profile是api中的profile

export const getUserOpenId = ({ commit, state }, userid) => {
  return new Promise((resolve, reject) => {
    commit(types.GET_USEROPENID_REQUEST);
    profile_api.getUserOpenId(state.cookie.ctx, userid,
      (profile) => {
        commit(types.GET_USEROPENID_SUCCESS, { profile });
        resolve()
      },
      (err) => {
        commit(types.GET_USEROPENID_FAILURE, { userid });
        reject()
      });
  })
};

export const getUserInformation = ({ commit, state }) => {
  profile_api.getUserInformation(state.cookie.ctx, (profile) => {
    commit(types.RECEIVE_USER_INFORMATION, { profile });
  });
};

//quotation

export const newMessageNotify = ({ commit, state }) => {
  return new Promise((resolve, reject) => {
    quotation_api.newMessageNotify(state.cookie.ctx, (message) => {
      resolve(message);
    },
      (err) => {
        reject(err);
      });
  });
};


export const setQuotationId = ({ commit, state }, id) => {
  commit(types.SET_QUOTATION_ID, {
    id: id
  })
};

export const getQuotation = ({ commit, state }, qid) => {
  return new Promise((resolve, reject) => {
    commit(types.GET_QUOTATION_REQUEST);
    quotation_api.getQuotation(state.cookie.ctx, qid, (quotation) => {
      commit(types.GET_QUOTATION_SUCCESS, { quotation });
      resolve()
    },
      (err) => {
        commit(types.GET_QUOTATION_FAILURE, { err: "无法获取报价数据" });
        reject()
      });
  })
};

export const getQuotations = ({ commit, state }, vid) => {
  return new Promise((resolve, reject) => {
    commit(types.GET_QUOTATIONS_REQUEST);
    quotation_api.getQuotations(state.cookie.ctx, vid,
      (quotations) => {
        commit(types.GET_QUOTATIONS_SUCCESS, { quotations });
        resolve()
      },
      (err) => {
        commit(types.GET_QUOTATIONS_FAILURE, { vid });
        reject()
      });
  })
};

export const getQuotatedQuotations = ({ commit, state }, {start, limit, maxScore, nowScore, svehicleid, sownername, sphone, slicense_no, sbegintime, sendtime, sstate}) => {
  return new Promise((resolve, reject) => {
    commit(types.GET_QUOTATED_REQUEST);
    quotation_api.getQuotatedQuotations(state.cookie.ctx, start, limit, maxScore, nowScore, svehicleid, sownername, sphone, slicense_no, sbegintime, sendtime, sstate,
      (quotations) => {
        commit(types.GET_QUOTATED_SUCCESS, { quotations });
        resolve(quotations);
      },
      (err) => {
        commit(types.GET_QUOTATED_FAILURE, {err});
        reject(err);
      });
  })
};

export const getUnQuotatedQuotations = ({ commit, state }, {start, limit, maxScore, nowScore, svehicleid, sownername, sphone, slicense_no, sbegintime, sendtime, sstate}) => {
  return new Promise((resolve, reject) => {
    commit(types.GET_UNQUOTATED_REQUEST);
    quotation_api.getUnQuotatedQuotations(state.cookie.ctx, start, limit, maxScore, nowScore, svehicleid, sownername, sphone, slicense_no, sbegintime, sendtime, sstate,
      (quotations) => {
        commit(types.GET_UNQUOTATED_SUCCESS, { quotations });
        resolve(quotations);
      },
      (err) => {
        commit(types.GET_UNQUOTATED_FAILURE, {err});
        reject(err);
      });
  })
};

export const addQuotationGroups = ({ commit, state }, [qid, vid, groups, promotion]) => {
  return new Promise((resolve, reject) => {
    commit(types.ADD_QUOTATION_GROUPS, {
      qid: qid,
      vid: vid,
      groups: groups,
      promotion: promotion
    });
    quotation_api.addQuotationGroups(state.cookie.ctx, qid, vid, groups, promotion,
      (quotations) => {
        commit(types.INSERT_QUOTATION_SUCCESS, { quotations });
        resolve()
      },
      (err) => {
        commit(types.INSERT_QUOTATION_FAILURE, { vid });
        reject()
      });
  })
};

export const megatron = ({ commit, state }, vid) => {
  commit(types.MEGATRON_REQUEST);
  vehicle_api.getVehicleInfo(state.cookie.ctx, vid, (vehicle) => {
    // console.log(JSON.stringify(vehicle))
    if (vehicle.code == 200) {
      profile_api.getUserOpenId(state.cookie.ctx, vehicle.data.user_id, (openid) => {
        if (openid.code == 200) {
          quotation_api.getTicketInfo(state.cookie.ctx, openid.data, (ticket) => {
            commit(types.MEGATRON_SUCCESS, { vehicle, openid, ticket });
          },
            (err) => {
              commit(types.MEGATRON_FAILURE, { err: "无法获取二维码信息" });
            })
        }
      },
        (err) => {
          commit(types.MEGATRON_FAILURE, { err: "无法获取Openid" });
        });
    }
  },
    (err) => {
      commit(types.MEGATRON_FAILURE, { err: "无法获取汽车数据" });
    });
};

//CityPicker
export const selectAddress = ({ commit, state }, address) => {
  commit(types.SELECT_ADDRESS_SET, { address: address });
};

//storeMaxScore
export const storeMaxScore = ({ commit, state }, maxScore) => {
  commit(types.STORE_MAX_SCORE, {maxScore});
};
export const storeMaxScore2 = ({ commit, state }, maxScore2) => {
  commit(types.STORE_MAX_SCORE2, {maxScore2});
};
//storeCondition
export const storeCondition = ({ commit, state }, {svehicleid, sownername, sphone, slicense_no, sbegintime, sendtime, sstate}) => {
  return new Promise((resolve, reject) => {
    commit(types.STORE_QUOTATION_CONDITION, {svehicleid, sownername, sphone, slicense_no, sbegintime, sendtime, sstate});
    resolve();
  })
};
export const storeOrderCondition = ({ commit, state }, {sorder_id, oownername, ophone, olicense_no, obegintime, oendtime, ostate}) => {
  console.log(sorder_id, oownername, ophone, olicense_no, obegintime, oendtime, ostate)
  return new Promise((resolve, reject) => {
    commit(types.STORE_ORDER_CONDITION, {sorder_id, oownername, ophone, olicense_no, obegintime, oendtime, ostate});
    resolve();
  })
};