// cookie
export const cookie = state => state.cookie.ctx

// plan
export const availablePlans = state => state.plan.availables
export const getAvailablesStatus = state => state.plan.getAvailablesStatus

export const joinedPlans = state => state.plan.joined
export const getJoinedStatus = state => state.plan.getJoinedStatus

export const plan = state => state.plan.plan
export const getPlanApiStatus = state => state.plan.getPlanApiStatus
// group
export const group = state => state.group.group
export const groupEvent = state => state.group.groupEvent
export const groupInfo = state => state.group.groupInfo
export const groupStatus = state => state.group.groupStatus
//mutual_aid
export const applyfor = state => state.mutual_aid.applyfor
export const getmutual = state => state.mutual_aid.getmutual
export const getmutuals = state => state.mutual_aid.getmutuals
export const applyforStatus = state => state.mutual_aid.applyforStatus
export const getmutualState = state => state.mutual_aid.getmutualState
export const getmutualsStatus = state => state.mutual_aid.getmutualsStatus

//order

export const getunderwrite = state => state.order.getunderwrite
export const createuw = state => state.order.createuw
export const selectAddress = state => state.order.selectAddress
export const orderid = state => state.order.orderid

export const allOrder = state => state.order.allOrder
export const allOrderStatus = state => state.order.allOrderStatus

export const aOrder = state => state.order.aOrder
export const aVehicle = state => state.order.aVehicle
export const aorderStatus = state =>state.order.aorderStatus

export const driverOrder = state => state.order.getDriverOrder
export const getDriverOrderStatus = state => state.order.getDriverOrderStatus
export const driverOrders = state => state.order.getDriverOrders
export const getDriverOrdersStatus = state => state.order.getDriverOrdersStatus
export const planOrder = state => state.order.planOrder
export const planOrderStatus = state => state.order.planOrderStatus

export const planOrders = state => state.order.getPlanOrders
export const getPlanOrdersStatus = state => state.order.getPlanOrdersStatus

export const saleOrder = state => state.order.getSaleOrder
export const getSaleOrderStatus = state => state.order.getSaleOrderStatus

export const saleOrders = state => state.order.getSaleOrders
export const getSaleOrdersStatus = state => state.order.getSaleOrdersStatus

export const anDriverOrder = state => state.order.placeAnDriverOrder
export const placeAnDriverOrderStatus = state => state.order.placeAnDriverOrderStatus

export const anPlanOrder = state => state.order.placeAnPlanOrder
export const placeAnPlanOrderStatus = state => state.order.placeAnPlanOrderStatus

export const anSaleOrder = state => state.order.placeAnSaleOrder
export const placeAnSaleOrderStatus = state => state.order.placeAnSaleOrderStatus
//vehicle模块

//vehicleId
export const vehicleId = state => state.vehicle.vehicleId
//用户输入车型代码
export const vehicleModel2 = state => state.vehicle.vehicleModel2
export const vehicleModel2ApiStatus = state => state.wallet.vehicleModel2ApiStatus
export const vehicleModel = state => state.vehicle.vehicleModel
export const vehicleModelApiStatus = state => state.wallet.vehicleModelApiStatus
//用户所有车辆的信息
export const vehicleInfos =state =>state.vehicle.vehicleInfos
export const vehicleInfosApiStatus = state => state.wallet.vehicleInfosApiStatus
//新车已上牌信息
export const setVehicleOncard = state => state.vehicle.setVehicleOncard
export const setVehicleOncardStatus = state => state.vehicle.setVehicleOncardStatus
//新车未上牌信息
export const setVehicleInfo = state => state.vehicles.setVehicleInfo
export const setVehicleInfoStatus = state => state.vehicle.setVehicleInfoStatus
//提交驾驶人信息
export const setDriverInfo = state => state.vehicle.setDriverInfo
export const setDriverInfoStatus = state =>state.vehicle.setDriverInfoStatus
//修改驾驶人信息
export const changeDriverInfo = state => state.vehicle.changeDriverInfo
export const changeDriverInfoStatus = state =>state.vehicle.changeDriverInfoStatus
//获取某个车的信息 
export const getVehicleInfo = state => state.vehicle.getVehicleInfo
export const getVehicleInfoStatus = state => state.vehicle.getVehicleInfoStatus
//上传证件照片
export const uploadImage = state => state.vehicle.uploadImage
export const uploadImageStatus = state =>state.vehicle.uploadImageStatus
//暂存用户输入的一个驾驶人信息
export const addDriverVehicle =state =>state.vehicle.addDriverVehicle


 //添加缓存中的驾驶人
export const driver = state => { 
    return state.vehicle.driver
}
//测试
export const checked= state => {
    return state.vehicle.checked
}

//wallet
export const accounts = state => state.wallet.accounts
export const transaction = state => state.wallet.transaction
export const wallet = state => state.wallet.wallet
export const accoutsWalletApiStatus = state => state.wallet.accoutsWalletApiStatus
export const transactionWalletApiStatus = state => state.wallet.transactionWalletApiStatus
export const WalletApiStatus = state => state.wallet.WalletApiStatus

//profile
export const userInformation = state =>state.profile.userInformation
export const userInformationApiStatus = state => state.profile.userInformationApiStatus

export const getUserOpenId = state =>state.profile.getUserOpenId
export const getUserOpenIdApiStatus = state => state.profile.getUserOpenIdApiStatus

//quotation
export const quotationid = state => state.quotation.quotationid

export const quotation = state => state.quotation.quotation
export const getQuotationApiStatus = state => state.quotation.getQuotationApiStatus

export const unquotated = state => state.quotation.unquotated
export const getUnquotatedStatus = state => state.quotation.getUnquotatedStatus

export const quotated = state => state.quotation.quotated
export const getquotatedstatus = state => state.quotation.getquotatedstatus

export const quotations = state => state.quotation.quotations
export const getQuotationsApiStatus = state => state.quotation.getQuotationsApiStatus

export const allQuotations = state => state.quotation.allQuotations
export const getAllQuotationsApiStatus = state => state.quotation.getAllQuotationsApiStatus

export const addQuotationGroups = state => state.quotation.addQuotationGroups
export const insertQuotationApiStatus = state => state.quotation.insertQuotationApiStatus

// megatron
export const megatronVehicle = state => state.megatron.vehicle;
export const megatronLoading = state => state.megatron.loading;
export const megatronError = state => state.megatron.error;
export const megatronquotaNum = state => state.megatron.quotaNum;
export const megatronopenid = state => state.megatron.openid;
export const megatronticketinfo = state => state.megatron.ticket;
export const megatronscratch = state => state.megatron.scratch;
export const megatronscratch2 = state => state.megatron.scratch2;

//storeMaxScore
export const maxScore = state => state.quotation.maxScore;
export const maxScore2 = state => state.order.maxScore2;

export const svehicleid = state => state.quotation.svehicleid;
export const sownername = state => state.quotation.sownername;
export const sphone = state => state.quotation.sphone;
export const slicense_no = state => state.quotation.slicense_no;
export const sbegintime = state => state.quotation.sbegintime;
export const sendtime = state => state.quotation.sendtime;
export const sstate = state => state.quotation.sstate;

export const sorder_id = state => state.order.sorder_id;
export const oownername = state => state.order.oownername;
export const ophone = state => state.order.ophone;
export const olicense_no = state => state.order.olicense_no;
export const obegintime = state => state.order.obegintime;
export const oendtime = state => state.order.oendtime;
export const ostate = state => state.order.ostate;