<template>
    <div class="login-wrap">
        <div class="input-wrap">
            <img class="logo" src="@/assets/images/logo.png" alt="" srcset="">
            <p class="title mt50">来来客后台管理系统！</p>
            <el-input class="mt20 input" placeholder="请输入登录名" v-model="username">
                <i
                    class="el-icon-circle-close el-input__icon"
                    slot="suffix"
                    >
                </i>
            </el-input>
            <el-input v-model="password" type="password" class="mt20 input" placeholder="请输入密码"></el-input>
            <el-button class=" btn" type="primary" @click="login">登录</el-button>
            <p class="forget mt20 cur-po">忘记密码</p>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
    name:'login',
    data(){
        return{
            username:'',
            password:'',
            allMenu:[]
        }
    },
    methods:{
        ...mapMutations(['updateMenusList','updateUserInfo']),
        login(){
            this.$http.post('sys/login',{
                username:this.username,
                password:this.password
            }).then(res=>{
                localStorage.setItem('token',res.data.token)
                this.updateUserInfo(res.data)
                // console.log(JSON.parse(res.data.menuList) )
                this.initMenu(JSON.parse(res.data.menuList))
            })
        },
        initMenu(data){
            const map = {};
            const val = [];
            data.forEach((item) => {
                map[item.id] = item;
            });
            data.forEach((item) => {
                const parent = map[item.pid];
                if (parent) {
                    (parent.children || (parent.children = [])).push(item);
                } else {
                    val.push(item);
                }
            });
            this.updateMenusList(val)
            this.$message({
                message:'登录成功',
                type:'success'
            })
            this.$router.push('/Home')
        }
    }
}
</script>

<style scoped lang="scss">
.login-wrap{
    width: 100%;
    height: 100vh;
    background-image: url('@/assets/images/login-bg.png');
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    
    .input-wrap{
        background-color: #fff;
        border-radius: 17px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 38px;
        .logo{
            width: 86px;
            height: 86px;
        }
        .input{
            width: 300px;
        }
        .btn{
            width: 300px;
            border-radius: 30px;
            margin-top: 20px;
        }
        .forget{
            color: #666666;
            font-size: 12px;
            text-align: right;
            width: 100%;
        }
    }
}
</style>