<template>
	<div class="container clearfix">
        <ListMenu class="menu"></ListMenu> 
        <div class="section">
            <div class="search">
                <div>
                    <span>车架号：</span>
                    <input type="text" v-bind:value = svehicleid id="vehicleid">
                    <span>用户姓名：</span>
                    <input type="text" v-bind:value = sownername id="ownername">
                    <span>手机号：</span>
                    <input type="text" v-bind:value = sphone id="phone">
                    <span>车牌号：</span>
                    <input type="text" v-bind:value = slicense_no id="license_no" >
                </div>
                <div class="order">
                    <span>生成时间：</span>
                    <input type="date" v-bind:value = sbegintime?sbegintime:null id="begintime">——
                    <input type="date" v-bind:value = sendtime?sendtime:null id="endtime">
                    <span>报价状态</span>
                    <select v-bind:value = sstate id="state">
                        <option value="1">未报价</option>
                        <option value="3">已报价</option>
                        <option value="4">已失效</option>
                    </select>
                    <button class="searchButton" @click="searchquotation()">查询</button>
                    <button class="searchButton" @click="downloadData()">下载本页数据</button> 
                </div>
            </div>
            <div class="flex" id="tabs">
                <div class="left div" @click="tab($event)">
                    <p>未报价</p>
                </div>
                <div class="right div" @click="tab($event)">
                    <p>已报价</p>
                </div>
            </div>
            <div id="divs">
                <div>
                    <table>
                        <thead
                            <th>报价编号</th>
                            <th>用户姓名</th>
                            <th>手机号</th>
                            <th>车牌号</th>
                            <th>发动机号</th>
                            <th>生成时间</th>
                            <th>报价状态</th>
                            <th>备注</th>
                        </thead>
                            <!--{{unquotated.data}}-->
                        <tr v-for="a of unquotated" @click="quotationId(a.id,a.vid)">                          
                            <td>{{a.id}}</td>
                            <td v-if="a.vehicle">{{a.vehicle.owner.name}}</td>
                            <td v-if="a.vehicle">{{a.vehicle.owner.phone}}</td>
                            <td v-if="a.vehicle"><span v-if="a.vehicle.license_no != null">{{a.vehicle.license_no}}</span><span v-else>新车未上牌</span></td>
                            <td v-if="a.vehicle">{{a.vehicle.engine_no}}</td>
                            <td>{{ a.created_at | date}}</td>
                            <td style="color:green" v-if="a.state === 1">未报价</td>
                            <td style="color:blue"  v-if="a.state === 4">已失效</td>
                            <td>{{a.state}}</td>
                        </tr>
                    </table>
                </div>
                <div style="display: none;">
                    <table>
                        <thead>
                            <th>报价编号</th>
                            <th>用户姓名</th>
                            <th>手机号</th>
                            <th>车牌号</th>
                            <th>发动机号</th>
                            <th>生成时间</th>
                            <th>报价状态</th>
                            <th>备注</th>
                        </thead>
                        <!--{{quotated}}-->
                        <tr v-for="a of quotated" @click="quotationId(a.id,a.vid)" >                          
                            <td>{{a.id}}</td>
                            <td v-if="a.vehicle">{{a.vehicle.owner.name}}</td>
                            <td v-if="a.vehicle">{{a.vehicle.owner.phone}}</td>
                            <td v-if="a.vehicle"><span v-if="a.vehicle.license_no != null">{{a.vehicle.license_no}}</span><span v-else>新车未上牌</span></td>
                            <td v-if="a.vehicle">{{a.vehicle.engine_no}}</td>
                            <td>{{ a.created_at | date}}</td>
                            <td style="color:red" v-if="a.state === 3">已报价</td>
                            <td style="color:blue" v-if="a.state === 4">已失效</td>
                            <td>{{a.state}}</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="paging">
                <button :disabled="ableState1" @click="pre()">上一页</button>
                <span>&nbsp&nbsp第</span>
                <span>{{pageLength}}</span>
                <span>页&nbsp&nbsp</span>
                <button :disabled="ableState2" @click="next()">下一页</button>
                <span>&nbsp&nbsp共</span>
                <span v-if ="partState == 0">&nbsp{{lenPage2}}&nbsp</span>
                <span v-if ="partState == 1">&nbsp{{lenPage1}}&nbsp</span><span>页</span>
                <span v-if ="partState == 0">总记录数：{{unquotated_length}}</span>
                <span v-if ="partState == 1">总记录数：{{quotated_length}}</span>
            </div>
        </div>
        <div class="makesurepick makesurepick0" v-if="newUnquotated > 0" >
            <h4>有{{newUnquotated}}条新未报价，查看请刷新！<br></h4>
            <button style="float: none;" class="footer-button" @click="confirm()">知道了</button>
        </div>
        <div class="makesurepick makesurepick0" v-if="newQuotated > 0" >
            <h4>有{{newQuotated}}条新已报价，查看请刷新！<br></h4>
            <button style="float: none;" class="footer-button" @click="confirm1()">知道了</button>
        </div>
        <div class="makesurepick makesurepick0" v-if="new_quotate_num > 0" >
            <h4>您尚有{{new_quotate_num}}条新报价未处理！<br></h4>
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
                if(value != null){
                    var date = new Date(value);
                    var year = date.getFullYear();
                    var month = (date.getMonth() + 1) < 10? "0" + (date.getMonth() + 1):(date.getMonth() + 1);
                    var day = date.getDate()<10?"0" + date.getDate():date.getDate();
                    var hour = date.getHours()<10?"0" + date.getHours():date.getHours();
                    var minute = date.getMinutes()<10? "0" + date.getMinutes():date.getMinutes();
                    var second = date.getSeconds()<10? "0" + date.getSeconds():date.getSeconds();
                    var date2 = year + "/" + month + "/"  + day + "  "  + hour + ":" + minute + ":" + second;
                    return date2;
                }
            }
        },
        data(){
            return{
                unquotated_num: 0,
                new_quotate_num: 0,
                new_order_num: 0,
                new_pay_num: 0,
                difference: 0,
                unquotated_length: 0,
                quotated_length: 0,
                config:{
                    show1: true,
                    show2: true,
                    show3: true,
                    show4: true
                },
                pageLength: 1,//当前页面的显示
                ableState1: true,//按钮是否可用上一页
                ableState2: true,//按钮是否可用 下一页
                lenPage1:0,//保存已报价的用户的数量的分页数
                lenPage2:0,//保存未报价的用户的数量的分页数
                partState:0,//保存用户点击的显示的部分
                quotated: null,
                unquotated: null,
                newUnquotated:0,
                newQuotated:0,
                cursor:0,
                onepagesize:0,
            }
        },
        components:{
            ListMenu,
        },
        computed: mapGetters({
            getUnquotatedStatus: 'getUnquotatedStatus',
            getquotatedstatus: 'getquotatedstatus',
            qid: 'quotationid',
            vid: 'vehicleId',
            maxScore: 'maxScore',
            svehicleid:'svehicleid',
            sownername:'sownername',
            sphone:'sphone',
            slicense_no:'slicense_no',
            sbegintime:'sbegintime',
            sendtime:'sendtime',
            sstate:'sstate',
        }),
        created () {
            //newMessageNotify
            this.$store.dispatch('newMessageNotify').then((message) => {
                if(message.code === 200){
                    this.new_quotate_num = message.data.quotations;
                    this.new_order_num = message.data.orders;
                    this.new_pay_num = message.data.pays;
                }

            }).catch(err =>{
                console.log("err" + err);
            });

            //paging
            if(this.pageLength === 1){
              this.ableState1 = true;
            }
            let maxScore = (new Date()).getTime() + 24 * 60 * 60 * 1000;
            let nowScore = (new Date()).getTime() + 24 * 60 * 60 * 1000; 
            this.$store.dispatch('getUnQuotatedQuotations', {start: 0, limit: 9, maxScore: maxScore, nowScore: nowScore, svehicleid: this.svehicleid, sownername: this.sownername, sphone: this.sphone, slicense_no: this.slicense_no, sbegintime: this.sbegintime, sendtime: this.sendtime, sstate: this.sstate}).then((unquotated)=>{
                if(unquotated.code == 200){ 
                    this.unquotated = unquotated.data;
                    this.cursor = unquotated.cursor;
                    this.lenPage2 = Math.ceil(unquotated.len/10);
                    this.onepagesize = unquotated.data.length;
                    this.unquotated_length = unquotated.len;
                    if(this.lenPage2 >= 2){
                        this.ableState2 = false;
                    } else{
                        this.ableState2 = true;
                    }
                } 
                this.$store.dispatch('storeMaxScore', maxScore);
            });
        },
        methods:{
            //paging
            pre(){//上一步
                this.pageLength--;
                if(this.partState == 0){
                    let nowScore = (new Date()).getTime();
                    this.$store.dispatch('getUnQuotatedQuotations', {start: this.cursor - this.onepagesize -  9, limit: this.cursor - this.onepagesize, maxScore: this.maxScore, nowScore: nowScore, svehicleid: this.svehicleid, sownername: this.sownername, sphone: this.sphone, slicense_no: this.slicense_no, sbegintime: this.sbegintime, sendtime: this.sendtime, sstate: this.sstate}).then( unquotated => {
                        if(unquotated.code === 200) { 
                            this.unquotated = unquotated.data;
                            this.cursor = unquotated.cursor;
                            this.onepagesize = unquotated.data.length;
                            this.newUnquotated = unquotated.newUnquotated;
                        }
                    });
                    if(this.pageLength == 1){
                        this.ableState1 = true;
                    }
                    else{
                        this.ableState1 = false;
                    }
                    this.ableState2 = false;
                }
                if(this.partState == 1){
                    let nowScore = (new Date()).getTime();
                    this.$store.dispatch('getQuotatedQuotations', {start: this.cursor - this.onepagesize - 9, limit: this.cursor - this.onepagesize, maxScore: this.maxScore, nowScore: nowScore, svehicleid: this.svehicleid, sownername: this.sownername, sphone: this.sphone, slicense_no: this.slicense_no, sbegintime: this.sbegintime, sendtime: this.sendtime, sstate: this.sstate}).then( quotated => {
                        if(quotated.code === 200) { 
                            this.quotated = quotated.data;
                            this.cursor = quotated.cursor;
                            this.onepagesize = quotated.data.length;
                            this.newQuotated = quotated.newQuotated;
                        }
                    });
                        if(this.pageLength == 1){
                            this.ableState1 = true;
                        }
                        else{
                            this.ableState1 = false;
                        }
                    this.ableState2 = false;
                }
                
            },
            next(){//下一步
                if(this.partState === 0){
                    let nowScore = (new Date()).getTime(); 
                    console.log(":this.cursor: " + this.cursor)
                    this.$store.dispatch('getUnQuotatedQuotations', {start: this.cursor + 1, limit: this.cursor + 10, maxScore: this.maxScore, nowScore: nowScore, svehicleid: this.svehicleid, sownername: this.sownername, sphone: this.sphone, slicense_no: this.slicense_no, sbegintime: this.sbegintime, sendtime: this.sendtime, sstate: this.sstate}).then((unquotated)=>{
                        if(unquotated.code === 200) { 
                            this.unquotated = unquotated.data;
                            this.cursor = unquotated.cursor;
                            this.onepagesize = unquotated.data.length;
                            this.newUnquotated = unquotated.newUnquotated;
                        }
                    });
                }
               if(this.partState === 1){
                    let nowScore = (new Date()).getTime();
                    this.$store.dispatch('getQuotatedQuotations', {start: this.cursor + 1, limit: this.cursor + 10, maxScore: this.maxScore, nowScore: nowScore, svehicleid: this.svehicleid, sownername: this.sownername, sphone: this.sphone, slicense_no: this.slicense_no, sbegintime: this.sbegintime, sendtime: this.sendtime, sstate: this.sstate}).then((quotated)=>{
                        if(quotated.code === 200) { 
                            this.quotated = quotated.data;
                            this.cursor = quotated.cursor;
                            this.onepagesize = quotated.data.length;
                            this.newQuotated = quotated.newQuotated;
                        }
                    });
                }
                this.pageLength++;
                if(this.partState === 0){
                    if(this.pageLength == this.lenPage2){//到达最后一页
                        this.ableState2 = true;
                    } else {
                        this.ableState2 = false; 
                    }
                    this.ableState1 = false;
                }
                if(this.partState === 1){
                    if(this.pageLength === this.lenPage1){//到达最后一页
                        this.ableState2 = true;
                    } else {
                        this.ableState2 = false; 
                    }
                    this.ableState1 = false;
                }
            },
            tab:function(event){
                var tabs=document.getElementById("tabs").getElementsByClassName("div");
                var divs=document.getElementById("divs").getElementsByTagName("div");
                var obj = event.currentTarget;
                for(var i=0;i<tabs.length;i++)
                {
                    if(tabs[i]==obj){
                        tabs[i].className="left div";
                        divs[i].style.display='block';
                        this.partState = i;//保存用户点击了显示的部分
                    }
                    else{
                        tabs[i].className="right div";
                        divs[i].style.display='none';
                    }
                }
                this.pageLength = 1;
                if(this.partState === 1){
                    let maxScore = (new Date()).getTime();
                    let nowScore = (new Date()).getTime();
                    this.$store.dispatch('getQuotatedQuotations', {start:0, limit:9, maxScore: maxScore, nowScore: nowScore, svehicleid: this.svehicleid, sownername: this.sownername, sphone: this.sphone, slicense_no: this.slicense_no, sbegintime: this.sbegintime, sendtime: this.sendtime, sstate: this.sstate}).then((quotated) =>{
                            if(quotated.code == 200){
                                this.quotated = quotated.data;
                                this.cursor = quotated.cursor;
                                this.onepagesize = quotated.data.length;
                                this.lenPage1 = Math.ceil(quotated.len/10);
                                this.quotated_length = quotated.len;
                                if(this.lenPage1 >= 2){
                                    this.ableState2 = false;
                                }
                                else{
                                    this.ableState2 = true;
                                }
                            } 
                        this.$store.dispatch('storeMaxScore', maxScore);
                    });
                }
                if(this.partState === 0){
                    let maxScore = (new Date()).getTime();
                    let nowScore = (new Date()).getTime(); 
                    this.$store.dispatch('getUnQuotatedQuotations', {start:0, limit:9, maxScore: maxScore, nowScore: nowScore, svehicleid: this.svehicleid, sownername: this.sownername, sphone: this.sphone, slicense_no: this.slicense_no, sbegintime: this.sbegintime, sendtime: this.sendtime, sstate: this.sstate}).then((unquotated)=>{
                        if(unquotated.code == 200){ 
                            this.unquotated = unquotated.data;
                            this.cursor = unquotated.cursor;
                            this.onepagesize = unquotated.data.length;
                            this.lenPage2 = Math.ceil(unquotated.len/10);
                            this.unquotated_length = unquotated.len;
                            if(this.lenPage2 >= 2){
                                this.ableState2 = false;
                            } 
                            else{
                                this.ableState2 = true;
                            }
                        } 
                        this.$store.dispatch('storeMaxScore', maxScore);
                    });
                }
                this.ableState1 = true;
            },
            quotationId:function(quotationid,vehicleid){
                this.$store.dispatch('setQuotationId',quotationid);
                this.$store.dispatch('setVehicleId',vehicleid);
                this.$router.push({
                    path:'/QuotationDetails'
                });
            },
            confirm() {
                this.newUnquotated = 0;
            },
            confirm1() {
                this.newQuotated = 0;
            },
            confirm2() {
                this.new_quotate_num = 0;
            },
            searchquotation:function(){
                var svehicleid = document.getElementById("vehicleid").value;
                var sownername = document.getElementById("ownername").value;
                var sphone = document.getElementById("phone").value;
                var slicense_no = document.getElementById("license_no").value;
                var sbegintime =document.getElementById("begintime").value ? new Date(document.getElementById("begintime").value): null;
                var sendtime = document.getElementById("endtime").value ? new Date(document.getElementById("endtime").value + " 23:59:59"):null;
                var sstate =document.getElementById("state").value ? parseInt(document.getElementById("state").value): null;
                this.$store.dispatch("storeCondition", {svehicleid, sownername, sphone, slicense_no, sbegintime, sendtime, sstate}).then(() => {
                    if (this.partState === 0) {
                        let maxScore = (new Date()).getTime();
                        let nowScore = (new Date()).getTime(); 
                        this.$store.dispatch('getUnQuotatedQuotations', {start:0, limit:9, maxScore: maxScore, nowScore: nowScore, svehicleid: this.svehicleid, sownername: this.sownername, sphone: this.sphone, slicense_no: this.slicense_no, sbegintime: this.sbegintime, sendtime: this.sendtime, sstate: this.sstate}).then((unquotated)=>{
                            if(unquotated.code == 200){ 
                                this.unquotated = unquotated.data;
                                this.cursor = unquotated.cursor;
                                this.onepagesize = unquotated.data.length;
                                this.lenPage2 = Math.ceil(unquotated.len/10);
                                this.unquotated_length = unquotated.len;
                                if(this.lenPage2 >= 2){
                                    this.ableState2 = false;
                                } 
                                else{
                                    this.ableState2 = true;
                                }
                            } 
                            this.$store.dispatch('storeMaxScore', maxScore);
                        });
                    } else {
                        let maxScore = (new Date()).getTime();
                        let nowScore = (new Date()).getTime();
                        this.$store.dispatch('getQuotatedQuotations', {start:0, limit:9, maxScore: maxScore, nowScore: nowScore, svehicleid: this.svehicleid, sownername: this.sownername, sphone: this.sphone, slicense_no: this.slicense_no, sbegintime: this.sbegintime, sendtime: this.sendtime, sstate: this.sstate}).then((quotated) =>{
                                if(quotated.code == 200){
                                    this.quotated = quotated.data;
                                    this.cursor = quotated.cursor;
                                    this.onepagesize = quotated.data.length;
                                    this.lenpage1 = Math.ceil(quotated.len/10);
                                    this.quotated_length = quotated.len;
                                    if(this.lenpage1 >= 2){
                                        this.ableState2 = false;
                                    }
                                    else{
                                        this.ableState2 = true;
                                    }
                                } 
                            this.$store.dispatch('storeMaxScore', maxScore);
                        });
                    }
                });
            },
            downloadData:function() {
                let str１ = "报价编号,登记日期,互助会员姓名,互助会员身份证号,手机号,渠道,车牌号,发动机号,车架号,配置型号,不含税新车购置价,车辆实际价值,车辆注册日期,最近一次投保保险公司,出险记录查询,保险到期时间\n";
                if (this.partState === 0) {
                    for(let quotation of this.unquotated) {
                        str１ += quotation["id"] + ",\t" + quotation["created_at"] + "," + quotation["vehicle"]["owner"]["name"] + ",\t" + quotation["vehicle"]["owner"]["identity_no"] + ",\t" + quotation["vehicle"]["owner"]["phone"] + ",," + quotation["vehicle"]["license_no"] + "," + quotation["vehicle"]["engine_no"] + "," + quotation["vehicle"]["vin_code"] + "," + quotation["vehicle"]["vehicle_model"]["vehicleName"] + "," + quotation["vehicle"]["vehicle_model"]["purchasePrice"] + ",,\t" + quotation["vehicle"]["register_date"] + "," + quotation["vehicle"]["last_insurance_company"] + "," + quotation["vehicle"]["accident_times"] + ",\t" + quotation["vehicle"]["insurance_due_date"] + "\n";
                    }
                } else {
                    for(let quotation of this.quotated) {
                        str１ += quotation["id"] + ",\t" + quotation["created_at"] + "," + quotation["vehicle"]["owner"]["name"] + ",\t" + quotation["vehicle"]["owner"]["identity_no"] + ",\t" + quotation["vehicle"]["owner"]["phone"] + ",," + quotation["vehicle"]["license_no"] + "," + quotation["vehicle"]["engine_no"] + "," + quotation["vehicle"]["vin_code"] + "," + quotation["vehicle"]["vehicle_model"]["vehicleName"] + "," + quotation["vehicle"]["vehicle_model"]["purchasePrice"] + ",,\t" + quotation["vehicle"]["register_date"] + "," + quotation["vehicle"]["last_insurance_company"] + "," + quotation["vehicle"]["accident_times"] + ",\t" + quotation["vehicle"]["insurance_due_date"] + "\n";
                    }
                }
                let str = encodeURIComponent(str１.replace(/undefined/g, "").replace(/null/g, "")); 
                let uri = 'data:text/csv;charset=utf8,\ufeff' + str;
                let downloadLink = document.createElement("a");
                downloadLink.href = uri;
                downloadLink.download = (new Date()).getTime() + ".csv";
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
            }
        }
    }
</script>
<style lang="sass" scoped>
    .paging{
        width:100%;
        height:30px;
        margin:10px auto;
        text-align:center;
        line-height:30px;
    }
    .pageClass{
        border:1px solid #cacaca;
        padding: 2px;
        margin-left: 10px;
         margin-right: 10px;
    }
    .color{
        background:cyan;
    }
    .clearfix:after{
        content:".";
        display:block;
        height:0;
        clear:both;
        visibility:hidden
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
        .flex{
            display:flex;
            justify-content:space-between;
            margin: 10px;
            .left{
                color: #eb6100;
                line-height: 30px;
                text-align: center;
                width: 50%;
                font-size: 20px;
                font-weight: 700;
                border: 1px solid #eb6100;
                
            }
            .right{
                color: #585858;
                width: 50%;
                text-align: center;
                line-height: 30px;
                font-size: 20px;
                font-weight: 700;
                background: #f5f5f5;
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
    @-webkit-keyframes skyset {
        from{
            bottom: -1px;
        }
        to{
            bottom: 30px;
        }
    }
    .searchButton {
        padding: 3px 20px;
        margin-left: 50px;
    }
</style>