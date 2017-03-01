import Vue from 'vue';
export default{
    getUserInformation(ctx, scb,fcb){
        Vue.rpc.call(ctx, "profile","getUserInformation").then(scb,fcb);
    },
    getUserOpenId(ctx, userid, scb, fcb) {
        Vue.rpc.call(ctx, "profile", "getUserOpenId", userid).then(scb, fcb);
    },
};