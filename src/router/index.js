import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

const routes= [
   
    {
      path: '/Home',
      name: 'Home',
      meta: { pageTitle: "首页", keepAlive: true},
      component: (resolve) => require(['@/views/Home.vue'], resolve)
    },
    {
        path: '/Login',
        name: 'Login',
        meta: { pageTitle: "登录", keepAlive: true},
        component: (resolve) => require(['@/views/Login.vue'], resolve)
    },
    {
        path: '/BusinessList',
        name: 'BusinessList',
        meta: { pageTitle: "商家列表", keepAlive: true},
        component: (resolve) => require(['@/views/BusinessManage/BusinessList.vue'], resolve)
    },
    {
        path: '/TransactionList',
        name: 'TransactionList',
        meta: { pageTitle: "交易明细列表", keepAlive: true},
        component: (resolve) => require(['@/views/BusinessManage/TransactionList.vue'], resolve)
    },
    {
        path: '/SettlementList',
        name: 'SettlementList',
        meta: { pageTitle: "账户结算列表", keepAlive: true},
        component: (resolve) => require(['@/views/BusinessManage/SettlementList.vue'], resolve)
    },
    {
        path: '/MemberList',
        name: 'MemberList',
        meta: { pageTitle: "商家会员列表", keepAlive: true},
        component: (resolve) => require(['@/views/BusinessManage/MemberList.vue'], resolve)
    },
    {
        path: '/AgentList',
        name: 'AgentList',
        meta: { pageTitle: "代理商列表", keepAlive: true},
        component: (resolve) => require(['@/views/AgentManage/AgentList.vue'], resolve)
    },
    {
        path: '/IncomeList',
        name: 'IncomeList',
        meta: { pageTitle: "跨界收入记录", keepAlive: true},
        component: (resolve) => require(['@/views/AgentManage/IncomeList.vue'], resolve)
    },
    {
        path: '/SettList',
        name: 'SettList',
        meta: { pageTitle: "账户结算列表", keepAlive: true},
        component: (resolve) => require(['@/views/AgentManage/SettList.vue'], resolve)
    },
    {
        path: '/NoticeList',
        name: 'NoticeList',
        meta: { pageTitle: "公告列表", keepAlive: true},
        component: (resolve) => require(['@/views/NoticeManage/NoticeList.vue'], resolve)
    },
    {
        path: '/PartnerList',
        name: 'PartnerList',
        meta: { pageTitle: "城市合伙人", keepAlive: true},
        component: (resolve) => require(['@/views/Partner/List.vue'], resolve)
    },
    {
        path: '/MenuList',
        name: 'MenuList',
        meta: { pageTitle: "菜单管理", keepAlive: true},
        component: (resolve) => require(['@/views/SysManage/MenuList.vue'], resolve)
    },
    {
        path: '/UserList',
        name: 'UserList',
        meta: { pageTitle: "菜单管理", keepAlive: true},
        component: (resolve) => require(['@/views/SysManage/UserList.vue'], resolve)
    },
    {
        path: '/RoleList',
        name: 'RoleList',
        meta: { pageTitle: "菜单管理", keepAlive: true},
        component: (resolve) => require(['@/views/SysManage/RoleList.vue'], resolve)
    },
    {
        path: '/WhiteList',
        name: 'WhiteList',
        meta: { pageTitle: "白名单管理", keepAlive: true},
        component: (resolve) => require(['@/views/SysManage/WhiteList.vue'], resolve)
    },
    { // 匹配
      path: '*',
      name: 'Home',
      meta: { pageTitle: "首页" },
      component: (resolve) => require(['@/views/Home.vue'], resolve)
    }
]
const router = new Router({
  scrollBehavior(to, from, savedPosition) {
      if (to.hash) {
          return {
              selector: to.hash
          }
      } else {
          return { x: 0, y: 0 }
      }

  },
  mode: 'hash',
  routes
});
const VueRouterPush = Router.prototype.push
Router.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

export default router;
