<template>
    <div class="container clearfix">
        <ListMenu class="menu"></ListMenu>
        <div class="section">
            <div class="box">
                <div class="title">基本信息</div>
                <div class="info" v-if=!getQuotationApiStatus>
                    <span v-if="quotation.code == 200">报价编号：{{quotation.data.id}}</span>
                    <span v-if="quotation.code == 200">vid：{{quotation.data.vehicle.id}}</span>
                </div>
                <div class="info">
                    <div class="title">用户信息（个人）</div>
                     <!--{{megatronVehicle.data}}-->
                    <div class="detail">
                        <div v-if=megatronLoading>
                            <img src="http://hive-data.oss-cn-beijing.aliyuncs.com/upload/wx/images/loading.gif" alt="" width="30">数据加载中。。。
                        </div>
                        <ul class="user" v-else>
                            <div v-if='megatronVehicle != null'>
                               
                                <li v-if='megatronVehicle.code == 200'><span>姓名:</span>{{megatronVehicle.data.owner.name}}</li>
                                <li v-if='megatronVehicle.code == 200'><span>身份证号:</span>{{megatronVehicle.data.owner.identity_no}}</li>
                                <li v-if='megatronVehicle.code == 200'><span>手机号:</span>{{megatronVehicle.data.owner.phone}}</li>
                            </div>
                        </ul>
                    </div>
                </div>
                <div class="info">
                    <div class="title">车辆信息</div>
                    <div v-if=megatronLoading>
                        <img src="http://hive-data.oss-cn-beijing.aliyuncs.com/upload/wx/images/loading.gif" alt="" width="30">数据加载中。。。
                    </div>
                    <div class="detail" v-if=!megatronLoading>
                        <div v-if='megatronVehicle != null'>
                            <ul class="user" v-if="megatronVehicle.code == 200">
                                <!--{{megatronVehicle}}-->
                                <li><span>车牌号:</span>{{megatronVehicle.data.license_no?megatronVehicle.data.license_no:'新车未上牌'}}</li>
                                <li><span>发动机号:</span>{{megatronVehicle.data.engine_no}}</li>
                                <li><span>车架号:</span>{{megatronVehicle.data.vehicle_model.vin_code}}</li>
                                <li><span>品牌型号:</span>{{megatronVehicle.data.vehicle_model.familyName}}</li>
                                <li><span>配置级别:</span>{{megatronVehicle.data.vehicle_model.cfgLevel}}</li>
                                <li v-if = megatronVehicle.data.vehicle_model.yearPattern><span>年款:</span>{{megatronVehicle.data.vehicle_model.yearPattern}}</li>
                                <li><span>排气量:</span>{{megatronVehicle.data.vehicle_model.pl}}L</li>
                                <li><span>手动自动:</span>{{megatronVehicle.data.vehicle_model.gearboxName}}</li>
                                <li><span>配置型号:</span>{{megatronVehicle.data.vehicle_model.vehicleName}}</li>
                                <li v-if=megatronVehicle.data.receipt_no><span>新车购置发票号:</span>{{megatronVehicle.data.receipt_no}}</li>
                                <li v-if=megatronVehicle.data.receipt_date><span>发票开票日期:</span>{{megatronVehicle.data.receipt_date}}</li>
                                <li><span>燃料类型:</span>{{megatronVehicle.data.fuel_type}}</li>
                                <li><span>年平均行驶里程:</span>{{megatronVehicle.data.average_mileage}}</li>
                                <li><span>车辆购置价格:</span>{{megatronVehicle.data.vehicle_model.purchasePriceTax}}元</li>
                                <li><span>是否过户车辆:</span><span v-if=megatronVehicle.data.is_transfer>是</span><span v-else>否</span></li>
                                <li><span>最近一次投保的保险公司:</span>{{megatronVehicle.data.last_insurance_company}}</li>
                                <li v-if=megatronVehicle.data.insurance_due_date><span>保险到期时间:</span>{{megatronVehicle.data.insurance_due_date}}</li>
                                <li><span>车辆赔付限额:</span>{{megatronquotaNum}}元</li>
                                <li v-if=megatronVehicle.data.register_date><span>车辆注册日期:</span>{{megatronVehicle.data.register_date}}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="info papers">
                    <a href="">查看证件信息</a>

                </div>
            </div>
            <div class="box">
                <div class="title">报价信息</div>
                <div class="info">
                    <div class="left" v-if="megatronVehicle.data.accident_times">
                        <span>近12个月出险次数:</span>
                        <label style="color:red">{{megatronVehicle.data.accident_times}}</label>
                    </div>
                    <div class="left" v-else>
                        <span>近12个月出险次数</span>
                        <select id="select1" v-model="occurrenceNumber">
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">3次以上</option>
                        </select>
                        <button @click="accidentTimes()">提交</button>
                    </div>
                    <div v-if=getQuotationApiStatus>
                        <img src="http://hive-data.oss-cn-beijing.aliyuncs.com/upload/wx/images/loading.gif" alt="" width="30">数据加载中。。。
                    </div>
                    <div class="left" v-if=!getQuotationApiStatus>
                        <div v-if='quotation.code == 200'>
                            <span>当前状态:</span>
                            <span v-if="quotation.data.state == 3" style="color:red">已报价</span>
                            <span v-if="quotation.data.state == 1" style="color:green">未报价</span>
                            <span v-if="quotation.data.state == 4" style="color:blue">已失效</span>
                            <router-link to="Quotation">
                                <button v-if="quotation.data.state == 3">查询报价</button>
                                <button v-else disabled>查询报价</button>
                            </router-link>
                        </div>
                    </div>
                </div>
                <div class="info clearfix" id="plans">
                    <div>车辆实际价值<input type="number" v-model=megatronquotaNum>元</div>
                    <div class="plan_titles clearfix">
                        <div class="plan_title">主计划部分</div>
                        <div class="plan_title">附计划部分</div>
                        <div class="plan_title">代卖保险部分</div>
                    </div>

                    <div class="plan_sections clearfix">
                        <div class="plan_section">
                            <div class="calculate clearfix">
                                <span>机动车损失保障</span>
                                <div class="inputnum">
                                    <input type="number" v-model=cal1 @keyup="inputCalculate()">
                                    <p>×不计免赔115%×折扣比例65%</p>
                                    <input type="number" disabled v-model=res1>
                                </div>
                            </div>
                            <div class="calculate clearfix">
                                <span>机动车全车盗抢</span>
                                <div class="inputnum">
                                    <input type="number" v-model=cal2 @keyup="inputCalculate()">
                                    <p>×不计免赔120%×折扣比例65%</p>
                                    <input type="number" disabled v-model=res2>
                                </div>
                            </div>
                            <div class="calculate clearfix">
                                <span>无法找到第三方</span>
                                <div class="inputnum">
                                    <input type="number" disabled v-model=res3>
                                </div>
                            </div>
                        </div>

                        <div class="plan_section">
                            <div class="calculate clearfix">
                                <span>机动车自燃损失</span>
                                <div class="inputnum">
                                    <input type="number" v-model=cal4 @keyup="inputCalculate()">
                                    <p>×不计免赔120%×折扣比例65%</p>
                                    <input type="number" disabled v-model=res4>
                                </div>
                            </div>
                            <div class="calculate clearfix">
                                <span>机动车涉税损失</span>
                                <div class="inputnum">
                                    <input type="number" v-model=cal5 @keyup="inputCalculate()">
                                    <p>×不计免赔115%×折扣比例65%</p>
                                    <input type="number" disabled v-model=res5>
                                </div>
                            </div>
                            <div class="calculate clearfix">
                                <span>车身划痕损失(3)</span>
                                <div class="inputnum">
                                    <input type="number" disabled v-model=megatronscratch> 
                                </div>
                            </div>
                            <div class="calculate clearfix">
                                <span>车身划痕损失(6)</span>
                                <div class="inputnum">
                                    <input type="number" disabled v-model=megatronscratch2> 
                                </div>
                            </div>
                            <div class="calculate clearfix">
                                <span>玻璃单独破碎</span>
                                <div class="inputnum">
                                    <input type="number" v-model=cal7 @keyup="inputCalculate()">
                                    <p>×折扣比例65%</p>
                                    <input type="number" disabled v-model=res7>
                                </div>
                            </div>
                        </div>
                        <div class="plan_section">
                            <div class="calculate clearfix">
                                <span>交强险+车船税</span>
                                <div class="inputnum">
                                    <input type="number" v-model=cal8 @keyup="inputCalculate()">
                                    <p></p>
                                    <input type="number" disabled v-model=res8>
                                </div>
                            </div>
                            <div class="calculate clearfix">
                                <span>第三者责任险</span>
                                <div class="inputnum others">
                                    <div class="clearfix">
                                        <div class="fl">
                                            <input type="number" v-model=tcal1 @keyup="inputCalculate()">
                                            <p>档次：5万</p>
                                        </div>
                                        <div class="fl">
                                            <input type="number" v-model=tcal2 @keyup="inputCalculate()">
                                            <p>档次：10万</p>
                                        </div>
                                        <div class="fl">
                                            <input type="number" v-model=tcal3 @keyup="inputCalculate()">
                                            <p>档次：15万</p>
                                        </div>
                                        <div class="fl">
                                            <input type="number" v-model=tcal4 @keyup="inputCalculate()">
                                            <p>档次：20万</p>
                                        </div>
                                        <div class="fl">
                                            <input type="number" v-model=tcal5 @keyup="inputCalculate()">
                                            <p>档次：30万</p>
                                        </div>
                                        <div class="fl">
                                            <input type="number" v-model=tcal6 @keyup="inputCalculate()">
                                            <p>档次：50万</p>
                                        </div>
                                        <div class="fl">
                                            <input type="number" v-model=tcal7 @keyup="inputCalculate()">
                                            <p>档次：100万</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="reference">
                        <div>
                            <span class="title">安盛天平报价</span>
                            <span>主计划折扣前总价</span>
                            <input type="number" disabled v-model=sum1>
                            <span>附加计划折扣前总价</span>
                            <input type="number" disabled v-model=sum2>
                            <input type="file">上传截图
                        </div>
                        <div>
                            <span class="title">人保参考价</span>
                            <span>主计划折扣前总价</span>
                            <input type="number" v-model=reference1 @keyup="calReference()">
                            <span>附加计划折扣前总价</span>
                            <input type="number" v-model=reference2 @keyup="calReference()">
                            <input type="file">上传截图
                        </div>
                        <div>
                            <span class="title">偏差</span>
                            <span></span>
                            <input type="number" disabled v-model=offset1>
                            <span></span>
                            <input type="number" disabled v-model=offset2>
                        </div>
                    </div>

                    <div class="promotion" v-if=!megatronLoading>
                        <div class="title">是否有优惠券</div>
                        <span v-if=megatronticketinfo>优惠简介:<span v-if='megatronticketinfo.code == 200 &&megatronticketinfo.data && megatronticketinfo.data.title'>{{megatronticketinfo.data.title}}</span></span>
                        <span v-else>优惠简介:</span>
                        <span>优惠金额</span>
                        <input type="number" v-model=promotion>
                        <span>折扣形式</span>
                        <select>
                            <option value="">到期返还</option>
                        </select>
                        <div class="button">
                            <div v-if=megatronLoading>
                                <img src="http://hive-data.oss-cn-beijing.aliyuncs.com/upload/wx/images/loading.gif" alt="" width="30">数据加载中。。。
                            </div>
                            <div v-else v-if=!getQuotationApiStatus>
                                <button @click="subimtQutation()" id="button">提交审核</button><br>
                            </div>
                            <router-link to="Ok">
                                <button @click="notifyQuotation()" id="button2" disabled>通知用户精准报价</button><br>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import ListMenu from '../components/ListMenu.vue' 
    import {mapGetters} from 'vuex'
    import * as queryString from "querystring";
    import * as http from "http";
	export default {
        data(){
            return{
                bjmp1:0.00,
                bjmp2:0.00,
                bjmp3:0.00,
                bjmp4:0.00,
                cal1: 0.00,
                cal2: 0.00,
                cal4: 0.00,
                cal5: 0.00,
                cal7: 0.00,
                cal8: 0.00,
                res1: 0.00,
                res2: 0.00,
                res3: 0.00,
                res4: 0.00,
                res5: 0.00,
                res6: 0.00,
                res7: 0.00,
                res8: 0.00,
                tcal1: 0.00,
                tcal2: 0.00,
                tcal3: 0.00,
                tcal4: 0.00,
                tcal5: 0.00,
                tcal6: 0.00,
                tcal7: 0.00,
                sum1: 0.00,
                sum2: 0.00,
                reference1: 0.00,
                reference2: 0.00,
                offset1: 0,
                offset2: 0,
                promotion: 0,
                occurrenceNumber: 0,
            }
        },
        methods:{
            inputCalculate:function(){
                this.res1 = (this.cal1*1.15*0.65).toFixed(2); 
                this.res2 = (this.cal2*1.2*0.65).toFixed(2);      
                this.res3 = (this.cal1*0.65*0.025).toFixed(2);     
                this.res4 = (this.cal4*1.2*0.65).toFixed(2);   
                this.res5 = (this.cal5*1.15*0.65).toFixed(2);  
                this.res7 = (this.cal7*0.65).toFixed(2);  
                this.res8 = (this.cal8*1).toFixed(2);     
                this.bjmp1 = (this.cal1*1.15).toFixed(2); 
                this.bjmp2 = (this.cal2*1.2).toFixed(2); 
                this.bjmp3 = (this.cal4*1.2).toFixed(2); 
                this.bjmp4 = (this.cal5*1.15).toFixed(2); 
                this.sum1 = (this.cal1*1+this.cal2*1+this.res3*1).toFixed(2);   
                this.sum2 = (this.cal4*1+this.cal5*1+this.megatronscratch+this.cal7*1).toFixed(2);   
            },
            calReference:function(){
                this.offset1 = (Math.abs(this.sum1-this.reference1)/this.sum1).toFixed(2)*100+"%";
                this.offset2 = (Math.abs(this.sum2-this.reference2)/this.sum2).toFixed(2)*100+"%";
            },
            subimtQutation:function(){
                let groups = [
                    {   
                        pid:'00000000-0000-0000-0000-000000000001',
                        items: 
                        [ 
                            {
                                piid: "00000000-0000-0000-0000-000000000005",//1
                                quotas: [
                                    {
                                        num:this.megatronquotaNum,
                                        unit:'元'
                                    }
                                ],
                                prices: [
                                    {
                                        real_price:this.res1,
                                        price:this.bjmp1
                                    }
                                ]
                            },
                            {
                                piid: "00000000-0000-0000-0000-000000000006",//2
                                quotas: [
                                    {
                                        num:this.megatronquotaNum,
                                        unit:'元'
                                    }
                                ],
                                prices: [
                                    {
                                        real_price:this.res2,
                                        price:this.bjmp2,
                                    }
                                ]
                            },
                            {
                                piid: "00000000-0000-0000-0000-000000000007",//3
                                quotas: [
                                    {
                                        num:this.megatronquotaNum,
                                        unit:'元'
                                    }
                                ],
                                prices: [
                                    {
                                        real_price:this.res3,
                                        price:this.res3
                                    }
                                ]
                            },
                            {
                                piid: "00000000-0000-0000-0000-000000000001",//4
                                quotas: [
                                    {
                                        num:this.megatronquotaNum,
                                        unit:'元'
                                    }
                                ],
                                prices: [
                                    {
                                        real_price:this.res4,
                                        price:this.bjmp3,
                                    }
                                ]
                            },
                            {
                                piid: "00000000-0000-0000-0000-000000000002",//5
                                quotas: [
                                    {
                                        num:0,
                                        unit:""
                                    }
                                ],
                                prices: [
                                    {
                                        real_price:this.res5,
                                        price:this.bjmp4,
                                    }
                                ]
                            },
                            {
                                piid: "00000000-0000-0000-0000-000000000003",//6
                                quotas: [
                                    {
                                        num:3,
                                        unit:'块漆'
                                    },
                                    {
                                        num:6,
                                        unit:'块漆'
                                    }
                                ],
                                prices: [
                                    {
                                        real_price:this.megatronscratch,
                                        price:this.megatronscratch
                                    },
                                    {
                                        real_price:this.megatronscratch2,
                                        price:this.megatronscratch2
                                    }
                                ]
                            },
                            {
                                piid: "00000000-0000-0000-0000-000000000004",//7
                                quotas: [
                                    {
                                        num:this.megatronquotaNum,
                                        unit:'元'
                                    }
                                ],
                                prices: [
                                    {
                                        real_price:this.res7,
                                        price:this.cal7
                                    }
                                ]
                            },
                            {
                                piid: "00000000-0000-0000-0000-000000000008",//8
                                quotas: [
                                    {
                                        num:0,
                                        unit:""
                                    }
                                ],
                                prices: [
                                    {
                                        real_price:this.res8,
                                        price:this.cal8
                                    }
                                ]
                            },
                            {
                                piid: "00000000-0000-0000-0000-000000000009",//9
                                quotas: [
                                    {
                                        num:5,
                                        unit:'万'
                                    },
                                    {
                                        num:10,
                                        unit:'万'
                                    },
                                    {
                                        num:15,
                                        unit:'万'
                                    },
                                    {
                                        num:20,
                                        unit:'万'
                                    },
                                    {
                                        num:30,
                                        unit:'万'
                                    },
                                    {
                                        num:50,
                                        unit:'万'
                                    },
                                    {
                                        num:100,
                                        unit:'万'
                                    },
                                   
                                ],
                                prices: [
                                    {
                                        real_price:this.tcal1,
                                        price:this.tcal1
                                    },
                                    {
                                        real_price:this.tcal2,
                                        price:this.tcal2
                                    },
                                    {
                                        real_price:this.tcal3,
                                        price:this.tcal3
                                    },
                                    {
                                        real_price:this.tcal4,
                                        price:this.tcal4
                                    },
                                    {
                                        real_price:this.tcal5,
                                        price:this.tcal5
                                    },
                                    {
                                        real_price:this.tcal6,
                                        price:this.tcal6
                                    },
                                    {
                                        real_price:this.tcal7,
                                        price:this.tcal7
                                    },
                                ]
                            },
                            
                        ]

                    }
                ]
                
                var qid = this.quotationid;
                var promotion = parseFloat(this.promotion);
                this.$store.dispatch('addQuotationGroups', [qid, this.vehicleid, groups, promotion]).then(() => {
                    if ( this.quotations.code == 200) {
                        document.getElementById("button").disabled = true;
                        document.getElementById("button2").disabled = false;
                    }
                });
            },
            notifyQuotation:function(){
                var openid = this.getUserOpenId; 
                this.sendMessage();
                document.getElementById("button2").disabled = true;
            },
            sendMessage:function(){      
              if(!this.megatronLoading){
                var name = this.megatronVehicle.data.owner.name;
                var license_no = this.megatronVehicle.data.license_no?this.megatronVehicle.data.license_no:"新车未上牌";  
                var familyName = this.megatronVehicle.data.vehicle_model.familyName;
                var openid = this.megatronopenid;
                var qid = this.quotationid;
                var vid = this.vehicleid;
                // var vopenid = 'omZquwrTVfYarnyxPEt3FQhqb18s'
                console.log("openid" + openid)
                var url = "http://dev.fengchaohuzhu.com/wx/wxpay/tmsgQuotedPrice?user="+openid+"&CarNo="+familyName+"&No="+license_no+"&Name="+name+"&qid="+qid+"&vid="+vid;
                //var url = "http://m.fengchaohuzhu.com/wx/wxpay/tmsgQuotedPrice?user="+openid+"&CarNo="+familyName+"&No="+license_no+"&Name="+name+"&qid="+qid+"&vid="+vid;
                console.log(url)
                var xmlHttp = new XMLHttpRequest();
                    doGet(url);
                    function doGet(url){ 
                        xmlHttp.open("GET",url); 
                        xmlHttp.send(null); 
                        xmlHttp.onreadystatechange = function() {
                            console.log(xmlHttp) 
                            if ((xmlHttp.readyState == 4) || (xmlHttp.status == 200)) { 
                                console.log('success'); 
                            } else { 
                                console.log('fail'); 
                            } 
                        } 
                    } 
                }else{
                    console.log("openid is null")
                }
                
            },
            accidentTimes() {
                this.$store.dispatch('damageCount', {vid: this.vehicleid, count: this.occurrenceNumber}).then((accident_times) => {
                    console.log(accident_times + "=========")
                    if (accident_times.code === 200){
                        this.$store.dispatch('megatron', this.vehicleid);
                    }
                })
            }

        },
        components:{
            ListMenu
        },
        computed: mapGetters({
            vehicleid:'vehicleId',
            quotationid:'quotationid',
            megatronVehicle: 'megatronVehicle',
            megatronLoading: 'megatronLoading',
            megatronError: 'megatronError',
            megatronquotaNum: 'megatronquotaNum',
            megatronopenid:'megatronopenid',
            quotation: 'quotation',
            getQuotationApiStatus: 'getQuotationApiStatus',
            megatronticketinfo:'megatronticketinfo',
            megatronscratch:'megatronscratch',
            megatronscratch2:'megatronscratch2',
            addQuotationGroups: 'addQuotationGroups',
            quotations: 'quotations',

        }),
        created () {
            this.$store.dispatch('megatron', this.vehicleid);
            this.$store.dispatch('getQuotation', this.quotationid);
        }
    }
