<template>
    <div class="container" v-if=!getQuotationApiStatus>
        <!--{{quotation}}-->
        <router-link to="/OrderList">返回列表</router-link>
        <div class="section">
            <div class="box">
                <div class="title">报价信息</div>
                <div class="info clearfix" id="plans">
                    <div>车辆实际价值  {{quotation.data.quotation_groups[0].items[0].quotas[0].num}}{{quotation.data.quotation_groups[0].items[0].quotas[0].unit}}</div>
                    <div class="plan_titles clearfix">
                        <div class="plan_title">主计划部分</div>
                        <div class="plan_title">附计划部分</div>
                        <div class="plan_title">代卖保险部分</div>
                    </div>

                    <div class="plan_sections clearfix">
                        <div class="plan_section clearfix"  >
                            <div class="calculate clearfix">
                                <span>机动车损失保障</span>
                                <div class="inputnum">
                                    <div>原价 {{(parseFloat(quotation.data.quotation_groups[0].items[0].prices[0].price)/1.15).toFixed(2)}}</div>
                                    <div>不计免赔  {{quotation.data.quotation_groups[0].items[0].prices[0].price}}</div>
                                    <div>实际价格  {{quotation.data.quotation_groups[0].items[0].prices[0].real_price}}</div>
                                </div>
                            </div>
                            <div class="calculate clearfix">
                                <span>机动车全车盗抢</span>
                                <div class="inputnum">
                                    <div>原价  {{(parseFloat(quotation.data.quotation_groups[0].items[1].prices[0].price)/1.2).toFixed(2)}}</div>
                                    <div>不计免赔  {{quotation.data.quotation_groups[0].items[1].prices[0].price}}</div>
                                    <div>实际价格  {{quotation.data.quotation_groups[0].items[1].prices[0].real_price}}</div>
                                </div>
                            </div>
                            <div class="calculate clearfix">
                                <span>无法找到第三方</span>
                                <div class="inputnum">
                                    <div>实际价格  {{quotation.data.quotation_groups[0].items[2].prices[0].real_price}}</div>
                                </div>
                            </div>
                        </div>

                        <div class="plan_section clearfix">
                            <div class="calculate clearfix">
                                <span>机动车自燃损失</span>
                                <div class="inputnum">
                                    <div>原价  {{(parseFloat(quotation.data.quotation_groups[0].items[3].prices[0].price)/1.2).toFixed(2)}}</div>
                                    <div>不计免赔  {{quotation.data.quotation_groups[0].items[3].prices[0].price}}</div>
                                    <div>实际价格  {{quotation.data.quotation_groups[0].items[3].prices[0].real_price}}</div>
                                </div>
                            </div>
                            <div class="calculate clearfix">
                                <span>机动车涉水损失</span>
                                <div class="inputnum">
                                    <div>原价  {{(parseFloat(quotation.data.quotation_groups[0].items[4].prices[0].price)/1.15).toFixed(2)}}</div>
                                    <div>不计免赔  {{quotation.data.quotation_groups[0].items[4].prices[0].price}}</div>
                                    <div>实际价格  {{quotation.data.quotation_groups[0].items[4].prices[0].real_price}}</div>
                                </div>
                            </div>
                            <div class="calculate clearfix">
                                <span>车身划痕损失</span>
                                <div class="inputnum">
                                    <div>实际价格  {{quotation.data.quotation_groups[0].items[5].prices[0].real_price}}</div>
                                </div>
                            </div>
                            <div class="calculate clearfix">
                                <span>玻璃单独破碎</span>
                                <div class="inputnum">
                                    <div>原价  {{quotation.data.quotation_groups[0].items[6].prices[0].price}}</div>
                                    <div>实际价格  {{quotation.data.quotation_groups[0].items[6].prices[0].real_price}}</div>
                                </div>
                            </div>
                        </div>
                        <div class="plan_section clearfix">
                            <div class="calculate clearfix">
                                <span>交强险+车船税</span>
                                <div class="inputnum">
                                    <div>原价  {{quotation.data.quotation_groups[0].items[7].prices[0].real_price}}</div>
                                    <div>实际价格  {{quotation.data.quotation_groups[0].items[7].prices[0].real_price}}</div>
                                </div>
                            </div>
                            <div class="calculate clearfix">
                                <span>第三者责任险</span>
                                <div class="inputnum others">
                                    <div class="clearfix">
                                        <div class="fl">
                                            <div>实际价格  {{quotation.data.quotation_groups[0].items[8].prices[0].real_price}}</div>
                                            <p>档次：5万</p>
                                        </div>
                                        <div class="fl">
                                            <div>实际价格  {{quotation.data.quotation_groups[0].items[8].prices[1].real_price}}</div>
                                            <p>档次：10万</p>
                                        </div>
                                        <div class="fl">
                                            <div>实际价格  {{quotation.data.quotation_groups[0].items[8].prices[2].real_price}}</div>
                                            <p>档次：15万</p>
                                        </div>
                                        <div class="fl">
                                            <div>实际价格 {{quotation.data.quotation_groups[0].items[8].prices[3].real_price}}</div>
                                            <p>档次：20万</p>
                                        </div>
                                        <div class="fl">
                                            <div>实际价格  {{quotation.data.quotation_groups[0].items[8].prices[4].real_price}}</div>
                                            <p>档次：30万</p>
                                        </div>
                                        <div class="fl">
                                            <div>实际价格  {{quotation.data.quotation_groups[0].items[8].prices[5].real_price}}</div>
                                            <p>档次：50万</p>
                                        </div>
                                        <div class="fl">
                                            <div>实际价格  {{quotation.data.quotation_groups[0].items[8].prices[6].real_price}}</div>
                                            <p>档次：100万</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="sum">
                            <span>主计划实际价格合计：<i>{{(parseFloat(quotation.data.quotation_groups[0].items[0].prices[0].real_price) + parseFloat(quotation.data.quotation_groups[0].items[1].prices[0].real_price)+ parseFloat(quotation.data.quotation_groups[0].items[2].prices[0].real_price)).toFixed(2)}}</i></span>
                            <span>附计划实际价格合计：<i>{{(parseFloat(quotation.data.quotation_groups[0].items[3].prices[0].real_price) + parseFloat(quotation.data.quotation_groups[0].items[4].prices[0].real_price) + parseFloat(quotation.data.quotation_groups[0].items[5].prices[0].real_price) + parseFloat(quotation.data.quotation_groups[0].items[6].prices[0].real_price)).toFixed(2)}}</i></span>
                            <span>实际价格总计(主计划+附计划)：<i>{{(parseFloat(quotation.data.quotation_groups[0].items[0].prices[0].real_price) + parseFloat(quotation.data.quotation_groups[0].items[1].prices[0].real_price)+ parseFloat(quotation.data.quotation_groups[0].items[2].prices[0].real_price) + parseFloat(quotation.data.quotation_groups[0].items[3].prices[0].real_price) + parseFloat(quotation.data.quotation_groups[0].items[4].prices[0].real_price) + parseFloat(quotation.data.quotation_groups[0].items[5].prices[0].real_price) + parseFloat(quotation.data.quotation_groups[0].items[6].prices[0].real_price)).toFixed(2)}}</i></span>
                        </div>
                    </div>
                    <div class="reference">
                        <div>
                            <!--<span class="title">安盛天平报价</span>-->
                            <div style="display: inline-block; width: 31%;padding-left:10px;">主计划折扣前总价：<i>{{(parseFloat(quotation.data.quotation_groups[0].items[0].prices[0].price)*1.025 + parseFloat(quotation.data.quotation_groups[0].items[1].prices[0].price)).toFixed(2)}}</i></div>
                            <div style="display: inline-block; width: 30%;padding-left:17px;">附加计划折扣前总价：<i>{{(parseFloat(quotation.data.quotation_groups[0].items[3].prices[0].price) + parseFloat(quotation.data.quotation_groups[0].items[4].prices[0].price) + parseFloat(quotation.data.quotation_groups[0].items[5].prices[0].real_price) + parseFloat(quotation.data.quotation_groups[0].items[6].prices[0].price)).toFixed(2)}}</i></div>
                            <div style="display: inline-block; width: 30%;padding-left:30px;">折扣前总价(主计划+附计划)：<i>{{(parseFloat(quotation.data.quotation_groups[0].items[0].prices[0].price)*1.025 + parseFloat(quotation.data.quotation_groups[0].items[1].prices[0].price) + parseFloat(quotation.data.quotation_groups[0].items[3].prices[0].price) + parseFloat(quotation.data.quotation_groups[0].items[4].prices[0].price) + parseFloat(quotation.data.quotation_groups[0].items[5].prices[0].real_price) + parseFloat(quotation.data.quotation_groups[0].items[6].prices[0].price)).toFixed(2)}}</i></div>
                        </div>
                        <!--<div>
                            <span class="title">人保参考价</span>
                            <span>主计划折扣前总价</span>
                            <span>附加计划折扣前总价</span>
                        </div>
                        <div>
                            <span class="title">偏差</span>
                            <span></span>
                            <div>实际价格{{quotation.data.quotation_groups[0].items[0].quotas[0].num}}</div>
                            <span></span>
                            <div>实际价格{{quotation.data.quotation_groups[0].items[0].quotas[0].num}}</div>
                        </div>-->
                    </div>

                    <div class="promotion">
                        <div class="title">是否有优惠券</div>
                        <span>优惠简介:</span>
                        {{megatronticketinfo.title}}
                        <span>优惠金额:</span>
                        {{quotation.data.promotion}}
                        <span>折扣形式:</span>
                        到期返还
                    </div> 
                </div>
            </div>
        </div>
