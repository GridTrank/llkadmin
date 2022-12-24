<template>
    <div class="page-wrap">
        <div class="page-con-wrap">
            <el-form ref="form" :model="formData" :inline="true" label-width="120px">
                <el-form-item label="代理姓名" >
                    <el-input style="width:200px"></el-input>
                </el-form-item>
                <el-form-item label="代理手机号" >
                    <el-input style="width:200px"></el-input>
                </el-form-item>
                <el-form-item label="收入来源商家" >
                    <el-input style="width:200px"></el-input>
                </el-form-item>
                <el-form-item label="商家手机号" >
                    <el-input style="width:200px"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div class="page-con-wrap">
            <el-table :data="tableData" :header-cell-style="{'background':'#dBDBDB'}" >
                <el-table-column label="代理商姓名" align="center" prop="agentname"></el-table-column>
                <el-table-column label="代理商手机号" align="center" prop="agentphone"></el-table-column>
                <el-table-column label="收入来源商家" align="center" prop="mctname"></el-table-column>
                <el-table-column label="商家手机号" align="center" prop="mctphone"></el-table-column>
                <el-table-column label="用户类型" align="center" prop="payType">
                    <template slot-scope="scope">
                        {{scope.row.payType==1?'微信':'支付宝'}}
                    </template>
                </el-table-column>
                <el-table-column label="跨界收入" align="center" prop="amount"></el-table-column>
                <el-table-column label="消费时间" align="center" prop="created_at"></el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[10, 20, 50, 100]"
                layout="total,sizes, prev, pager, next,jumper"
                :total="total">
            </el-pagination>
        </div>
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
                url:"sys/agent/income",
            }
        }
    },
    created(){
        this.getTableList()
    },
    computed:{},
    methods:{

    },
}
</script>
<style lang="scss" scoped>
</style>