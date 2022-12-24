<template>
    <div class="page-wrap">
        <div class="top f-row jc-sa">
            <div class="item f-row jc-sb">
                <div class="left f-row">
                    <img src="@/assets/images/logo.png" class="icon" alt="" srcset="">
                    总商家数（个）
                </div>
                <div class="right">{{indexData.merchantNum}}</div>
            </div>
            <div class="item f-row jc-sb">
                <div class="left f-row">
                    <img src="@/assets/images/logo.png" class="icon" alt="" srcset="">
                    总代理数（个）
                </div>
                <div class="right">{{indexData.agentNum}}</div>
            </div>
            <div class="item f-row jc-sb">
                <div class="left f-row">
                    <img src="@/assets/images/logo.png" class="icon" alt="" srcset="">
                    总会员数（个）
                </div>
                <div class="right">{{indexData.fansNum}}</div>
            </div>
        </div>
        <div class="center">
            <div class="date-type f-row">
                <p 
                :class="['date','cur-po',{'active':dateActive==index}]" 
                v-for="(item,index) in dateType" 
                @click="dateActive=index"
                :key="index">
                    {{item}}
                </p>
            </div>
            <div class="data-list f-row jc-sb">
                <div class="data-item">
                    <p class="d-t">交易统计</p>
                    <p class="d-d">商家用户交易额：<span class="d-num">{{indexData.mctTtTransfer}}</span></p>
                    <p class="d-d">商家总跨界收入：<span class="d-num">{{indexData.mctTtIncome}}</span></p>
                    <p class="d-d">商家总跨界支出：<span class="d-num">{{indexData.mctTtPay}}</span></p>
                    <p class="d-d">代理总跨界收入：<span class="d-num">{{indexData.agentTtKjIn}}</span></p>
                </div>
                <div class="data-item">
                    <p class="d-t">结算实收统计</p>
                    <p class="d-d">商家交易账户总实收：<span class="d-num">{{indexData.mctTtInAmt}}</span></p>
                    <p class="d-d">商家分润账户总实收：<span class="d-num">{{indexData.mctTtDvInAmt}}</span></p>
                    <p class="d-d">代理分润账户总实收：<span class="d-num">{{indexData.agentTtDvInAmt}}</span></p>
                </div>
                <div class="data-item">
                    <p class="d-t">结算手续费统计</p>
                    <p class="d-d">商家交易账户总手续费：<span class="d-num">{{indexData.mctTtInfee}}</span></p>
                    <p class="d-d">商家分润账户总手续费：<span class="d-num">{{indexData.mctTtDvInfee}}</span></p>
                    <p class="d-d">代理分润账户总手续费：<span class="d-num">{{indexData.agentTtDvInfee}}</span></p>
                </div>
            </div>
        </div>
        <div class="center bottom">
            <div class="b-t">系统消息:</div>
            <div class="list mt20">
                <div class="item" v-for="(item,index) in noticeList" :key="index">
                   {{item.title}}: {{item.content}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'home',
    data(){
        return{
            dateType:['今天','昨天','近7天'],
            dateActive:0,
            indexData:{},
            noticeList:[]
        }
    },
    created(){
        this.getIndexData()
        this.getNoticeList()
    },
    methods:{
        getIndexData(){
            this.$http.get('sys/index',{}).then(res=>{
                this.indexData=res.data
            })
        },
        getNoticeList(){
            this.$http.get('sys/notice/list',{}).then(res=>{
                this.noticeList=res.data.data
                console.log(1231321321,this.noticeList)
            })
        }
    }
}
</script>

<style scoped lang="scss">
.top{
    background-color: #fff;
    margin-top: 30px;
    border-radius: 12px;
    padding: 40px;
    .item{
        width: 25%;
        height: 130px;
        box-shadow: 0px 0px 5px rgba($color: #000, $alpha: 0.5);
        border-radius: 12px;
        padding: 0 20px;
        .icon{
            width:30px ;
            height: 30px;
            border-radius: 50%;
        }
    }
}
.center{
    background-color: #fff;
    margin-top: 30px;  
    padding: 40px ;
    border-radius: 12px; 
    .date-type{
        .date{
            margin-right: 45px;
            padding: 6px 20px;
            &.active{
                background-color: #5A98F3;
                color: #fff;
               
            }
        }
    }
    .data-list{
        margin-top: 20px;
        .data-item{
            padding: 15px 0;
            box-shadow: 0px 0px 5px rgba($color: #000, $alpha: 0.5);
            border-radius: 12px;
            height: 250px;
            flex-shrink: 0;
            p{
                padding:10px 50px;
                color: #333333;
            }
            .d-t{
                border-bottom: 1px solid #f1f1f1;
                font-size:18px;
                text-align: center;
            }
            .d-d{
                font-size: 14px;
            }
            .d-num{
                font-size:18px;
            }
        }
    }
}
.bottom{
    .b-t{
        color: #434A54;
        font-size: 18px;
    }

    .item{
        line-height: 40px;
    }
}
</style>