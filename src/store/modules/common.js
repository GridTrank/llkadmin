//初始化数据
const state = {
    userInfo:{},
    menusList:[],
}

//mutation
const mutations = {
  updateUserInfo(state,data){
      state.userInfo=data
      localStorage.setItem('userInfo', JSON.stringify(data) )
  },
  updateMenusList(state,data){
      state.menusList=data
      localStorage.setItem('menusList',JSON.stringify(data))
  }
}
//action 异步的操作
const actions = {
  
}


export default {
    state,
    mutations,
    actions,
};