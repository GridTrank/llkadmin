<template>
    <div class="page-wrap">
        <div class="page-con-wrap">
            <el-form ref="form" :model="queryData.data" :inline="true" label-width="120px">
                <el-form-item label="商家姓名" >
                    <el-input style="width:200px" v-model="queryData.data.name"></el-input>
                </el-form-item>
                <el-form-item label="商家手机号" >
                    <el-input style="width:200px" v-model="queryData.data.phone"></el-input>
                </el-form-item>
                <el-form-item label="所属代理手机号" >
                    <el-input style="width:200px" v-model="queryData.data.agentphone"></el-input>
                </el-form-item>
                <el-form-item label="商家资料状态" >
                    <el-select v-model="queryData.data.status" clearable> 
                        <el-option v-for="(item,index) in statusList" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商家入驻状态" >
                    <el-select v-model="queryData.data.instatus" clearable> 
                        <el-option v-for="(item,index) in inStatusList" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item >
                    <el-button type="primary" @click="search">搜索</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="page-con-wrap">
            <!--  :header-cell-style="{'background':'#dBDBDB'}" -->
            <el-table :data="tableData"  v-loading="loading" :header-cell-style="{'background':'#dBDBDB'}">
                <el-table-column label="商家姓名" align="center" prop="name" width="150">  </el-table-column>
                <el-table-column label="商家手机号" align="center" porp="phone" width="150">
                    <template slot-scope="scope">
                        {{scope.row.phone}} <i @click="changePhone(scope.row)" class="el-icon-edit cur-po look"></i>
                    </template>
                </el-table-column>
                <el-table-column label="商家总会员数" align="center" prop="subs"></el-table-column>
                <el-table-column label="所属代理姓名" align="center" prop="agentname" ></el-table-column>
                <el-table-column label="所属代理手机号" align="center" prop="agentphone" width="150"></el-table-column>
                <el-table-column label="商家资料状态" align="center" prop="status" width="200">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status==1" @click="rowHandle(scope.row,1)">待审核</span>
                        <span v-else-if="scope.row.status==2">审核通过，<span class="look cur-po" @click="rowHandle(scope.row,2)">请查看</span></span>
                        <span v-else-if="scope.row.status==3">审核拒绝，<span class="look cur-po" @click="rowHandle(scope.row,3)">请查看</span></span>
                        <span v-else>未提交</span>
                    </template>
                </el-table-column>
                <el-table-column label="商家入驻状态" align="center" prop="instatus" width="120">
                    <template slot-scope="scope">
                        <span v-if="scope.row.instatus==1" >待审核</span>
                        <span v-else-if="scope.row.instatus==2">后台操作通过</span>
                        <span v-else-if="scope.row.instatus==3">后台操作拒绝</span>
                        <span v-else>未提交</span>
                    </template>
                </el-table-column>
                <el-table-column label="添加商家时间" align="center" prop="created_at"  width="180"></el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[10, 20, 50, 100]"
                layout="total,sizes, prev, pager, next,jumper"
                :total="total">
            </el-pagination>
        </div>

        <el-dialog title="修改手机号" :visible="phoneVisibe" width="30%" @close="phoneVisibe=false">
            <el-form :model="phoneModel" label-width="100px">
                <el-form-item :label="phoneModel.name+'：'">
                    <el-input style="width:200px" v-model="phoneModel.phone" placeholder=""></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="phoneSubmit">确 定</el-button>
            </span>
        </el-dialog>
        <detailDialogVue ref='detailDialog' :id="id" pageFrom="business"></detailDialogVue>
    </div>
</template>

<script>
import tableMixin from '@/mixin/tableMixin'
import detailDialogVue from '@/components/detailDialog.vue'
export default {
    mixins:[tableMixin],
    components:{
        detailDialogVue
    },
    data(){
        return {
            queryData:{
                url:"sys/merchant/list",
                data:{}
            },
            phoneVisibe:false,
            phoneModel:{
                name:'123132',
            },
            detailVisibe:false,
            statusList:[
                {label:'未提交',value:0},
                {label:'审核中',value:1},
                {label:'审核通过',value:2},
                {label:'审核拒绝',value:3},
            ],
            inStatusList:[
                {label:'未入驻',value:0},
                {label:'入驻审核中',value:1},
                {label:'审核通过',value:2},
                {label:'审核拒绝',value:3},
            ],
            id:0
        }
    },
    created(){
        this.getTableList()
    },
    computed:{},
    methods:{
        rowHandle(data,type){
            if(type!==1){
                this.id=data.id
                this.$refs.detailDialog.visible=true
            }
            // this.$http.post('sys/merchant/info',{
            //     id:data.id
            // }).then(res=>{
            //     console.log(res)
            // })
        },
        changePhone(data){
            this.phoneModel= JSON.parse(JSON.stringify(data))
            this.phoneVisibe=true
        },
        phoneSubmit(){
            this.$http.post('sys/merchant/modifymobile',{
                id:this.phoneModel.id,
                phone:this.phoneModel.phone
            }).then(res=>{
                if(res.code==1){
                    this.$message({
                        type: 'success',
                        message: '修改成功!'
                    });
                    this.getTableList()
                }
                this.phoneVisibe=false
            })
        },
    },
}
</script>
<style lang="scss" scoped>
.look{
    color: #4998FF;
}
.p-btn{
    width: 50%;
}
.page-con-wrap{
    min-width: 12·00px;
}
</style>