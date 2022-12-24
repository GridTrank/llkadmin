<template>
    <div class="page-wrap">
       
        <div class="page-con-wrap">
            <div class="btn-wrap">
                <el-button type="primary" @click="btnHandle({},'add')">添加白名单</el-button>
            </div>
            <el-table  class="mt20" :data="tableData" border v-loading="loading">
                <el-table-column label="ip" align="center" prop="ip"></el-table-column>
                <el-table-column label="创建时间" align="center" prop="created_at"></el-table-column>
                <el-table-column label="更新时间" align="center" prop="updated_at"></el-table-column>
                <el-table-column label="状态" align="center" prop="status">
                    <template slot-scope="scope">
                         <el-switch v-model="scope.row.status" @change="swithcChange($event,scope.row)"></el-switch>
                        {{scope.row.status?'启用':'禁用'}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" prop="">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" @click="btnHandle(scope.row,'edit')">编辑</el-button>
                        <el-button v-if="scope.row.role!=1" type="warning" size="small" @click="btnHandle(scope.row,'del')">删除</el-button>
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
        <el-dialog :title="dialogType=='edit'?'编辑':'添加'"  :visible="visible" width="30%" @close="visible=false">
            <el-form :model="model" label-width="100px">
                <el-form-item label="ip：">
                     <el-input style="width:200px" v-model="model.ip" placeholder="请输入ip地址"></el-input>
                </el-form-item>
                <el-form-item label="状态：">
                    <el-switch v-model="model.status" ></el-switch> 
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
                url:"sys/ipwhite/list",
                edit:'sys/ipwhite/edit',
                add:'sys/ipwhite/add',
                del:'sys/ipwhite/delete',
                enable:'sys/ipwhite/enable',
            },
            model:{
                status:true
            },
            modelHasStatus:true,
            dialogType:'',
            visible:false,
            roleList:[],
        }
    },
    created(){
        this.getTableList()
    },
    computed:{},
    methods:{
        
        userRole(id){
            let name=this.roleList.find(el=>{
                return el.id==id
            })
            return name.name
        }
    },
}
</script>
<style lang="scss" scoped>
</style>