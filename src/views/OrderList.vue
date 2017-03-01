<template>
	<div class="container clearfix">
        <ListMenu class="menu"></ListMenu>
        <!--{{allOrder}} -->
        <div class="section">
            <div class="search">
                <div>
                    <span>订单号：</span>
                    <input type="text" v-bind:value = sorder_id id= "order_id">
                    <span>用户姓名：</span>
                    <input type="text" v-bind:value = oownername id = "ownername">
                    <span>手机号：</span>
                    <input type="text" v-bind:value = ophone id = "phone">
                    <span>车牌号：</span>
                    <input type="text" v-bind:value = olicense_no id = "license_no">
                </div>
                <div class="order">
                    <span>生成时间：</span>
                    <input type="date" v-bind:value = obegintime id = "begintime">——
                    <input type="date" v-bind:value = oendtime id = "endtime"> 
                    <span>订单状态</span>
                    <select v-bind:value = ostate id = "state">
                        <option value="1">已创建订单</option>
                        <option value="2">已支付</option>
                        <option value="3">已核保</option>
                        <option value="4">已生效</option>
                        <option value="5">已失效</option>
                        <option value="6">待退款</option>
                        <option value="7">已退款</option>
                    </select>
                    <button class = "searchButton" @click="searchOrder()">查询</button>
                    <button class = "searchButton" @click="downloadData()">下载本页数据</button>
                </div>
            </div>
            <div v-if ="allOrder"> 
            <table>
                <thead>
                    <th>订单编号</th>
                    <th>用户姓名</th>
                    <th>手机号</th>
                    <th>车牌号</th>
                    <th>品牌型号</th>
                    <th>生成时间</th>
                    <th>订单实付金额</th>
                    <th>优惠券金额</th>
                    <th>订单状态</th>
                    <th>支付时间</th>
                    <th>备注</th>
                </thead>
                <tr v-for="o of allOrder" @click="orderId(o.order_id)" v-if="o !== null && o.type === 0">
                    <td v-if ="o.id !== null" >{{o.id}}</td>
                    <td v-else>{{o.order_id}}</td>
                    <td>{{o.vehicle.owner.name}}</td>
                    <td>{{o.vehicle.owner.phone}}</td>
                    <td>{{o.vehicle.license_no?o.vehicle.license_no:'新车未上牌'}}</td>
                    <td>{{o.vehicle.vehicle_model?o.vehicle.vehicle_model.familyName:''}}</td>
                    <td>{{o.created_at | date}}</td>
                    <td>{{o.payment}}</td>
                    <td v-if = "o.quotation">{{o.quotation.promotion}}</td>
                    <td v-else></td>
                    <td>{{o.state}}</td>
                    <td>{{o.paid_at | date}}</td>
                    <td>{{o.state_code}}</td>
                </tr>
            </table>
            </div>
            <div class="paging">
            <button :disabled="ableState1" @click="pre()">上一页</button>
            <span>&nbsp&nbsp第</span>
            <span>{{pageLength}}</span>
                <span>页&nbsp&nbsp</span>
                <button :disabled="ableState2" @click="next()">下一页</button>
                <span>&nbsp&nbsp共</span>
                <span>&nbsp{{lenPage}}&nbsp</span><span>页</span>
        </div>
        </div>
        <div class="makesurepick makesurepick0" v-if="newOrders > 0" >
            <h4>有{{newOrders}}条新订单，查看请刷新！<br></h4>
            <button style="float: none;" class="footer-button" @click="confirm()">知道了</button>
        </div
        <!--新订单弹出层-->
        <div class="makesurepick makesurepick3" v-if="new_order_num > 0">
            <h4>您收到{{new_order_num}}条新订单！</h4>
            <button style="float: none;" class="footer-button" @click="confirm4()">知道了</button>
        </div>
         <div class="makesurepick makesurepick3" v-if="new_pay_num > 0" >
            <h4>您收到{{new_pay_num}}条新支付！</h4>
            <button style="float: none;" class="footer-button" @click="confirm2()">知道了</button>
        </div>
    </div>	
