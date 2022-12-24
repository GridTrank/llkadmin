<template>
    <div class="page-wrap">
        <div class="page-con-wrap">
            <div class="btn-wrap">
                <el-button type="primary" @click="btnHandle({},'add')">添加角色</el-button>
            </div>
            <el-table class="mt20" :data="tableData" border v-loading="loading">
                <el-table-column label="角色id" align="center" prop="id"></el-table-column>
                <el-table-column label="角色" align="center" prop="name"></el-table-column>
                <el-table-column label="状态" align="center" prop="status">
                    <template slot-scope="scope">
                         <el-switch v-model="scope.row.status" @change="swithcChange($event,scope.row)"></el-switch>
                        {{scope.row.status?'启用':'禁用'}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" prop="">
                    <template slot-scope="scope" v-if="scope.row.id!=1" >
                        <el-button type="primary" size="small"  @click="btnHandle(scope.row,'edit')">编辑</el-button>
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
        <el-dialog :title="title" :visible="visible" width="30%" @close="visible=false">
            <el-form :model="model" label-width="100px">
                <el-form-item label="上级角色：">
                    <span>超级管理员</span>
                </el-form-item>
                <el-form-item label="角色名称：">
                    <el-input style="width:200px" v-model="model.name" placeholder="请输入角色名称"></el-input>
                </el-form-item>
                <el-form-item label="角色状态：">
                    <el-switch v-model="model.status" ></el-switch> 
                </el-form-item>
                
                <el-form-item label="菜单权限：">
                    <div >
                        <el-tree
                        :data="menusList"
                        show-checkbox
                        node-key="id"
                        ref="tree"
                        :default-checked-keys="checkKeys"
                        :props="defaultProps">
                        </el-tree>
                    </div>
                    
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="visible = false">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import tableMixin from '@/mixin/tableMixin'
import { mapState,mapMutations } from 'vuex'
export default {
    mixins:[tableMixin],
   data(){
        return {
            pageName:'roleList',
            model:{
                status:true
            },
            modelHasStatus:true,
            queryData:{
                url:"sys/role/list",
                edit:'sys/role/edit',
                del:'sys/role/delete',
                add:'sys/role/add',
                enable:'sys/role/enable'
            },
            title:'添加',
            dialogType:'',
            visible:false,
            defaultProps: {
                children: 'children',
                label: 'title'
            },
            checkKeys:[]
        }
    },
    created(){
        this.getTableList()
    },
    computed:{
        ...mapState({
            menusList:state=>state.common.menusList,
        })
    },
    watch:{
        visible(val){
            if(!val){
                this.$refs.tree.setCheckedNodes([])
            }
        }
    },
    methods:{
       
        submit(){
            let menu_auth=','+this.$refs.tree.getCheckedKeys().join(',')+','
            this.model.pid=1
            this.model.menu_auth=menu_auth
            this.visibleTableHandle(this.dialogType)
           
        },
        
    },
}
</script>
<style lang="scss" scoped>
</style>