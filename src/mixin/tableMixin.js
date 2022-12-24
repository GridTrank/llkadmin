export default {
    data(){
        return{
            tableData:[],
            loading:false,
            visible:false,
            pager:{
                page:1,
                perpage:10
            },
            total:0
        }
    },
    watch:{
        visible(val){
            if(!val){
                this.model={}
                if(this.modelHasStatus){
                    this.model={status:true}
                }
            }
            
        }
    },
    methods:{
        search(){
            for(var key in this.queryData.data){
                if(!this.queryData.data[key]){
                    delete this.queryData.data[key]
                }
            }
            this.pager={
                page:1,
                perpage:10
            }
            if(this.searchTimes && this.searchTimes.length>0){
                this.queryData.data.start_time=this.searchTimes[0]
                this.queryData.data.end_time=this.searchTimes[1]
            }
            this.getTableList()
        },
        getTableList(){
            this.loading=true
            this.$http.get(this.queryData.url,{...this.queryData.data,...this.pager}).then(res=>{
                if(this.modelHasStatus){
                    res.data.data.forEach(el=>{
                        if(el.status){
                            el.status=true
                        }else{
                            el.status=false
                        }
                    })
                }
                this.tableData=res.data.data
                this.total=res.data.total
                this.loading=false
            })
        },
        // dialog确认事件
        visibleTableHandle(type){
            let m=JSON.parse(JSON.stringify(this.model))
            if(this.modelHasStatus){
                m.status=m.status?1:0
            }
            if(this.pageName=='noticeList'){
                m.agentid=','+m.agentid.join(',')+','
                m.memberid=','+m.memberid.join(',')+','
            }else if(this.pageName=='partnerList'){
                m.agentid=m.agentid.join(',')
            }
            this.$http.post(this.queryData[type],{...m}).then(res=>{
                if(res.code==1){
                    this.$message({
                        message:'操作成功',
                        type:'success'
                    })
                    this.getTableList()
                    this.visible=false
                }
            })
        },
        // 表格操作事件
        btnHandle(data,type){
            this.dialogType=type
            if(type=='add'){
                this.visible=true
            }else if(type=='edit'){
                this.model= JSON.parse(JSON.stringify(data)) 
                if(this.pageName=='roleList'){
                    this.checkKeys=data.menu_auth.split(',')
                }else if(this.pageName=='noticeList'){
                    this.model.agentid=this.model.agentid.split(',').map(el=>{
                        if(el){
                            return Number(el)
                        }
                    })
                    this.model.agentid.shift()
                    this.model.agentid.pop()
                    this.model.memberid=this.model.memberid.split(',').map(el=>{
                        if(el){
                            return Number(el)
                        }
                    })
                    this.model.memberid.shift()
                    this.model.memberid.pop()
                }else if(this.pageName=='partnerList'){
                    this.model.agentid=this.model.agentid.split(',').map(el=>{
                        if(el){
                            return Number(el)
                        }
                    })
                    this.model.agentid.shift()
                    this.model.agentid.pop()
                }
                this.visible=true
            }else if(type=='del'){
                this.$confirm('确认删除此数据吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.post(this.queryData.del,{id:data.id}).then(res=>{
                        if(res.code==1){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getTableList()
                        }
                    })
                }).catch((err) => {
                    console.log(err)
                });
            }else if(type=='release'){
                this.$http.post(this.queryData.release,{id:data.id}).then(res=>{
                    if(res.code==1){
                        this.$message({
                            type: 'success',
                            message: '发布成功!'
                        });
                        this.getTableList()
                    }
                })
            }
        },
        handleSizeChange(e){
            this.pager.perpage=e
            this.getTableList()
        },
        handleCurrentChange(e){
            this.pager.page=e
            this.getTableList()
        },
        swithcChange(e,data){
            let d={}
            d.id=data.id
            d.status=data.status?1:0
            this.$http.post(this.queryData.enable,{...d}).then(res=>{
                if(res.code==1){
                    this.$message({
                        message:'操作成功',
                        type:'success'
                    })
                    this.getTableList()
                }
            })
        }
    }
}