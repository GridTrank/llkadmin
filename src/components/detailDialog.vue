<template>
    <div class="detail-dialog-wrap">
        <el-dialog :visible="visible" @close="visible=false" v-loading="loading">
            <div class="info-wrap">
                <div class="title">基本信息：</div>
                <div class="info f-row jc-sb">
                    <div class="item f-row" v-for="(item,index) in baseData" :key="index"> 
                        <span class="symbol">*</span> {{item.label}}：{{ysmerchant[item.value]}}
                    </div>
                </div>
            </div>
            <div class="info-wrap mt20">
                <div class="title ">法人信息：</div>
                <div class="img-wrap mt10">
                    <p class="top"> <span class="symbol">*</span>身份证正反面：</p>
                    <div class="img-list f-row">
                        <div class="img-item f-col" >
                            <img v-real-img="imagePath+'/'+images['A002']"  class="img" @click="showImg(imagePath+'/'+images['A002'])"/>
                            <p>身份证人像面</p>
                        </div>
                        <div class="img-item f-col" >
                            <img v-real-img="imagePath+'/'+images['A003']"  class="img" @click="showImg(imagePath+'/'+images['A003'])"/>
                            <p>身份证国徽面</p>
                        </div>
                        <div class="img-item f-col" >
                            <img v-real-img="imagePath+'/'+images['A009']"  class="img" @click="showImg(imagePath+'/'+images['A009'])"/>
                            <p>手持身份证合照</p>
                        </div>
                    </div>
                </div>
                <div class="info f-row jc-sb">
                    <div class="item f-row" v-for="(item,index) in legalData" :key="index"> 
                        <span class="symbol">*</span> {{item.label}}：{{ysmerchant[item.value]}}
                    </div>
                </div>
                <!-- 资质 -->
                <div class="mt10">
                    <div > 
                        <div><span class="symbol">*</span>资质证明</div>
                        <img v-real-img="imagePath+'/'+images['A001']"  class="img" @click="showImg(imagePath+'/'+images['A001'])" />
                        <p class="sc-txt">上传营业执照</p>
                    </div>
                    <div class="info f-row jc-sb">
                        <div class="item f-row" v-for="(item,index) in quaData" :key="index"> 
                            <span class="symbol">*</span> {{item.label}}：{{ysmerchant[item.value]}}
                        </div>
                    </div>
                </div>
            </div>

            <div class="info-wrap mt20">
                <div class="title ">结算信息：</div>
                <div class="img-wrap mt10">
                    <p class="top"> <span class="symbol">*</span>结算信息：</p>
                    <div class="img-list f-row">
                        <div class="img-item f-col" >
                            <img v-real-img="imagePath+'/'+images['A0011']"  class="img" @click="showImg(imagePath+'/'+images['A0011'])" />
                            <p>开户许可证</p>
                        </div>
                        <div class="img-item f-col" >
                            <img v-real-img="imagePath+'/'+images['A003']"  class="img" @click="showImg(imagePath+'/'+images['A003'])" />
                            <p>银行正面图</p>
                        </div>
                        <div class="img-item f-col" >
                            <img v-real-img="imagePath+'/'+images['A009']"  class="img" @click="showImg(imagePath+'/'+images['A009'])" />
                            <p>银行反面图</p>
                        </div>
                    </div>
                </div>
                <div class="info f-row jc-sb">
                    <div class="item f-row" v-for="(item,index) in settlementData" :key="index"> 
                        <span class="symbol">*</span> {{item.label}}：{{ysmerchant[item.value]}}
                    </div>
                </div>

                <!-- 非法人 -->
                <div class="mt10" v-if="ysmerchant.codeLegalPersonAcc=='非法人结算'">
                    <div > 
                        <div><span class="symbol">*</span>身份证正反面</div>
                        <div class="img-list f-row">
                            <div class="img-item f-col mr10" >
                                <img v-real-img="imagePath+'/'+images['A013']"  class="img" @click="showImg(imagePath+'/'+images['A013'])" />
                                <p>身份证正面</p>
                            </div>
                            <div class="img-item f-col" >
                                <img v-real-img="imagePath+'/'+images['A014']"  class="img" @click="showImg(imagePath+'/'+images['A014'])" />
                                <p>身份证反面</p>
                            </div>
                        </div>
                    </div>
                    <div class="info f-row jc-sb">
                        <div class="item f-row" v-for="(item,index) in unincorporate" :key="index"> 
                            <span class="symbol">*</span> {{item.label}}：{{ysmerchant[item.value]}}
                        </div>
                    </div>
                </div>
            </div>

            <div class="info-wrap mt20">
                <div class="title ">协议信息：</div>
                <div class="f-row jc-sb">
                    <div class="img-wrap">
                        <p class="top"> <span class="symbol">*</span>收单协议：</p>
                        <div class="img-list f-row">
                            <div class="img-item f-col">
                                <img v-real-img="imagePath+'/'+images['A002']"  class="img" @click="showImg(imagePath+'/'+images['A002'])" />
                                <p>身份证正面</p>
                            </div>
                            <div class="img-item f-col" >
                                <img v-real-img="imagePath+'/'+images['A003']"  class="img" @click="showImg(imagePath+'/'+images['A003'])" />
                                <p>身份证反面</p>
                            </div>
                        </div>
                    </div>
                    <div class="img-wrap">
                        <p class="top"> <span class="symbol">*</span>门店信息：</p>
                        <div class="img-list f-row" >
                            <div class="img-item f-col" >
                                <img v-real-img="imagePath+'/'+images['A0011']"  class="img" @click="showImg(imagePath+'/'+images['A0011'])" />
                                <p>开户许可证</p>
                            </div>
                            <div class="img-item f-col" >
                                <img v-real-img="imagePath+'/'+images['A003']"  class="img" @click="showImg(imagePath+'/'+images['A003'])" />
                                <p>银行正面图</p>
                            </div>
                            <div class="img-item f-col" >
                                <img v-real-img="imagePath+'/'+images['A009']"  class="img" @click="showImg(imagePath+'/'+images['A009'])" />
                                <p>银行反面图</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="info-wrap mt20">
                <div class="title ">银盛：</div>
                <div class="info f-row jc-sb">
                    <div class="item f-row" v-for="(item,index) in yinShen" :key="index"> 
                        <template v-if="item.value=='status'">
                            <div class="status-wrap f-row jc-sb">
                                <p><span class="symbol">*</span> {{item.label}}：{{ysStatusFilter(ysData[item.value]) }}</p>
                                <el-button class="s-btn" size="small" v-if="!ysData.status" type="primary">银盛进件申请</el-button>
                            </div>
                        </template>
                        <template v-else>
                            <span class="symbol">*</span> {{item.label}}：{{ysData[item.value]}}
                        </template>
                    </div>
                </div>
                
            </div>
            <div class="b-btn">
                <el-button class="btn" type="primary" @click="visible=false">返回</el-button>
            </div>
        </el-dialog>

        <el-dialog class="v-dia" :visible="imgVisible" @close="imgVisible=false" width="30%">
            <img :src="visibleImg" class="v-img">
        </el-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return {
            visible:false,
            imgVisible:false,
            visibleImg:'',
            loading:true,
            baseData:[
                {
                    label:'商业模式',
                    value:'userType',
                },
                {
                    label:'行业类别',
                    value:'mccCd',
                },
                {
                    label:'实际控制人',
                    value:'actualManager',
                },
                
                {
                    label:'联系人姓名',
                    value:'contactsName',
                },
                {
                    label:'联系电话',
                    value:'contactsPhone',
                },
                {
                    label:'联系人邮箱',
                    value:'contactsEmail',
                },
                {
                    label:'所在区域',
                    value:'contactsAddr',
                },
                {
                    label:'详细地址',
                    value:'contactsAddr',
                },

            ],
            legalData:[
                {
                    label:'法人姓名',
                    value:'legalPersonName',
                },
                {
                    label:'身份证号',
                    value:'legalPersonId',
                },
                {
                    label:'证件有效期',
                    value:'legalPersonIdEdate',
                },
                {
                    label:'电话号码',
                    value:'legalPersonPhone',
                },
                {
                    label:'法人性别',
                    value:'crpGender',
                },
                {
                    label:'法人职业',
                    value:'crpProfession',
                },
                {
                    label:'法人地址',
                    value:'crpAddr',
                },
                {
                    label:'详细地址',
                    value:'crpAddr',
                },
               
            ],
            // 资质信息
            quaData:[
                {
                    label:'营业执照全称',
                    value:'businessLicence',
                },
                {
                    label:'商户简称(小票)',
                    value:'userShortName',
                },
                {
                    label:'营业执照号码',
                    value:'businessLicenceNo',
                },
                {
                    label:'营业执照有效期',
                    value:'businessLicenceSdate',
                },
                {
                    label:'注册地址',
                    value:'registeredAddress',
                },
                {
                    label:'详细地址',
                    value:'registeredAddress',
                }
            ],
            settlementData:[
                {
                    label:'结算卡类型',
                    value:'balanceAccType',
                },
                {
                    label:'结算户名',
                    value:'balanceAccName',
                },
                {
                    label:'结算账号',
                    value:'balanceAccCardno',
                },
                {
                    label:'开户地区',
                    value:'openAccProvince',
                },
                {
                    label:'开户行',
                    value:'bankName',
                },
                {
                    label:'开户行支行',
                    value:'openAccBankname',
                },
                {
                    label:'预留手机号',
                    value:'bankMobile',
                },
                {
                    label:'营业地址',
                    value:'businessAddress',
                },
                {
                    label:'商户归属区域',
                    value:'mercProv',
                },
                {
                    label:'法人结算',
                    value:'codeLegalPersonAcc',
                },
                {
                    label:'法人姓名',
                    value:'legalPersonName',
                },
               
            ],
            // 非法人信息
            unincorporate:[
                {
                    label:'非法人姓名',
                    value:'unincorporatedName',
                },
                {
                    label:'身份证号',
                    value:'unincorporatedId',
                },
            ],
            yinShen:[
                {
                    label:'状态',
                    value:'status',
                },{
                    label:'银盛商户号',
                    value:'mercId',
                },{
                    label:'客户编号',
                    value:'custId ',
                },{
                    label:'商户名称',
                    value:'mercCnm',
                },{
                    label:'商户简称',
                    value:'mercAbb',
                },{
                    label:'代理商编号',
                    value:'coOperatorNo',
                },{
                    label:'签约地址',
                    value:'signUrl',
                },{
                    label:'签约流水',
                    value:'sysSignFlowId',
                },
                // {
                //     label:'通知类型',
                //     value:'noticeType',
                // },
                {
                    label:'拒绝说明',
                    value:'nogoRemark',
                },
            ],
            ysmerchant:{},
            imagePath:'',
            ysData:{},
            images:{},
        }
    },
    props:{
        id:Number,
        pageFrom:String
    },
    watch:{
        visible(val){
            if(val){
                this.getDetail()
            }
        }
    },
    created(){},
    computed:{},
    methods:{
        ysStatusFilter(val){
            switch(val){
                case 0:
                    return '待进件';
                case 1:
                    return '进件成功';
                case 2:
                    return '进件失败';
            }
        },
        showImg(img){
            this.visibleImg=img
            this.imgVisible=true
        },
        getDetail(){
            let url=''
            switch(this.pageFrom){
                case 'business':
                    url='sys/merchant/info';
                    break;
                case 'agentList':
                    url='sys/agent/info';
                    break;
            }
            this.$http.post(url,{
                id:this.id
            }).then(res=>{
                if(res.code==1){
                    this.ysmerchant=JSON.parse(res.data.ysmerchant)
                    console.log(111,this.ysmerchant)
                    this.ysmerchant.legalPersonIdEdate=this.ysmerchant.legalPersonIdSdate +' - '+this.ysmerchant.legalPersonIdEdate
                    this.ysmerchant.businessLicenceSdate=this.ysmerchant.businessLicenceSdate +' - '+this.ysmerchant.businessLicenceEdate
                    if(this.ysmerchant.codeLegalPersonAcc=='非法人结算' && this.settlementData.length==11){
                        this.settlementData.pop()
                    }
                    this.imagePath=res.data.imagePath
                    this.ysData={
                        mercId:res.data.mercId,
                        custId:res.data.custId,
                        mercCnm:res.data.mercCnm,
                        mercAbb:res.data.mercAbb,
                        coOperatorNo:res.data.coOperatorNo,
                        signUrl:res.data.signUrl,
                        sysSignFlowId:res.data.sysSignFlowId,
                        status:res.data.status,
                        nogoRemark:res.data.nogoRemark,
                    }
                    // if(!res.data.status){
                    //     this.yinShen.pop()
                    // }
                    this.images=JSON.parse(res.data.images) || {}
                    this.loading=false
                }else{
                    this.ysmerchant={}
                    this.images={}
                }
            })
        }
    },
}
</script>
<style lang="scss" scoped>
.detail-dialog-wrap{
    /deep/ .el-dialog__body{
        padding: 0;
        padding-bottom: 30px;
    }
}
.info-wrap{
    padding:0 50px;
    &.mt20{
        border-top: 15px solid #F4F5F7;
        padding-top: 10px;
    }
    .title{
        color: #333;
        font-size: 18px;
    }
    .info{
        flex-wrap: wrap;
        .item{
            width: 35%;
            margin-top: 5px;
            border-bottom: 1px solid #ddd;
            padding: 5px 0;
            
        }
    }
    .img-wrap{
        .top{
          
        }
        .img-list{
            align-items: center;
            .img-item{
                margin-right: 10px;
                align-items: center;
                .img{
                    width: 93px;
                    height: 61px;
                }
            }
        }
        
    }
}
.status-wrap{
    width: 100%;
    .s-btn{
        padding: 8px;
    }
}
.img{
    width: 93px;
    height: 61px;
    margin: 10px 0;
    cursor: pointer;
}
.symbol{
    color: #EF3C34;
    font-size: 16px;
    margin-right: 5px;
    margin-top: 3px;
}
.sc-txt{
    font-size: 12px;
}
.b-btn{
    width: 100%;
    text-align: center;
    margin-top: 30px;
    .btn{
        width: 200px;
    }
}
.v-dia{
   /deep/ .el-dialog{
        // width: 500px;
   }
}
.v-img{
    width:100%;
}
</style>