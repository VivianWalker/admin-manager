import * as types from '../mutation-types';

// initial state
const state = {
  vehicleModel: [],
  vehicleModelApiStatus: null,
  vehicleModel2: null,
  vehicleModel2ApiStatus: 'null',
  vehicleInfos: [],
  vehicleInfosApiStatus: null,
  setVehicleOncard: [],//新车已上牌
  setVehicleOncardStatus: null,
  setVehicleInfo: [],//新车未上牌
  setVehicleInfoStatus: true,
  setDriverInfo: [],//提交驾驶人信息
  setDriverInfoStatus: null,
  changeDriverInfo: [],//修改驾驶人信息
  changeDriverInfoStatus: null,
  getVehicleInfo: null,//获取某个车信息
  getVehicleInfoStatus: null,
  uploadImage: [],//证件照上传
  uploadImageStatus: null,
  addDriverVehicle: [],//暂时存放用户输入的一组数据
  driver: [],//添加驾驶人
  checked: true,//状态记录
  vehicleId: null,
  vcode: '4028b2883e3bbaa6013e9be979f6466e',
};

// mutations
const mutations = {

  //VEHICLEID
  [types.SET_VEHICLE_ID] (state, {id}) {
    state.vehicleId = id;
  },
  
  [types.VEHICLE_MODELS2_REQUEST] (state) {
    state.vehicleModel2 = null;
    state.vehicleModel2ApiStatus = 'loading';
  },
  [types.VEHICLE_MODELS2_SUCCESS] (state, { vehicle }) {
    state.vehicleModel2 = vehicle;
    state.vehicleModel2ApiStatus = 'successful';
  },
  [types.VEHICLE_MODELS2_FAILURE] (state) {
    state.vehicleModel2ApiStatus = 'failed';
  },

  //车型代码
  [types.VEHICLE_VEHICLE_REQUEST] (state) {
    state.vehicleModelApiStatus = 'loading';
  },
  [types.VEHICLE_VEHICLE_SUCCESS] (state, { vehicle }) {
    state.vehicleModel = vehicle;
    state.vehicleModelApiStatus = 'successful';
  },
  [types.VEHICLE_VEHICLE_FAILURE] (state) {
    state.vehicleModelApiStatus = 'failed';
  },

 //得到用户的所有车的信息
  [types.INFOS_VEHICLE_REQUEST] (state) {
    state.vehicleInfosApiStatus = 'loading';
  },
  [types.INFOS_VEHICLE_SUCCESS] (state, { vehicle }) {
    state.vehicleInfos = vehicle;
    state.vehicleInfosApiStatus = 'successful';
  },
  [types.INFOS_VEHICLE_FAILURE] (state) {
    state.vehicleInfosApiStatus = 'failed';
  },
  //获取报价提交表单(新车已上牌) setVehicleInfoOnCard
  [types.SET_VEHICLE_INFO_REQUSET] (state) {
    state.setVehicleOncardStatus = 'loading';
  },
  [types.SET_VEHICLE_INFO_SUCCESS] (state, { vehicle }) {
    state.setVehicleOncard = vehicle;
    state.setVehicleOncardStatus = 'successful';
  },
  [types.SET_VEHICLE_INFO_FAILURE] (state) {
    state.setVehicleOncardStatus = 'failed';
  },  
  //获取报价提交表单(新车未上牌) setVehicleInfo
  [types.SET_VEHICLE__REQUSET] (state) {
    state.setVehicleInfoStatus = 'loading';
  },
  [types.SET_VEHICLE_SUCCESS] (state, { vehicle }) {
    state.setVehicleInfo = vehicle;
    state.setVehicleInfoStatus = 'successful';
  },
  [types.SET_VEHICLE_FAILURE] (state) {
    state.setVehicleInfoStatus = 'failed';
  }, 
  ////提交驾驶人信息
  [types.SET_DRIVER_INFO_REQUSET] (state) {
    state.setDriverInfoStatus = 'loading';
  },
  [types.SET_DRIVER_INFO_SUCCESS] (state, { vehicle }) {
    state.setDriverInfo = vehicle;
    state.setDriverInfoStatus = 'successful';
  },
  [types.SET_DRIVER_INFO_FAILURE] (state) {
    state.setDriverInfoStatus = 'failed';
  },
  //修改驾驶人信息
  [types.CHANGE_DRIVER_INFO_REQUSET] (state) {
    state.changeDriverInfoStatus = 'loading';
  },
  [types.CHANGE_DRIVER_INFO_SUCCESS] (state, { vehicle }) {
    state.changeDriverInfo = vehicle;
    state.changeDriverInfoStatus = 'successful';
  },
  [types.CHANGE_DRIVER_INFO_FAILURE] (state) {
    state.changeDriverInfoStatus = 'failed';
  },
  //获取某个车的信息
  [types.GET_VEHICLE_INFO_REQUSET] (state) {
    state.getVehicleInfoStatus = true;
  },
  [types.GET_VEHICLE_INFO_SUCCESS] (state, { vehicle }) {
    state.getVehicleInfo = vehicle;
    state.getVehicleInfoStatus = false;
  },
  [types.GET_VEHICLE_INFO_FAILURE] (state) {
    state.getVehicleInfoStatus = false;
  },
  //上传图片
  [types.UPLOAD_IMAGE_REQUSET] (state) {
    state.uploadImageStatus = 'loading';
  },
  [types.UPLOAD_IMAGE_SUCCESS] (state, { vehicle }) {
    state.uploadImage = vehicle;
    state.getVehicleInfoStatus = 'successful';
  },
  [types.UPLOAD_IMAGE_FAILURE] (state) {
    state.uploadImageStatus = 'failed';
  },
  //暂时存放用户输入的一组数据
  [types.ADD_DRIVER_VEHICLE] (state, { vehicle }) {
    state.addDriverVehicle = vehicle;
  },

  //传入暂存数据
  [types.ADD_DRIVER] (state, { name, identity,phone }) {
    state.driver.push({
      name,
      identity,
      phone

    })
  },
  //测试
  [types.STATE_CHECKED](state,{check}){
    state.checked=check;
  }
};

export default {
  state,
  mutations
};
