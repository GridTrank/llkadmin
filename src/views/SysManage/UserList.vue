<template>
    <div class="page-wrap">
       
        <div class="page-con-wrap">
            <div class="btn-wrap">
                <el-button type="primary" @click="btnHandle({},'add')">添加用户</el-button>
            </div>
            <el-table  class="mt20" :data="tableData" :header-cell-style="{'background':'#dBDBDB'}" v-loading="loading">
                <el-table-column label="用户姓名" align="center" prop="username"></el-table-column>
                <el-table-column label="最后登陆IP" align="center" prop="last_login_ip"></el-table-column>
                <el-table-column label="最近登录时间" align="center" prop="last_login_time"></el-table-column>
                <el-table-column label="用户角色" align="center" prop="role">
                    <template slot-scope="scope">
                        {{userRole(scope.row.role)}}
                    </template>
                </el-table-column>
                <el-table-column label="状态" align="center" prop="status">
                    <template slot-scope="scope">
                         <el-switch v-model="scope.row.status" @change="swithcChange($event,scope.row)"></el-switch>
                        {{scope.row.status?'启用':'禁用'}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" prop="">
                    <template slot-scope="scope" v-if="scope.row.role!=1" >
                        <el-button type="primary" size="small" @click="btnHandle(scope.row,'edit')">编辑</el-button>
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

        <el-dialog :title="dialogType=='edit'?'编辑':'添加'" :visible="visible" width="30%" @close="visible=false">
            <el-form :model="model" label-width="100px">
                <el-form-item label="用户名：">
                     <el-input style="width:200px" v-model="model.username" placeholder="请输入用户名称"></el-input>
                </el-form-item>
                <el-form-item label="密码：">
                    <el-input style="width:200px" v-model="model.password" placeholder="请输入用户密码"></el-input>
                </el-form-item>
                <el-form-item label="状态：">
                    <el-switch v-model="model.status"></el-switch> 
                </el-form-item>
                 <el-form-item label="角色：">
                    <el-select v-model="model.role" >
                      <el-option v-for="(item,index) in roleList" :key="index" :label="item.name" :value="item.id"></el-option>
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
            queryData:{
                url:"sys/user/list",
                edit:'sys/user/edit',
                add:'sys/user/add',
                del:'sys/user/delete',
                enable:'sys/user/enable',
            },
            model:{
                status:true
            },
            modelHasStatus:true,
            title:'添加',
            dialogType:'',
            visible:false,
            roleList:[],
        }
    },
    created(){
        this.getTableList()
        this.getRoleList()
    },
    computed:{},
    methods:{
        getRoleList(){
            this.$http.get('sys/role/list',{page:1,per_page:100}).then(res=>{
                this.roleList=res.data.data
            })
        },
        
        userRole(id){
            let name=this.roleList.find(el=>{
                return el.id==id
            })
            if(name)
                return name.name
        }
    },
}
</script>
<style lang="scss" scoped>
</style>