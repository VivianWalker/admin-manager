import Vue from 'vue';
const addVehicle = [{"name":"","identity":"","phone":""}]//添加驾驶人


export default {
  //获得车型 getVehicleModel
  getVehicleModel2(ctx, vehiclecode, scb, fcb) {
    Vue.rpc.call(ctx, "vehicle", "getVehicleModel", vehiclecode).then(scb, fcb);
  },
  //获得车型 getVehicleModelsByMake
  getVehicleModel(ctx, code, scb, fcb) {//根据车型代码得到信息
    Vue.rpc.call(ctx, "vehicle", "getVehicleModelsByMake", code).then(scb, fcb);
  },
  //获取所有车信息 getVehicleInfos
  getVehicleInfos(ctx, scb, fcb){
    Vue.rpc.call(ctx, "vehicle", "getVehicles").then(scb, fcb)
  },
  //获取报价提交表单(新车已上牌) setVehicleInfoOnCard
  setVehicleInfoOnCard(ctx,name, identity_no, phone, vehicle_code, license_no, engine_no, register_date, average_mileage, is_transfer,last_insurance_company, insurance_due_date, scb, fcb){
    Vue.rpc.call(ctx,"vehicle", "SetVehicleOnCart",name, identity_no, phone, vehicle_code, license_no, engine_no, register_date, average_mileage, is_transfer,last_insurance_company, insurance_due_date).then(scb, fcb);
  },
//获取报价提交表单(新车未上牌) setVehicleInfo
  setVehicleInfo(ctx,name, identity_no, phone, vehicle_code, license_no, engine_no, receipt_no, receipt_date, average_mileage, is_transfer,last_insurance_company, insurance_due_date, scb, fcb){
    Vue.rpc.call(ctx,"vehicle", "SetVehicle",name, identity_no, phone, vehicle_code, license_no, engine_no, receipt_no, receipt_date, average_mileage, is_transfer,last_insurance_company, insurance_due_date).then(scb, fcb);
  },
  //提交驾驶人信息 setDriverInfo
  setDriverInfo(ctx, vid, drivers, scb, fcb){
    Vue.rpc.call(ctx, "vehicle", "setDriver", vid,drivers).then(scb, fcb);
  },
  //修改驾驶人信息 changeDriverInfo
  changeDriverInfo(ctx, vid, name, identity_no, phone, scb, fcb){
    Vue.rpc.call(ctx,"vehicle","changeDriver",vid, name, identity_no, phone).then(scb, fcb);
  },
  //获取某个车信息 getVehicleInfo
  getVehicleInfo(ctx, vid, scb, fcb){
    Vue.rpc.call(ctx,"vehicle","getVehicle",vid).then(scb,fcb);
  },
  //上传证件照 uploadDriverImages
  uploadDriverImages(ctx,vid, driving_frontal_view, driving_rear_view, identity_frontal_view, identity_rear_view, license_frontal_views, scb, fcb){
    Vue.rpc.call(ctx,"vehicle","uploadDriverImages",vid, driving_frontal_view, driving_rear_view, identity_frontal_view, identity_rear_view, license_frontal_views)
  },
  getAddDriver(cb){//得到上面（用户输入）
    setTimeout(() => cb(addVehicle), 100);
  },

  damageCount(ctx, vid, count, scb, fcb){
    console.log(vid + "======" + count);
    Vue.rpc.call(ctx,"vehicle","damageCount", vid, count).then(scb, fcb);
  },
  
};