</script>
<style lang="sass" scoped>
    .clearfix:after {
        content: ".";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden
    }
    
    .container {
        width: 1353px;
        border: 1px solid #ccc;
        margin: 0 auto;
        .menu {
            float: left;
        }
        .section {
            width: 1150px;
            float: left;
            border-left: 1px solid #ccc;
            .plan_titles {
                margin: 0 auto;
                .plan_title {
                    float: left;
                    width: 360px;
                    text-align: center;
                    font-weight: bold;
                    padding: 10px;
                    border-bottom: 1px solid #ccc;
                    span {
                        color: red;
                        float: left;
                    }
                }
            }
            .plan_section {
                float: left;
                width: 33%;
                .calculate {
                    padding: 10px 20px;
                    span {
                        float: left;
                        margin-right: 10px;
                        min-width: 110px;
                    }
                    .inputnum {
                        float: left;
                        p {
                            font-size: 12px;
                            line-height: 5px;
                        }
                    }
                    .others {
                        input[type=text] {
                            width: 100px;
                            margin-top: 10px;
                            text-align: center;
                        }
                    }
                }
            }
        }
    }
    
    .section {
        .box {
            margin-top: 10px;
        }
        .reference {
            border-top: 1px solid #ccc;
            border-bottom: 1px solid #ccc;
            padding: 10px;
            span {
                min-width: 150px;
                display: inline-block;
            }
            .title {
                font-weight: bold;
            }
        }
        .button {
            text-align: center;
            line-height: 50px;
            margin-top: 30px;
        }
        .fl {
            float: left;
        }
        .promotion {
            padding: 10px;
            span {
                margin-left: 130px;
            }
        }
    }
    
    .section .box .info {
        border: 1px solid #ccc;
        padding-bottom: 30px;
    }
    
    .box .info .user {
        margin-top: 10px;
    }
    
    .user li {
        display: inline-block;
        margin-top: 10px;
        width: 270px;
    }
    
    .user li span {
        margin-right: 5px;
        font-weight: bold;
    }
    
    .papers {
        text-align: center;
    }
    
    .box .info .left {
        float: left;
        margin-left: 20px;
        margin-right: 20px;
    }
</style>