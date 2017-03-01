import * as types from '../mutation-types';
 //initial state
 const state = {
     userInformation:[],
     userInformationApiStatus: null,
     getUserOpenId:'',
     getUserOpenIdApiStatus: true,

 };
 //mutations
 const mutations={
     [types.RECEIVE_USER_INFORMATION] (state,{ profile}){
         state.userInformation = profile;
     },
     [types.GET_USEROPENID_REQUEST] (stated) {
         state.getUserOpenIdApiStatus = true;
     },
     [types.GET_USEROPENID_SUCCESS] (state, { profile }) {
         state.getUserOpenId = profile;
         state.getUserOpenIdApiStatus = false;
     },
     [types.GET_USEROPENID_FAILURE] (state) {
         state.getUserOpenIdApiStatus = true;
     },
 };
 

 export default{
     state,
     mutations
 }