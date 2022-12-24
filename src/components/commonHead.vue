<template>
    <div class="head-wrap f-row" >
        <div class="con f-row">
            <div  class="logo f-col">
                <img src="@/assets/images/logo.png" class="l-img" alt="" srcset="">
                <p class="name">{{userInfo.rolename}}-{{userInfo.username}}</p>
            </div>
            <div class="right">
                <div class="list f-row jc-sb">
                    <div :class="['item','cur-po',{'active':active==index}]" v-for="(item,index) in menusList" :key="index" @click="selectParent(item,index)">
                        {{item.title}}
                    </div>
                </div>
                <div class="c-list f-row" v-if="childrenMenu && childrenMenu.length>0" >
                    <div 
                    :class="['c-item','cur-po',{'c-active':cActive==i}]" 
                    v-for="(e,i) in childrenMenu" 
                    :key="i" 
                    @click="selectChild(e,i)">{{e.title}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'
export default {
   data(){
        return {
            menuList:[
                {
                    menuTitle:'首页',
                    path:'/Home',
                },
                {
                    menuTitle:'商家管理',
                    children:[
                        {
                            menuTitle:'商家列表',
                            path:'/BusinessList',
                        },
                        {
                            menuTitle:'交易明细记录',
                            path:'/TransactionList',
                        },
                        {
                            menuTitle:'账户结算记录',
                            path:'/SettlementList',
                        },
                        {
                            menuTitle:'商家会员管理',
                            path:'/MemberList',
                        }
                    ]
                },
                {
                    menuTitle:'代理商管理',
                    children:[
                        {
                            menuTitle:'代理商列表',
                            path:'/AgentList',
                        },
                        {
                            menuTitle:'跨界收入记录',
                            path:'/IncomeList',
                        },
                        {
                            menuTitle:'账户结算列表',
                            path:'/SettList',
                        }
                    ]
                },
                {
                    menuTitle:'公告管理',
                    children:[
                        {
                            menuTitle:'公共列表',
                            path:'/NoticeList',
                        }
                    ]
                },
                {
                    menuTitle:'城市合伙人服务点',
                    path:'/PartnerList'
                },
                {
                    menuTitle:'系统管理',
                    children:[
                        {
                            menuTitle:'菜单管理',
                            path:'/MenuList',
                        }
                    ]
                },
            ],
            childrenMenu:[],
            active:0,
            cActive:0
        }
    },
    computed:{
        ...mapState({
            menusList:state=>state.common.menusList,
            userInfo:state=>state.common.userInfo,
        })
    },
    created(){
        if(!localStorage.getItem('token')){
            this.$router.push('/Login')
        }
        if(localStorage.getItem('menusList')){
            this.updateMenusList( JSON.parse(localStorage.getItem('menusList')) )
        }
        if(localStorage.getItem('userInfo')){
            this.updateUserInfo(JSON.parse(localStorage.getItem('userInfo')))
        }
        this.active=sessionStorage.getItem('pActive') || 0
        this.cActive=sessionStorage.getItem('cActive') || 0
        if(this.menusList[this.active] && this.menusList[this.active].children){
            this.childrenMenu=this.menusList[this.active].children
        }
    },
    
    methods:{
        ...mapMutations(['updateMenusList','updateUserInfo']),
        selectParent(item,index){
            this.active=index
            sessionStorage.setItem('pActive',index)
            if(item.children){
                this.childrenMenu=item.children
            }else{
                this.childrenMenu=[]
            }
            if(item.link && item.link!='#'){
                this.$router.push(item.link)
            }else{
                this.$router.push(item.children[0].link)
            }
            this.cActive=0
        },
        selectChild(e,i){
            this.cActive=i
            sessionStorage.setItem('cActive',i)
            this.$router.push(e.link)
        }
    },
}
</script>
<style lang="scss" scoped>
.head-wrap{
    height: 130px;
    background-color: #fff;
   
    .con{
        width: 80%;
        margin: auto;
        position: relative;
        .logo{
            flex-shrink: 0;
            align-items: center;
            .l-img{
                width: 64px;
                height: 64px;
            }
            .name{
                color: #333333;
                font-size: 16px;
                margin-top: 10px;
                text-align: center;
            }
        }
        .right{
            position: relative;
            margin-left: 100px;
            width: 100%;
        }
        .list{
            
            position: relative;
            margin-bottom: 40px;
            &::after{
                position: absolute;
                content: '';
                display: block;
                height: 4px;
                background-color: #5A98F3;
                width: 100%;
                bottom: 0px;
            }
            .item{
                padding: 5px 20px;
                position: relative;
                color: #333333;
                font-size: 18px;
                font-weight: 500;
                &.active{
                    color: #fff;
                    background-color: #5A98F3;
                }

            }
        }
        .c-list{
            position: absolute;
            bottom: 5px;
            .c-item{
                color: #333333;
                margin-right: 30px;
                position: relative;
                &.c-active{
                    color: #5A98F3;
                    &::after{
                        position: absolute;
                        content: '';
                        display: block;
                        height: 2px;
                        background-color: #5A98F3;
                        width: 100%;
                        bottom: -20px;
                    }
                }
            }
        }
    }
}
</style>