</template>


<script>
    import ListMenu from '../components/ListMenu.vue' 
    import {mapGetters} from 'vuex'
	export default {
        filters: {
            "date": function(value) {
                if(value !=null){
                    var date3 = new Date(value);
                    var date = new Date(date3.getTime() - 8*60*60*1000);
                    var year = date.getFullYear();
                    var month = (date.getMonth() + 1) < 10? "0" + (date.getMonth() + 1):(date.getMonth() + 1);
                    var day = date.getDate()<10?"0" + date.getDate():date.getDate();
                    var hour = date.getHours()<10?"0" + date.getHours():date.getHours();
                    var minute = date.getMinutes()<10? "0" + date.getMinutes():date.getMinutes();
                    var second = date.getSeconds()<10? "0" + date.getSeconds():date.getSeconds();
                    var date2 = year + "/" + month + "/"  + day + "  "  + hour + ":" + minute + ":" + second;
                    return date2;
                }
            },
            "date2": function(value) {
                if(value !=null){
                    var date = new Date(value);
                    var date3 = new Date(date.getTime());
                    var date2 = date3.toLocaleString();
                    return date2;
                }
            }
        },
        data(){
            return{
                difference: 0,
                allOrder_num: 0,
                new_order_num: 0,
                new_pay_num: 0,
                config:{
                    show3: true
                },
                ableState1:false,
                ableState2:false,
                pageLength: 1,
                lenPage:null,
                allOrder: null,
                onepagesize: 0,
                newOrders:0,
            }
        },
        components:{
            ListMenu,
        },
        computed: mapGetters({
            sorder_id:'sorder_id',
            oownername:'oownername',
            ophone:'ophone',
            olicense_no:'olicense_no',
            obegintime:'obegintime',
            oendtime:'oendtime',
            ostate:'ostate',
            maxScore2: 'maxScore2',
        }),
        created () {
            this.$store.dispatch('newMessageNotify').then((message) => {
                if(message.code === 200){
                    this.new_order_num = message.data.orders;
                    this.new_pay_num = message.data.pays;
                }
            }).catch(err =>{
                console.log("err" + err);
            });
            let maxScore2 = (new Date()).getTime() + 24 * 60 * 60 * 1000;
            let nowScore = (new Date()).getTime() + 24 * 60 * 60 * 1000; 
            this.$store.dispatch('getAllOrders', {start:0, limit:19, maxScore2: maxScore2, nowScore: nowScore, sorder_id: this.sorder_id, oownername: this.oownername, ophone: this.ophone, olicense_no: this.olicense_no, obegintime: this.obegintime, oendtime: this.oendtime, ostate: this.ostate}).then((orders)=>{
                if(orders.code == 200){ 
                    this.allOrder = orders.data;
                    this.cursor = orders.cursor;
                    this.ableState1 = true;
                    this.lenPage = Math.ceil(orders.len/20);
                    this.orders_length = orders.len;
                    this.onepagesize = orders.data.length
                    if(this.lenPage >= 2){
                        this.ableState2 = false;
                    } 
                    else{
                        this.ableState2 = true;
                    }
                } 
                this.$store.dispatch('storeMaxScore2', maxScore2);
            });
        },
        methods:{
            confirm() {
                this.newOrders = 0;
            },
            confirm2() {
                this.new_pay_num = 0;
            },
            confirm4() {
                this.new_order_num = 0;
            },
            confirm3() {
                this.config.show3 = false;
            },
            downloadData:function(){
                // let str１ = "订单编号,互助小组编号,是否参加主计划,是否参加附加计划,是否购买蜂巢代售的交强险,是否购买蜂巢代售的三者险,交强险+车船税,30万三者险金额（单选）,车损险金额,盗抢险金额,主计划不计免赔,玻璃险,涉水险,自燃损失险,附计划不计免赔,交强险+车船税金额,30万三者险金额,车损险金额,盗抢险金额,主计划不计免赔,玻璃险,涉水险,自燃损失险	附计划不计免赔,人保商业险总额,安盛天平和人保总金额偏差,蜂巢划痕险,报价数据源,蜂巢主计划（加无法找到第三方）,蜂巢附计划,平安总价(选填）,优惠总金额,蜂巢互助出单状态,交强三者险出单状态,预计加入时间,核保状态,在保状态\n";
                // for(let order of this.allOrder) {
                //     str１ += quotation["id"] + ",\t" + quotation["created_at"] + "," + quotation["vehicle"]["owner"]["name"] + ",\t" + quotation["vehicle"]["owner"]["identity_no"] + ",\t" + quotation["vehicle"]["owner"]["phone"] + ",," + quotation["vehicle"]["license_no"] + "," + quotation["vehicle"]["engine_no"] + "," + quotation["vehicle"]["vin_code"] + "," + quotation["vehicle"]["vehicle_model"]["vehicleName"] + "," + quotation["vehicle"]["vehicle_model"]["purchasePrice"] + ",,\t" + quotation["vehicle"]["register_date"] + "," + quotation["vehicle"]["last_insurance_company"] + "," + quotation["vehicle"]["accident_times"] + ",\t" + quotation["vehicle"]["insurance_due_date"] + "\n";
                // }
                // let str = encodeURIComponent(str１.replace(/undefined/g, "").replace(/null/g, "")); 
                // let uri = 'data:text/csv;charset=utf8,\ufeff' + str;
                // let downloadLink = document.createElement("a");
                // downloadLink.href = uri;
                // downloadLink.download = (new Date()).getTime() + ".csv";
                // document.body.appendChild(downloadLink);
                // downloadLink.click();
                // document.body.removeChild(downloadLink);
            },
            pre(){//上一步
                this.pageLength--;
                let nowScore = (new Date()).getTime();
                this.$store.dispatch('getAllOrders', {start: this.cursor - this.onepagesize -  19, limit: this.cursor - this.onepagesize, maxScore2: this.maxScore2, nowScore: nowScore, sorder_id: this.sorder_id, oownername: this.oownername, ophone: this.ophone, olicense_no: this.olicense_no, obegintime: this.obegintime, oendtime: this.oendtime, ostate: this.ostate}).then( orders => {
                    if(orders.code === 200) { 
                        this.allOrder = orders.data;
                        this.cursor = orders.cursor;
                        this.onepagesize = orders.data.length;
                        this.newOrders = orders.newOrders;
                    }
                });
                if(this.pageLength == 1){
                    this.ableState1 = true;
                }
                else{
                    this.ableState1 = false;
                }
                this.ableState2 = false
                    // this.$store.dispatch('getAllOrders', {start:((this.pageLength-1)*20), limit:((this.pageLength-1)*20 +19)});
                    //     if(this.pageLength == 1){
                    //         this.ableState1 = true;
                    //     }
                    //     else{
                    //         this.ableState1 = false;
                    //     }
                    // this.ableState2 = false;
            },
            next(){//下一步
                this.pageLength++;
                let nowScore = (new Date()).getTime();
                this.$store.dispatch('getAllOrders', {start: this.cursor + 1, limit: this.cursor + 20, maxScore2: this.maxScore2, nowScore: nowScore, sorder_id: this.sorder_id, oownername: this.oownername, ophone: this.ophone, olicense_no: this.olicense_no, obegintime: this.obegintime, oendtime: this.oendtime, ostate: this.ostate}).then((orders)=>{
                    if(orders.code === 200) { 
                        this.allOrder = orders.data;
                        this.cursor = orders.cursor;
                        this.onepagesize = orders.data.length;
                        this.newOrders = orders.newOrders;
                    }
                });
                if(this.pageLength == this.lenPage){//到达最后一页
                    this.ableState2 = true;
                }
                else{
                    this.ableState2 = false; 
                }
                this.ableState1 = false;
            },
            orderId:function(orderid){
                this.$store.dispatch('setOrderId',orderid);
                this.$router.push({
                    path:'/OrderDetails'
                });
            },
            searchOrder:function() {
                var sorder_id = document.getElementById("order_id").value;
                var oownername = document.getElementById("ownername").value;
                var ophone = document.getElementById("phone").value;
                var olicense_no = document.getElementById("license_no").value;
                var obegintime =document.getElementById("begintime").value ? new Date(document.getElementById("begintime").value): null;
                var oendtime = document.getElementById("endtime").value ? new Date(document.getElementById("endtime").value + " 23:59:59"):null;
                var ostate =document.getElementById("state").value ? parseInt(document.getElementById("state").value): null;
                console.log(sorder_id, oownername, ophone, olicense_no, obegintime, oendtime, ostate);
                this.$store.dispatch("storeOrderCondition", {sorder_id, oownername, ophone, olicense_no, obegintime, oendtime, ostate}).then(() => {
                    let maxScore2 = (new Date()).getTime();
                    let nowScore = (new Date()).getTime(); 
                    console.log(this.ostate);
                    this.$store.dispatch('getAllOrders', {start:0, limit:19, maxScore2: maxScore2, nowScore: nowScore, sorder_id: this.sorder_id, oownername: this.oownername, ophone: this.ophone, olicense_no: this.olicense_no, obegintime: this.obegintime, oendtime: this.oendtime, ostate: this.ostate}).then((orders)=>{
                         console.log(JSON.stringify(orders));
                        if(orders.code == 200){
                            this.allOrder = orders.data;
                            this.cursor = orders.cursor;
                            this.ableState1 = true;
                            this.lenPage = Math.ceil(orders.len/20);
                            this.orders_length = orders.len;
                            if(this.lenPage >= 2){
                                this.ableState2 = false;
                            } 
                            else{
                                this.ableState2 = true;
                            }
                        } 
                        this.$store.dispatch('storeMaxScore2', maxScore2);
                    });
                });
            },
        }

    }
