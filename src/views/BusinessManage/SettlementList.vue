<template>
    <div class="page-wrap">
        <div class="page-con-wrap">
            <el-form ref="form" :model="queryData.data" :inline="true" label-width="120px">
                <el-form-item label="商家姓名" >
                    <el-input style="width:150px" v-model="queryData.data.name"></el-input>
                </el-form-item>
                <el-form-item label="商家手机号" >
                    <el-input style="width:150px" v-model="queryData.data.phone"></el-input>
                </el-form-item>
                <el-form-item label="结算时间" >
                    <el-date-picker
                    v-model="searchTimes"
                    type="daterange"
                    range-separator="至"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :default-time="['00:00:00', '23:59:59']"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item >
                    <el-button type="primary" @click="search">搜索</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="page-con-wrap">
            <el-table :data="tableData" v-loading="loading" :header-cell-style="{'background':'#dBDBDB'}">
                <el-table-column label="商家姓名" align="center" prop="name"></el-table-column>
                <el-table-column label="商家手机号" align="center" prop="phone"></el-table-column>
                <el-table-column label="结算交易金额" align="center" prop="amount"></el-table-column>
                <el-table-column label="结算交易手续费" align="center" prop="fee"></el-table-column>
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
            searchTimes:'',
            queryData:{
                data:{},
                url:"sys/merchant/settlementLog",
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