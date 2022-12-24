<template>
    <div class="page-wrap">
        <div class="page-con-wrap">
            <el-form ref="form" :model="queryData.data" :inline="true" label-width="120px">
                <el-form-item label="商家姓名" >
                    <el-input style="width:200px" v-model="queryData.data.name"></el-input>
                </el-form-item>
                <el-form-item label="商家手机号" >
                    <el-input style="width:200px" v-model="queryData.data.phone"></el-input>
                </el-form-item>
                <el-form-item label="交易类型" >
                    <el-select v-model="queryData.data.type" clearable> 
                        <el-option label="用户消费" :value="1"></el-option>
                        <el-option label="跨界支出" :value="2"></el-option>
                        <el-option label="跨界收入" :value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="消费时间" >
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
            <el-table :data="tableData"   v-loading="loading" :header-cell-style="{'background':'#dBDBDB'}">
                <el-table-column label="商家姓名" align="center" prop="name"></el-table-column>
                <el-table-column label="商家手机号" align="center" prop="phone"></el-table-column>
                <el-table-column label="交易类型" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.type==1" >用户消费</span>
                        <span v-else-if="scope.row.type==2">跨界支出</span>
                        <span v-else-if="scope.row.type==3">跨界收入</span>
                    </template>
                </el-table-column>
                <el-table-column label="用户类型" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.payType==1" >微信</span>
                        <span v-else-if="scope.row.payType==2">支付宝</span>
                    </template>
                </el-table-column>
                <el-table-column label="交易金额" align="center" prop="amount"></el-table-column>
                <el-table-column label="交易手续费" align="center" prop="fee"></el-table-column>
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
            searchTimes:"",
            pageName:'transaction',
            queryData:{
                data:{},
                url:"sys/merchant/transferLog",
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