</script>
<style lang="sass" scoped>
    .clearfix:after{
        content:".";
        display:block;
        height:0;
        clear:both;
        visibility:hidden
    }
    .paging{
        width:100%;
        height:30px;
        margin:10px auto;
        text-align:center;
        line-height:30px;
    }
	.container{
        width:1353px;
        border:1px solid #ccc;
        margin:0 auto;
        .menu{
            float:left;
        }
        .section{
            width:1150px;
            float:left;
            border-left:1px solid #ccc;
            .search{
                margin:10px;
                margin-top:40px;
                border:1px solid #ccc;
                padding:10px 20px;
                span{
                    margin-left:30px;
                }
                span:first-child{
                    margin-left:0;
                }
                .order{
                    margin-top:10px;
                }
                input[type=submit]{
                    margin-left:30px;
                    padding: 0 10px;
                }
            }
            table{
                border:1px solid #ccc;
                margin: 0 10px;
                width:1128px;
                tr{
                    cursor:pointer;
                }
                td{
                    border:1px solid #ccc;
                    text-align:center;
                    color:#0066FF;
                }
                th{
                    border:1px solid #ccc;
                    text-align:center;
                }
            }
        }
    }
    /***弹出层样式****/
    .makesurepick{
        position: fixed;
        left: 30px;
        width: 250px;
        height: 150px;
        border-radius: 10px;
        background: #000;
        padding: 10px;
        border: 1px solid red;
        text-align: center;
        -webkit-animation-duration: 0.3s;
    }
    .makesurepick0{-webkit-animation-name: skyset;bottom: 30px;color: red;}
    .makesurepick1{bottom: 33px;color: #fff;}
    .makesurepick2{bottom: 36px;color: blue;}
    .makesurepick3{bottom: 39px;color: yellow;}
    .searchButton {
        padding: 3px 20px;
        margin-left: 50px;
    }
</style>