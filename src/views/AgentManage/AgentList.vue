<template>
    <div class="page-wrap">
        <div class="page-con-wrap">
            <el-form ref="form" :model="queryData.data" :inline="true" label-width="120px">
                <el-form-item label="代理姓名" >
                    <el-input style="width:200px" v-model="queryData.data.name"></el-input>
                </el-form-item>
                <el-form-item label="代理手机号" >
                    <el-input style="width:200px" v-model="queryData.data.phone"></el-input>
                </el-form-item>
                <el-form-item label="代理资料状态" >
                    <el-select v-model="queryData.data.status" clearable > 
                        <el-option v-for="(item,index) in statusList" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="代理入驻状态" >
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
            <el-table :data="tableData" :header-cell-style="{'background':'#dBDBDB'}" v-loading="loading">
                <el-table-column label="代理商姓名" align="center" prop="name"></el-table-column>
                <el-table-column label="代理商手机号" align="center" prop="phone"></el-table-column>
                <el-table-column label="总商家数" align="center" prop="subs"></el-table-column>
                <el-table-column label="代理资料状态" align="center" prop="status">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status==1" >待审核，<span class="look cur-po" @click="agentHandle(scope.row,1,'')">请查看</span></span>
                        <span v-else-if="scope.row.status==2">审核通过，<span class="look cur-po" @click="agentHandle(scope.row,2,'')">请查看</span></span>
                        <span v-else-if="scope.row.status==3">审核拒绝，<span class="look cur-po" @click="agentHandle(scope.row,3),''">请查看</span></span>
                        <span v-else>未提交</span>
                    </template>
                </el-table-column>
                <el-table-column label="代理入驻状态" align="center" prop="instatus">
                    <template slot-scope="scope">
                        <span v-if="scope.row.instatus==1" >待审核，<span class="look cur-po" @click="agentHandle(scope.row,1,'income')">请查看</span></span>
                        <span v-else-if="scope.row.instatus==2">已入驻</span>
                        <span v-else-if="scope.row.instatus==3">拒绝</span>
                        <span v-else>未入驻</span>
                    </template>
                </el-table-column>
                <el-table-column label="推荐邀请人" align="center" prop="agentname"></el-table-column>
                <el-table-column label="注册时间" align="center" prop="created_at"></el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[10, 20, 50, 100]"
                layout="total,sizes, prev, pager, next,jumper"
                :total="total">
            </el-pagination>
        </div>

        <el-dialog :visible="examineDialog" width="20%" @close="examineDialog=false" title="">
            <div class="ex-wrap">
                <p class="t">审核</p>
                <template v-if="examinStep==1">
                    <div class="item">
                        <span>代理姓名：</span>
                        <span>{{examinData.name}}</span>
                    </div>
                    <div class="item">
                        <span>代理手机号：</span>
                        <span>{{examinData.phone}}</span>
                    </div>
                    <div class="btn-wrap mt20">
                        <el-button class="btn left" @click="showDetail">查看资料明细</el-button>
                        <el-button class="btn" type="primary" @click="examinSubmit(1)">审核</el-button>
                    </div>
                </template>
                <template v-else-if="examinStep==2">
                    <div class="item">
                        请选择审核结果
                    </div>
                    <div class="btn-wrap mt20">
                        <el-button  class="btn left" @click="examinStep=3">审核拒绝</el-button>
                        <el-button class="btn" type="primary" @click="examinSubmit(2)">审核通过</el-button>
                    </div>
                </template>
                <template v-else-if="examinStep==3 ">
                    <div class="item">
                        请输入拒绝原因
                    </div>
                    <el-input type="textarea" v-model="refuse"></el-input>
                    <div class="btn-wrap mt20">
                        <el-button class="btn left" @click="examineDialog=false">取消</el-button>
                        <el-button class="btn" type="primary" @click="examinSubmit(3)">确认</el-button>
                    </div>
                </template>
            </div>
        </el-dialog>

        <detailDialogVue ref='detailDialog' :id="id" pageFrom="agentList"></detailDialogVue>
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
                url:"sys/agent/list",
                data:{}
            },
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
            id:0,
            examineDialog:false,
            examinData:{},
            refuse:"",
            examinStep:1,
            examinType:''
        }
    },
    created(){
        this.getTableList()
    },
    watch:{
        examineDialog(val){
            if(!val){
                this.examinStep=1
            }
        }
    },
    computed:{},
    methods:{
        agentHandle(data,val,type){
            this.examinType=type
            if(val!==1){
                this.id=data.id
                this.$refs.detailDialog.visible=true
            }else{
                this.examinData=data
                this.examineDialog=true
            }
        },
        showDetail(){
            this.id=this.examinData.id
            this.$refs.detailDialog.visible=true
        },
        examinSubmit(val){
            if(this.examinStep==1){
                this.examinStep=2
            }
            if(val==2 || val==3){
                // 审核通过
                let param={
                    id:this.examinData.id,
                    type:val,
                }
                if(val==3 ){
                    param.message=this.refuse
                }
                let url=this.examinType=='income'?'sys/agent/auditSettle':'sys/agent/audit'
                this.$http.post(url,param).then(res=>{
                    if(res.code==1){
                        this.$message({
                            type: 'success',
                            message: '修改成功!'
                        });
                        this.examineDialog=false
                        this.getTableList()
                    }
                })
            }
        }

    },
}
</script>
<style lang="scss" scoped>
.look{
    color: #4998FF;
}
.ex-wrap{
    .t{
        text-align: center;
        margin-bottom: 30px;
    }
    .item{
        text-align: center;
    }
    .btn-wrap{
        display: flex;
        justify-content: space-around;
        .btn{
            width: 120px;
        }
    }
}
</style>