<template>
    <div class="page-wrap">
        <div class="page-con-wrap">
            <el-form ref="form" :model="formData" :inline="true" label-width="120px">
                <el-form-item label="商家姓名" >
                    <el-input style="width:200px"></el-input>
                </el-form-item>
                <el-form-item label="商家手机号" >
                    <el-input style="width:200px"></el-input>
                </el-form-item>
                <el-form-item label="指定代理姓名" >
                    <el-input style="width:200px"></el-input>
                </el-form-item>
                <el-form-item label="指定代理手机号" >
                    <el-input style="width:200px"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div class="page-con-wrap">
            <div class="btn">
                <el-button type="primary"  @click="btnHandle({},'add')">新增记录</el-button>
            </div>
            <el-table :data="tableData" border >
                <el-table-column label="阶段进度" align="center" prop="stage"></el-table-column>
                <el-table-column label="第二阶段照片" align="center">
                    <template slot-scope="scope">
                        <img  class="l-img" v-if="scope.row.stage2pic" :src="scope.row.stage2pic" alt="">
                        <span v-else>xx</span> 
                    </template>
                </el-table-column>
                <el-table-column label="商家手机号" align="center" prop="phone"></el-table-column>
                <el-table-column label="指定代理姓名" align="center"  prop="name"></el-table-column>
                <el-table-column label="添加时间" align="center"  prop="created_at"></el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[10, 20, 50, 100]"
                layout="total,sizes, prev, pager, next,jumper"
                :total="total">
            </el-pagination>
        </div>
        <el-dialog title="新增记录" :visible="visible" width="40%" @close="visible=false"> 
            <el-form :model="model" label-width="150px">
                <el-form-item label="阶段进度：">
                    <el-input style="width:200px" v-model="model.stage" placeholder="请输入阶段进度"></el-input>
                </el-form-item>
                <el-form-item label="商家手机号：">
                    <el-input style="width:200px" v-model="model.phone" placeholder="请输入阶段进度"></el-input>
                </el-form-item>
                <el-form-item label="指定代理姓名：">
                    <el-select v-model="model.agentid" multiple clearable value-key="name">
                        <li class="el-select-dropdown__item" :class="{ selected: agentSelectedAll }" @click="onAgentSelectedAll">
                            <span>全选</span>
                        </li>
                      <el-option v-for="(item,index) in agentList" :key="index" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="visible = false">取 消</el-button>
                <el-button type="primary" @click="visibleTableHandle(dialogType)">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import tableMixin from '@/mixin/tableMixin'
export default {
    mixins:[tableMixin],
   data(){
        return {
            formData:{},
            queryData:{
                url:"sys/citypartner/list",
                add:'sys/citypartner/add',
                data:{}
            },
            model:{},
            merchantList:[],
            agentList:[],
            pageName:'partnerList'
        }
    },
    created(){
        this.getTableList()
        this.getDataList()
    },
    computed:{
        agentSelectedAll(){
            if(this.model.agentid && this.model.agentid.length>0){
                return this.model.agentid.length==this.agentList.length 
            }
            return false
        }
    },
    methods:{
        getDataList(){
            this.$http.get('sys/notice/members').then(res=>{
                this.merchantList=res.data.memberlist
                this.agentList=res.data.agentlist
            })
        },
        onAgentSelectedAll(){
            let id=[]
            this.agentList.forEach(el=>{
                id.push(el.id)
            })
            this.model.agentid=id
        },
    },
}
</script>
<style lang="scss" scoped>
.btn{
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
}
.l-img{
    width: 80px;
    height: 80px;
}
</style>