<template>
    <div class="page-wrap">
       
        <div class="page-con-wrap">
            <div class="btn-wrap">
                <el-button type="primary" @click="addMenu">添加菜单</el-button>
            </div>
            <el-table 
            class="mt20"
            :data="tableData" 
            v-loading="loading"
            border 
            row-key="id"  
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                <el-table-column  label="名称"    prop="title"> </el-table-column>
                <el-table-column label="跳转链接"  prop="link"></el-table-column>
                <el-table-column label="状态" align="center" prop="status">
                    <template slot-scope="scope">
                         <el-switch v-model="scope.row.status" @change="swithcChange($event,scope.row)"></el-switch>
                        {{scope.row.status?'启用':'禁用'}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" >
                    <template slot-scope="row">
                        <el-button type="primary" size="small" @click="btnHandle(row,1)">编辑</el-button>
                        <el-button type="primary" size="small" v-if="!row.row.pid" @click="btnHandle(row,2)">添加子菜单</el-button>
                        <el-button type="warning" size="small" @click="btnHandle(row,3)">删除</el-button>
                    </template>
                </el-table-column>
               
            </el-table>
            <!-- <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[10, 20, 50, 100]"
                layout="total,sizes, prev, pager, next,jumper"
                :total="1000">
            </el-pagination> -->
        </div>
        <el-dialog 
        :title="title" 
        @close="dialogVisible=false"
        width="30%"
        :visible="dialogVisible">
            <el-form :model="formData">
                <el-form-item label="父级菜单:" v-if="formData.pName">
                    <span>{{formData.pName}}</span>
                </el-form-item>
                <el-form-item label="菜单名称:">
                    <el-input   style="width:200px" v-model="formData.title"></el-input>
                </el-form-item>
                <el-form-item label="跳转链接:">
                    <el-input style="width:200px" v-model="formData.link"></el-input>
                </el-form-item>
                 <el-form-item label="状态：">
                    <el-switch v-model="formData.status" ></el-switch> 
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
   data(){
        return {
            pageName:'menuList',
            formData:{
                status:true
            },
            queryData:{
                url:"sys/menu/list",
                data:{

                }
            },
            title:'添加子菜单',
            expands: [],
            tableData:[],
            dialogVisible:false,
            dialogType:'add',
            loading:false
        }
    },
    created(){
        this.getList()
    },
    computed:{},
    methods:{
        ...mapMutations(['updateMenusList']),
        getList(){
            this.loading=true
            this.$http.get('sys/menu/list',{}).then(res=>{
                res.data.forEach(el=>{
                    if(el.status){
                        el.status=true
                    }else{
                        el.status=false
                    }
                })
                this.initMenu(res.data)
                this.loading=false
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
            this.tableData=val
        },
        submit(){
            let url=this.dialogType=='edit'?'sys/menu/edit':'sys/menu/add'
            let m=JSON.parse(JSON.stringify(this.formData))
            if(this.dialogType=='new'){
                this.formData.pid=0
            }else{
                m.status=m.status?1:0
            }
            
            this.$http.post(url,{...m}).then(res=>{
                if(res.code==1){
                    this.$message({
                        message:'操作成功',
                        type:'success'
                    })
                    this.getList()
                    this.dialogVisible=false
                }
            })
        },
        swithcChange(e,data){
            let d={}
            d.id=data.id
            d.status=data.status?1:0
            this.$http.post('sys/menu/enable',{...d}).then(res=>{
                if(res.code==1){
                    this.$message({
                        message:'操作成功',
                        type:'success'
                    })
                    this.getList()
                }
            })
        },
        addMenu(){
            this.formData={
                status:true
            }
            this.dialogVisible=true
            this.dialogType='new'
        },
        btnHandle(row,type){
            if(type==1 || type==2){
                this.dialogType=type==1?'edit':'add'
                this.title=type==1?'编辑':'添加子菜单'
                if(row.row.pid){
                    let pName=this.tableData.find(el=>el.id==row.row.pid).title
                    row.row.pName=pName
                }
                this.formData= JSON.parse(JSON.stringify(row.row))
                if(type==2){
                    this.formData={
                        pName:row.row.title,
                        pid:row.row.id,
                        status:true
                    }
                }
                this.dialogVisible=true
            }else{
                this.$confirm('确认删除此数据吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.post('sys/menu/delete',{id:row.row.id}).then(res=>{
                        if(res.code==1){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getList()
                        }
                    })
                }).catch(() => {
                         
                });
            }
        }
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
</style>