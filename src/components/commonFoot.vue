<template>
    <div class="foot-wrap f-row">
        <div class="con f-row jc-sb">
            <p class="left">欢迎您来到来到来来客后台系统！</p>
            <p class="right cur-po" @click="logout">安全退出</p>
        </div>
    </div>
</template>

<script>
export default {
   data(){
        return {
        }
    },
    created(){},
    computed:{},
    methods:{
        logout(){
            this.$http.get('sys/logout',{}).then(res=>{
                localStorage.clear()
                sessionStorage.clear()
                this.$message({
                    message:'退出登录',
                    type:'success'
                })
                this.$router.push('/Login')
            })
        }
    },
}
</script>
<style lang="scss" scoped>
.foot-wrap{
    height: 75px;
    background-color: #fff;
    width: 100%;
    position: fixed;
    min-width: 1200px;
    bottom: 0;
    left: 0;
    z-index: 99;
    .con{
        width: 80%;
        margin: auto;
        .left{
            color: #AAAAAA;
            font-size: 14px;
        }
        .right{
            color: #5A98F3;
        }
    }
}
</style>