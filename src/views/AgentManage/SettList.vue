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
                <el-form-item label="结算时间" >
                    <el-input style="width:200px"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div class="page-con-wrap">
            <el-table :data="tableData" border >
                <el-table-column label="代理商姓名" align="center" prop="name"></el-table-column>
                <el-table-column label="代理商手机号" align="center" prop="phone"></el-table-column>
                <el-table-column label="结算分润金额" align="center" prop="divsion"></el-table-column>
                <el-table-column label="结算分润手续费" align="center" prop="divsionfee"></el-table-column>
                <el-table-column label="实收金额" align="center" prop="amt"></el-table-column>
                <el-table-column label="结算时间" align="center" prop="created_at"></el-table-column>
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
                url:"sys/agent/settlementLog",
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