<template>
    <div class="container clearfix">
        <!--{{aOrder.data.items}}-->
        <ListMenu class="menu"></ListMenu>
        <div class="section">
            <div v-if=!aOrder>
                <img src="http://hive-data.oss-cn-beijing.aliyuncs.com/upload/wx/images/loading.gif" alt="" width="30">数据加载中。。。
            </div>
            <div class="box" v-if=aOrder>
                <div class="title">基本信息</div>
                <div class="info" v-if="aOrder.data.id != null">
                    订单编号：{{aOrder.data.id}}
                    {{aOrder.data.order_id}}
                </div>
                <div class="info" v-else>
                    订单号：{{aOrder.data.order_id}}
                </div>
                <div class="info">
                    <div class="title">用户信息（个人）</div>
                    <div class="detail">
                        <ul class="user">
                            <li><span>姓名:</span>{{aOrder.data.vehicle.owner.name}}</li>
                            <li><span>身份证号:</span>{{aOrder.data.vehicle.owner.identity_no}}</li>
                            <li><span>手机号:</span>{{aOrder.data.vehicle.owner.phone}}</li>
                        </ul>
                    </div>
                </div>
                <div class="info">
                    <div class="title">车辆信息</div>
                    <div class="detail">
                        <ul class="user">
                            <!--{{aOrder.data.vehicle}}-->
                            <li><span>车牌号:</span>{{aOrder.data.vehicle.license_no?aOrder.data.vehicle.license_no:'新车未上牌'}}</li>
                            <li><span>发动机号:</span>{{aOrder.data.vehicle.engine_no}}</li>
                            <li><span>车架号:</span>{{aOrder.data.vehicle.vehicle_model.vin_code}}</li>
                            <li><span>品牌型号:</span>{{aOrder.data.vehicle.vehicle_model.familyName}}</li>
                            <li><span>配置级别:</span>{{aOrder.data.vehicle.vehicle_model.cfgLevel}}</li>
                            <li v-if=aOrder.data.vehicle.vehicle_model.yearPattern><span>年款:</span>{{aOrder.data.vehicle.vehicle_model.yearPattern}}</li>
                            <li><span>排气量:</span>{{aOrder.data.vehicle.vehicle_model.pl}}L</li>
                            <li><span>手动自动:</span>{{aOrder.data.vehicle.vehicle_model.gearboxName}}</li>
                            <li><span>配置型号:</span>{{aOrder.data.vehicle.vehicle_model.vehicleName}}</li>
                            <li v-if=aOrder.data.vehicle.register_date><span>车辆注册日期:</span>{{aOrder.data.vehicle.register_date}}</li>
                            <li><span>新车购置发票号:</span>{{aOrder.data.vehicle.receipt_no}}</li>
                            <li><span>发票开具时间:</span>{{aOrder.data.vehicle.receipt_date}}</li>
                            <li><span>燃料类型:</span>{{aOrder.data.vehicle.fuel_type}}</li>
                            <li><span>年平均行驶里程:</span>{{aOrder.data.vehicle.average_mileage}}</li>
                            <li><span>车辆购置价格:</span>{{aOrder.data.vehicle.vehicle_model.purchasePriceTax}}元</li>
                            <li><span>是否过户车辆:</span><span v-if=aOrder.data.vehicle.is_transfer>是</span><span v-else>否</span></li>
                            <li><span>最近一次投保:</span>{{aOrder.data.vehicle.last_insurance_company}}</li>
                            <li v-if=aOrder.data.vehicle.insurance_due_date><span>保险到期时间:</span>{{aOrder.data.vehicle.insurance_due_date}}</li>
                            <li v-if=aOrder.data.v_value><span>车辆实际价格:</span>{{aOrder.data.v_value}}元</li>
                            <li v-if=aOrder.data.vehicle.accident_times><span>近12个月出险次数:</span>{{aOrder.data.vehicle.accident_times}}</li>
                        </ul>
                    </div>
                </div>
                <div class="info papers clearfix">
                    <!--{{aVehicle}}-->
                    <div class="title">证件信息</div>
                    <div class="detail">
                        <div class="image" v-if=aVehicle.data.driving_frontal_view>
                            <img v-bind:src=aVehicle.data.driving_frontal_view alt="">
                            <p>行驶证正面</p>
                        </div>
                        <div class="image" v-if=aVehicle.data.driving_rear_view>
                            <img v-bind:src=aVehicle.data.driving_rear_view alt="">
                            <p>行驶证背面</p>
                        </div>
                        <div class="image" v-if=aVehicle.data.owner.identity_frontal_view>
                            <img v-bind:src=aVehicle.data.owner.identity_frontal_view alt="">
                            <p>车主身份证正面</p>
                        </div>
                        <div class="image" v-if=aVehicle.data.owner.identity_rear_view>
                            <img v-bind:src=aVehicle.data.owner.identity_rear_view alt="">
                            <p>车主身份证背面</p>
                        </div>
                        <div class="image" v-if=aVehicle.data.owner.license_view>
                            <img v-bind:src=aVehicle.data.owner.license_view alt="">
                            <p>车主驾驶证</p>
                        </div>
                        <div v-for = "driver of aVehicle.data.drivers">
                            <div class="image" v-if="driver.license_view">
                                <img v-bind:src=driver.license_view alt="">
                                <p>驾驶人{{driver.name}}驾驶证</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="box" v-if="aOrder">
                <div class="title">订单信息</div>
                <div class="info clearfix" style="padding-bottom:0" v-if="aOrder.code == 200">
                    <div class="fl plans">
                        <!--<div class="plan_titles clearfix">
                            <div class="plan_title" v-for="p of aOrder.data.plan">{{p.title}}</div>
                        </div>-->
                        <div class="plan_items clearfix" v-if="aOrder.data.id != null">

                            <div class="items">
                                <div v-for="i of aOrder.data.items">{{i.plan_item.title}}： {{i.price}}元</div>
                            </div>
                        </div>
                        <div class="price" v-if="aOrder.id != null">
                            <span>订单合计金额：</span><label>{{aOrder.data.summary}}元</label>
                            <span>优惠券金额：</span><label>{{aOrder.data.p_price}}元</label>
                            <span>用户实付金额：</span><label style="color:#f00">{{aOrder.data.payment}}元</label><br>
                            <span>订单生成时间：</span><label>{{aOrder.data.created_at | date}}</label>
                        </div>
                    </div>
                    <div class="three">
                        <div v-if="saleOrder !== null">
                            <!--{{saleOrder}}-->
                            <h3>该订单包含代卖保险</h3>
                            <div><span>交强险+车船税</span>
                                <input type="text" v-if=saleOrder.items[0].price v-bind:value=saleOrder.items[0].price disabled id="saleItem1">
                                <input type="text" v-else placeholder="用户未勾选" id="saleItem2">
                            </div>
                            <div><span>三者险</span>
                                <input type="text" v-if=saleOrder.items[1].price v-bind:value=saleOrder.items[1].price disabled id="saleItem3">
                                <input type="text" v-else placeholder="用户未勾选" id="saleItem4">
                            </div>
                            <div>
                                <span>等级</span>
                                <label for="">{{quotaLevel}}万</label>
                            </div>
 
                            <button @click=saleItemEnable()>修改</button> <button @click=updateSaleOrder() disabled id="saleButton">提交</button>
                            <span>最后修改时间{{saleOrder.updated_at | date}}</span>
                        </div>
                        <div v-else>
                            <h3>该订单包含代卖保险  (用户未勾选)</h3>
                            <div><span>交强险+车船税</span><input type="number" v-model=three_item1></div>
                            <div><span>三者险</span><input type="number" v-model=three_item2></div>
                            <div>
                                <span>等级</span>
                                <select name="" id="">
                                    <option value="5">5万</option>
                                    <option value="10">10万</option>
                                    <option value="15">15万</option>
                                    <option value="20">20万</option>
                                    <option value="30">30万</option>
                                    <option value="50">50万</option>
                                    <option value="100">100万</option>
                                </select>
                            </div>
                            <!--<button @click=placeAnSaleOrder()>提交</button>-->
                        </div>
                    </div>
                </div>
            </div>
            <div class="box" v-if="aOrder">
                <div class="title">计划详情</div>
                <div class="info" v-if="aOrder.code == 200">
                    <div class="detail">
                        <span>用户期望生效时间</span><label>{{aOrder.data.expect_at | date2 }}</label>
                        <span>计划实际生效时间</span><label>{{aOrder.data.start_at | date2 }}</label>
                        <div class="drivers">
                            <span>驾驶人信息</span>
                            <div v-for="d of aOrder.data.vehicle.drivers">
                                <span>姓名:</span> {{d.name}}
                                <span>身份证号:</span> {{d.identity_no}}
                                <span>手机号：</span> {{d.phone}}
                                <span v-if=d.is_primary>主要驾驶人</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="check">
                <div class="title">核保信息</div>
                <div class="info" v-if="getunderwrite.data">
                    <div>
                        <span>计划核保时间</span>
                        <input type="datetime-local" v-bind:value=getunderwrite.data.plan_time id="time">
                    </div>
                    <div>
                        <span>预约验车地点</span>
                        <input v-bind:value="getunderwrite.data.validate_place" disabled type="text" v-if=!btn class="text">
                        <CityPicker class="citypicker" v-else></CityPicker>
                    </div>
                    <div>
                        <button @click="modifyBtn(true)" v-if=!btn>修改</button>
                        <div v-else>
                            <button class="button2" @click="submitValidate2()">保存</button>
                            <button class="button2" @click="modifyBtn(false)">取消</button>
                        </div>
                        最后修改时间 {{getunderwrite.data.validate_update_time | date}}
                    </div>
                </div>
                <div class="info" v-else>
                    <div>
                        <span>计划核保时间</span>
                        <input type="datetime-local" v-model="plan_time">
                    </div>
                    <div>
                        <span>预约验车地点</span>
                        <CityPicker class="citypicker"></CityPicker>
                    </div>
                    <div>
                        <button @click="submitValidate()" class="button2">提交</button>
                    </div>
                </div>
                <div class="info clearfix" v-if="getunderwrite.data">
                    <div>
                        <div>
                            <span>实际核保完成时间</span> {{getunderwrite.data.updated_at | date }}
                        </div>
                        <div>
                            <span>核保结果</span>
                            <label v-if=!btn3 for="" style="color:green">{{getunderwrite.data.underwrite_result}}</label>
                            <select name="" id="" id="result" v-else>
                                <option value="通过">通过</option>
                                <option value="未通过">未通过</option>
                            </select>
                            <button @click="modifyBtn3(true)">修改</button>
                            <button @click="modifyResult()">保存</button> 最后修改时间 {{getunderwrite.data.result_update_time |
                            date }}
                        </div>
                        <div>
                            <span>实际验车地点</span>
                            <input v-bind:value="getunderwrite.data.real_place" disabled type="text" v-if=!btn2 class="text">
                            <CityPicker class="citypicker" v-else></CityPicker>
                            <button @click="modifyBtn2(true)" v-if=!btn2>修改</button>
                            <div v-else>
                                <button class="button2" @click="modifyRealPlace()">保存</button>
                                <button class="button2" @click="modifyBtn2(false)">取消</button>
                            </div>
                            最后修改时间 {{getunderwrite.data.real_update_time | date }}
                        </div>
                        <div v-if=getunderwrite.data.operator>
                            <span>核保操作人</span> {{getunderwrite.data.operator.name}}
                        </div>
                    </div>
                    <div class="note fl">
                        <div>
                            <span>存在问题</span>
                            <label v-for="t of getunderwrite.data.problem_type">{{t}}  </label>
                        </div>
                        <div class="textarea">
                            <span>问题描述</span>
                            <textarea cols="30" rows="10" disabled>
                                {{getunderwrite.data.problem_description}}
                            </textarea>
                        </div>

                        <div class="textarea">
                            <span>备注</span>
                            <textarea name="" id="note" cols="30" rows="10" disabled>
                                {{getunderwrite.data.note}}
                            </textarea>
                        </div>
                        <div class="button">
                            <button @click="modifyBtn4(false)">修改</button>
                            <button @click="modifyNote()">保存</button> 最后修改时间{{getunderwrite.data.note_update_time | date
                            }}
                        </div>
                    </div>
                    <div class="sence_img fl">
                        <div class="title">现场图片</div>
                        <div class="upload" v-for="p of getunderwrite.data.photos">
                            <img v-bind:src=p.photo alt="">
                        </div>
                        <div class="upload">
                            <input type="file" @change=showImage() id="image2"><br>
                            <button @click='uploadImage("image2")'>上传</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import ListMenu from '../components/ListMenu.vue' 
    import CityPicker from '../components/CityPicker.vue' 
    import {mapGetters} from 'vuex'
    export default{
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
            },
            "date2": function(value) {
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
        },
        data(){
            return{
                three_item1:0.00,
                three_item2:0.00,
                plan_time:"2016-09-26T20:45",
                validate_place:null,
                btn:false,
                btn2:false,
                btn3:false,
                quotaLevel: null,
                saleOrder: null,
            }
        },
        computed:mapGetters({
            orderid:'orderid',
            aOrder:'aOrder',
            aVehicle:'aVehicle',
            aorderStatus:'aorderStatus',
            getunderwrite:'getunderwrite',
            selectAddress:'selectAddress',
        }),
        components:{
            ListMenu,
            CityPicker,
        },
        created () {
            this.$store.dispatch('getOrder', this.orderid).then((order)=>{
                if(order.code === 200) {
                    this.$store.dispatch('getSaleOrder', order.data.vehicle.id).then((saleOrder) => {
                        if(saleOrder.code === 200){
                            this.saleOrder = saleOrder.data;
                            this.quotaLevel = saleOrder.data.opr_level;
                            // let i = 0;
                            // for (let p of order.data.quotation.quotation_groups[0].items[8].prices){
                            //     if(saleOrder.data.items[1].price == p.price){
                            //         this.quotaLevel = order.data.quotation.quotation_groups[0].items[8].quotas[i].num;    
                            //         break;
                            //     }
                            //     i++;
                            // }   
                        }
                    });
                }
            });
            this.$store.dispatch('getUnderwriteByOrderId', this.orderid);
            
        },
        methods: {
            submitValidate:function(){
                this.$store.dispatch('createUnderwrite', {oid: this.aOrder.data.order_id, plan_time:this.plan_time, validate_place: this.selectAddress}).then((uwinfo) => {
                    this.$store.dispatch('getUnderwriteByOrderId', this.orderid);
                });
            },
            submitValidate2:function(){
                var time = document.getElementById("time").value;
                this.$store.dispatch('alterValidatePlace', {uwid: this.getunderwrite.data.id, plan_time:time, validate_place: this.selectAddress}).then((uwinfo) => {
                    this.btn = false;
                    this.$store.dispatch('getUnderwriteByOrderId', this.orderid);
                });
            },
            modifyNote:function(){
                var note = document.getElementById("note").value;
                this.$store.dispatch('alterNote', {uwid: this.getunderwrite.data.id, note}).then((uwinfo) => {
                    document.getElementById("note").disabled = true;
                    this.$store.dispatch('getUnderwriteByOrderId', this.orderid);
                });
            },
            modifyRealPlace:function(){
                this.$store.dispatch('alterRealPlace', {uwid: this.getunderwrite.data.id, real_place:this.selectAddress}).then((uwinfo) => {
                    this.btn2 = false;
                    this.$store.dispatch('getUnderwriteByOrderId', this.orderid);
                });
            },
            modifyResult:function(){
                var result = document.getElementById("result").value;
                this.$store.dispatch('alterUnderwriteResult', {uwid: this.getunderwrite.data.id, result}).then((uwinfo) => {
                    this.btn3 = false;
                    this.$store.dispatch('getUnderwriteByOrderId', this.orderid);
                });
            },
            modifyBtn:function(boo){
                this.btn = boo;
            },
            modifyBtn2:function(boo){
                this.btn2 = boo;
            },
            modifyBtn3:function(boo){
                this.btn3 = boo;
            },
            modifyBtn4:function(boo){
                document.getElementById("note").disabled = boo
            },
            placeAnSaleOrder:function(){
                var vid = this.aVehicle.data.id;
                var pid = "00000000-0000-0000-0000-000000000004";
                var qid = this.aOrder.data.qid;
                var item1 = this.three_item1;
                var item2 = this.three_item2;
                var items = {
                    "00000000-0000-0000-0000-000000000008": item1,
                    "00000000-0000-0000-0000-000000000009": item2
                    };
                var summary = (item1 + item2).toFixed(2);
                var payment = summary;
                this.$store.dispatch('placeAnSaleOrder', {vid, pid, qid, items, summary, payment}).then((order)=>{
                    console.log("order" + JSON.stringify(order));
                    if(order.code === 200){
                        this.$store.dispatch('getSaleOrder', this.aOrder.data.vehicle.id);
                    }
                }).cache(err =>{
                    console.log(err);
                })
            },
            saleItemEnable:function(){
                var saleItem1 = document.getElementById("saleItem1");
                var saleItem2 = document.getElementById("saleItem2");
                var saleItem3 = document.getElementById("saleItem3");
                var saleItem4 = document.getElementById("saleItem4");
                if (saleItem1) {
                    saleItem1.disabled = false;
                }
                if(saleItem3) {
                    saleItem3.disabled = false;
                }
                document.getElementById("saleButton").disabled = false;
            },
            updateSaleOrder:function() {
                 var order_id = this.saleOrder.id;
                 var item1 = parseFloat(document.getElementById("saleItem1")?document.getElementById("saleItem1").value:document.getElementById("saleItem2").value);
                 var item2 = parseFloat(document.getElementById("saleItem3")?document.getElementById("saleItem3").value:document.getElementById("saleItem4").value);
                 var items = {
                    "00000000-0000-0000-0000-000000000008": item1,
                    "00000000-0000-0000-0000-000000000009": item2
                    };
                 var summary = (item1 + item2).toFixed(2);
                 var payment = summary;
                  this.$store.dispatch('updateSaleOrder', {order_id, items, summary, payment}).then((order)=>{
                     this.$store.dispatch('getOrder', order_id).then((saleOrder)=> {
                         if(saleOrder.code === 200) {
                             this.saleOrder = saleOrder.data;
                             var saleItem1 = document.getElementById("saleItem1");
                             var saleItem2 = document.getElementById("saleItem2");
                             var saleItem3 = document.getElementById("saleItem3");
                             var saleItem4 = document.getElementById("saleItem4");
                             if (saleItem1) {
                                 saleItem1.disabled = true;
                             }
                             if(saleItem3) {
                                saleItem3.disabled = true;
                             }
                             document.getElementById("saleButton").disabled = true;
                         }
                     }) 
                  });

            },
            uploadImage(image) {
                var input = document.getElementById(image);
                var that = this;
                var client = new OSS.Wrapper({
                    region: 'oss-cn-beijing',
                    accessKeyId: 'q0cAhclwPcqtlhQZ',
                    accessKeySecret: 'PDHF4CHnOg3QL7YbsWgdJzzZ6duUbB',
                    bucket: 'hive-data'
                });
                if(input.type == "file" && input.files[0] != undefined){
                    console.log(input.files[0].name);
                    var file = input.files[0];
                    var storeAs ="user/" + file.name;
                    var pic_url = "http://hive-data.oss-cn-beijing.aliyuncs.com/user/";
                    pic_url += file.name;
                    
                    client.multipartUpload(storeAs, file).then(function (result) {
                        console.log("success" + result.url);
                        let photo = result.url;
                        if (photo) {
                          that.$store.dispatch('uploadPhotos', {uwid: that.getunderwrite.data.id, photo});
                          input.files[0] = null;
                        }
                    }).catch(function (err) {
                        console.log(err);
                    });
                }
            },
            showImage($event) {
                var currentObj = event.currentTarget;
                var img = currentObj.parentNode.children[0];
                console.log(currentObj.value);
                setImagePreview(currentObj,img);
                //currentObj.parentNode.removeChild(img);
                //currentObj.parentNode.appendChild(img);
                function setImagePreview(docObj,imgObjPreview) {   
                    if(docObj.files &&docObj.files[0])  
                    {  
                    //火狐下，直接设img属性  
                    // imgObjPreview.style.display = 'block';  
                    // imgObjPreview.style.width = '100%';  
                    // imgObjPreview.style.height = '100%';   
                    //imgObjPreview.src = docObj.files[0].getAsDataURL(); 
                        
                    //火狐7以上版本不能用上面的getAsDataURL()方式获取，需要一下方式
                    imgObjPreview.src = window.URL.createObjectURL(docObj.files[0]);  
                        
                    }  
                    else{  
                        //IE下，使用滤镜  
                        docObj.select();  
                        var imgSrc = document.selection.createRange().text;  
                        var localImagId = document.getElementById("localImag");  
                        //必须设置初始大小  
                        // localImagId.style.width = "100%";  
                        // localImagId.style.height = "100%";  
                        //图片异常的捕捉，防止用户修改后缀来伪造图片  
                        try{  
                            localImagId.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";  
                            localImagId.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;  
                        }  
                        catch(e){  
                            alert("您上传的图片格式不正确，请重新选择!");  
                            return false;  
                        }  
                        imgObjPreview.style.display = 'none';  
                        document.selection.empty();  
                    }  
                    return true;  
                } 
            },  
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
            .plan_items {
                .items {
                    width: 360px;
                    float: left;
                    text-indent: 2em;
                    margin-top: 5px;
                    margin-bottom: 10px;
                }
            }
            .three {
                border-left: 1px solid #ccc;
                float: left;
                padding: 10px;
                h3 {
                    color: #f00;
                    text-align: center;
                }
                span {
                    margin-left: 30px;
                    display: inline-block;
                    min-width: 110px;
                }
                button {
                    margin: 5px auto;
                }
                line-height:30px;
            }
            .price {
                border-top: 1px solid #ccc;
                padding-top: 10px;
                span {
                    font-weight: bold;
                    margin-left: 20px;
                }
                line-height:30px;
            }
        }
    }
    
    .section {
        .box {
            margin-top: 10px;
            .detail {
                span {
                    font-weight: bold;
                    margin-left: 30px;
                }
                label {
                    margin-left: 5px;
                }
                .drivers {
                    padding-top: 10px;
                    border-top: 1px solid #ccc;
                }
            }
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
        .button2 {
            margin: 5px 30px;
            padding: 2px 25px;
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
        .check {
            .title {
                margin-top: 10px;
                margin-bottom: 5px;
            }
            .info {
                border: 1px solid #ccc;
                padding: 10px;
                line-height: 30px;
                span {
                    font-weight: bold;
                    margin-right: 10px;
                    display: inline-block;
                    min-width: 120px;
                }
                .textarea {
                    line-height: 30px;
                    span {
                        vertical-align: top;
                    }
                }
                .sence_img {
                    margin-left: 10px;
                    width: 50%;
                    .title {
                        font-weight: bold;
                        margin-left: 30px;
                    }
                    .upload {
                        float: left;
                        margin-top: 10px;
                        margin-left: 30px;
                        text-align: center;
                        button {
                            padding: 2px 80px;
                            display: inline-block;
                        }
                        img {
                            display: block;
                            margin: 0 auto;
                            width: 200px;
                            height: 100px;
                            border: 1px solid #ccc;
                        }
                    }
                }
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
        .image {
            float: left;
            width: 200px;
            height: 230px;
            display: block;
            overflow: hidden;
            text-align: center;
            margin-left: 40px;
            margin-top: 20px;
            img {
                height: 180px;
            }
            p {
                height: 20px;
            }
        }
    }
    
    .box .info .left {
        float: left;
        margin-left: 20px;
        margin-right: 20px;
    }
    
    .citypicker {
        display: inline-block;
    }
    
    .text {
        width: 400px;
    }
</style>