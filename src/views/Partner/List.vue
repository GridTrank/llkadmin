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
                <el-button type="primary">新增记录</el-button>
            </div>
            <el-table :data="tableData" border >
                <el-table-column label="阶段进度" align="center"></el-table-column>
                <el-table-column label="第二阶段照片" align="center"></el-table-column>
                <el-table-column label="商家手机号" align="center"></el-table-column>
                <el-table-column label="指定代理姓名" align="center"></el-table-column>
                <el-table-column label="添加时间" align="center"></el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[10, 20, 50, 100]"
                layout="total,sizes, prev, pager, next,jumper"
                :total="1000">
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
                url:"123",
            }
        }
    },
    created(){
    },
    computed:{},
    methods:{

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