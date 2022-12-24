<template>
    <div class="page-wrap">
        <div class="page-con-wrap">
            <el-form ref="form" :model="formData" :inline="true" label-width="120px">
                <el-form-item label="指定商家姓名" >
                    <el-select v-model="queryData.data.memberid" multiple clearable >
                       <el-option v-for="(item,index) in merchantList" :key="index" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="指定代理姓名" >
                    <el-select v-model="queryData.data.agentid" multiple clearable>
                       <el-option v-for="(item,index) in agentList" :key="index" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item >
                    <el-button type="primary" @click="search">搜索</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="page-con-wrap">
            <div class="btn">
                <el-button type="primary" @click="btnHandle({},'add')">新增记录</el-button>
            </div>
            <el-table :data="tableData" :header-cell-style="{'background':'#dBDBDB'}"  v-loading="loading">
                <el-table-column label="公告标题" align="center" prop="title"></el-table-column>
                <el-table-column label="公告内容" align="center" prop="content">
                    <template slot-scope="scope"  >
                        <el-popover
                            placement="top-start"
                            width="200"
                            trigger="hover"
                            :content="scope.row.content">
                            <div slot="reference" class="oneHidden  cur-po">{{scope.row.content}}</div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column label="指定商家姓名" align="center" prop="title">
                    <template slot-scope="scope"  >
                        <el-popover
                            placement="top-start"
                            width="200"
                            trigger="hover"
                            :content="replaceMemName(scope.row.memberid)">
                            <div slot="reference" class="oneHidden cur-po">{{replaceMemName(scope.row.memberid)}}</div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column label="指定代理姓名" align="center" prop="title">
                    <template slot-scope="scope"  >
                        <el-popover
                            placement="top-start"
                            width="200"
                            trigger="hover"
                            :content="replaceAgName(scope.row.agentid)">
                            <div slot="reference" class="oneHidden cur-po">{{replaceAgName(scope.row.agentid)}}</div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column label="发布时间" align="center" prop="created_at"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope"  >
                        <el-button v-if="scope.row.status!=1" type="primary" size="small" @click="btnHandle(scope.row,'edit')">编辑</el-button>
                        <el-button v-if="scope.row.status!=1" type="primary" size="small" @click="btnHandle(scope.row,'release')">发布</el-button>
                        <el-button v-else type="primary" size="small" >已发布</el-button>
                        <el-button type="warning" size="small" @click="btnHandle(scope.row,'del')">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[10, 20, 50, 100]"
                layout="total,sizes, prev, pager, next,jumper"
                :total="total">
            </el-pagination>
        </div>

        <el-dialog :title="dialogType=='add'?'添加公告':'修改公告'" :visible="visible" width="40%" @close="visible=false"> 
            <el-form :model="model" label-width="150px">
                <el-form-item label="公告标题：">
                     <el-input style="width:200px" v-model="model.title" placeholder="请输入用户名称"></el-input>
                </el-form-item>
                <el-form-item label="指定商家姓名：">
                    <el-select v-model="model.memberid" multiple clearable value-key="name">
                        <li class="el-select-dropdown__item" :class="{ selected: memSelectedAll }" @click="onMemberSelectedAll">
                            <span>全选</span>
                        </li>
                        <el-option v-for="(item,index) in merchantList" :key="index" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="指定代理姓名：">
                    <el-select v-model="model.agentid" multiple clearable value-key="name">
                        <li class="el-select-dropdown__item" :class="{ selected: agentSelectedAll }" @click="onAgentSelectedAll">
                            <span>全选</span>
                        </li>
                      <el-option v-for="(item,index) in agentList" :key="index" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                 <el-form-item label="">
                    <el-input
                    type="textarea"
                    placeholder="请输入内容"
                    v-model="model.content"
                    show-word-limit
                    >
                    </el-input>
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
                url:"sys/notice/list",
                add:'sys/notice/add',
                release:'sys/notice/pub',
                del:'sys/notice/delete',
                edit:'sys/notice/edit',
                data:{}
            },
            dialogType:'add',
            model:{},
            merchantList:[],
            agentList:[],
            pageName:'noticeList'
        }
    },
    created(){
        this.getTableList()
        this.getDataList()
    },
    computed:{
        memSelectedAll(){
            if(this.model.memberid && this.model.memberid.length>0){
                return this.model.memberid.length==this.merchantList.length 
            }
            return false
        },
        agentSelectedAll(){
            if(this.model.agentid && this.model.agentid.length>0){
                return this.model.agentid.length==this.agentList.length 
            }
            return false
        }
    },
    methods:{
        onMemberSelectedAll(){
            let id=[]
            this.merchantList.forEach(el=>{
                id.push(el.id)
            })
            this.model.memberid=id
        },
        onAgentSelectedAll(){
            let id=[]
            this.agentList.forEach(el=>{
                id.push(el.id)
            })
            this.model.agentid=id
        },
        getDataList(){
            this.$http.get('sys/notice/members').then(res=>{
                this.merchantList=res.data.memberlist
                this.agentList=res.data.agentlist
            })
        },
        replaceMemName(ids){
            let id=ids.split(',')
            let arr=[]
            id.forEach(el=>{
                let n=this.merchantList.find(e=>{
                    return e.id==el
                })
                if(n && n.name){
                    arr.push(n.name)
                }
            })
            return arr.join(',')
        },
        replaceAgName(ids){
            let id=ids.split(',')
            let arr=[]
            id.forEach(el=>{
                let n=this.agentList.find(e=>{
                    return e.id==el
                })
                if(n && n.name){
                    arr.push(n.name)
                }
            })
            return arr.join(',')
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
.oneHidden{
    width:120px;
    margin: auto;
}
</style>