</template>
<script>
    import ListMenu from '../components/ListMenu.vue' 
    import {mapGetters} from 'vuex'
	export default {
        computed: mapGetters({
            vehicleid:'vehicleId',
            quotationid:'quotationid',
            quotation:'quotation',
            getUserOpenId: 'getUserOpenId',
            getVehicleInfo: 'getVehicleInfo',
            getQuotationApiStatus: 'getQuotationApiStatus',
            megatronticketinfo:'megatronticketinfo',
        }),
        created() {
            this.$store.dispatch('getQuotation', this.quotationid);
        },
        methods:{
           
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
	.container{
        width:1353px;
        border:1px solid #ccc;
        margin:0 auto;
        .notify{
            text-align:center;
            button{
                padding:10px 20px;
                margin-top:10px;
            }
        }
        .menu{
            float:left;
        }
        .section{
            width:1150px;
            margin: 0 auto;
            .plan_titles{
                margin:0 auto;
                .plan_title{
                    float:left;
                    width:360px;
                    text-align:center;
                    font-weight:bold;
                    padding:10px;
                    border-bottom:1px solid #ccc;
                    span{
                        color:red;
                        float:left;
                    }
                }
            }
            .plan_section{
                float:left;
                width:33%;
                .calculate{
                    padding:10px 20px;
                    span{
                        float:left;
                        margin-right:10px;
                        min-width:110px;
                    }
                    .inputnum{
                        float:left;
                        p{
                            font-size:12px;
                            line-height:5px;
                        }
                        div{
                            border: 1px solid #cacaca;
                            margin-bottom: 5px;
                        }
                        div:last-of-type{
                            background: #ddd;
                        }
                    }
                    .others{
                        input[type=text]{
                            width:100px;
                            margin-top:10px;
                            text-align:center;
                        }
                        div.clearfix{
                            background: #fff;
                        }
                        div{
                            background: #fff;
                            div{
                                margin:5px 10px 5px 5px;
                                background: #fff;
                            }
                        }
                        div.fl:last-of-type{
                            background: #fff;
                        }
                    }
                }
            }
            .sum{
                span{
                    display: inline-block;
                    width: 28.5%;
                    height: 30px;
                    padding: 0 20px;
                    font-weight: 700;
                    i{
                        font-style: normal;
                        color: #eb6100;
                    }
                }
            }
            
        }
    }
    .section{
        .box{
            margin-top:10px;
        }
        .reference{
            border-top:1px solid #ccc;
            border-bottom:1px solid #ccc;
            padding:10px;
            span{
                min-width:150px;
                display:inline-block;
            }
            .title{
                font-weight:bold;
            }
            div{
                i{
                   font-style: normal;
                   color: #eb6100; 
                }
            }
        }
        .button{
            text-align:center;
            line-height:50px;
            margin-top:30px;
        }
        .fl{
            float:left;
        }
        .promotion{
            padding:10px;
            span{
                margin-left:130px;
            }
        }
    }
    .section .box .info{
        border:1px solid #ccc;
        padding-bottom:30px;
    }
    .box .info .user{
        margin-top:10px;
    }
    .user li{
        display:inline-block;
        margin-top:10px;
        width:270px;
    }
    .user li span{
        margin-right:5px;
        font-weight:bold;
    }
    .papers{
        text-align:center;
    }
    .box .info .left{
        float:left;
        margin-left:20px;
        margin-right:20px;
    }
</style>