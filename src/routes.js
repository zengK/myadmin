import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Table from './views/nav1/Table.vue'
import bind from './views/nav1/bind.vue'
import user from './views/nav1/user.vue'
import Page4 from './views/nav2/Page4.vue'
import upload from './views/nav2/upload.vue'
import Page6 from './views/nav3/Page6.vue'
import echarts from './views/charts/echarts.vue'
import echartSku from './views/charts/sku.vue'
import pay from './views/nav1/pay.vue'
import tooBuy from './views/charts/tooBuy.vue'
import maplist from './views/charts/maplist.vue'
import payMoney from './views/charts/payMoney.vue'
import analysis from './views/charts/analysis.vue'
import xiaofei from './views/charts/xiaofei.vue'
import RFM from './views/charts/RFM.vue'
let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '菜单',
    //     iconCls: 'el-icon-menu',//图标样式class
    //     children: [
    //         { path: '/main', component: Main, name: '主页', hidden: false },
    //         { path: '/table', component: Table, name: 'Table' },
    //         { path: '/bind', component: bind, name: 'bind', hidden:true },
    //         { path: '/user', component: user, name: '列表' },
    //         { path: '/pay', component: pay, name: 'pay', hidden:true },
            
    //     ]
    // },
    {
        path: '/',
        component: Home,
        name: '导入',
        iconCls: 'el-icon-upload',
        children: [
            // { path: '/page4', component: Page4, name: '页面4' },
            { path: '/upload', component: upload, name: '上传数据' }
        ]
    },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '',
    //     iconCls: 'fa fa-address-card',
    //     leaf: true,//只有一个节点
    //     children: [
    //         { path: '/page6', component: Page6, name: '导航三' }
    //     ]
    // },
    {
        path: '/',
        component: Home,
        name: '数据分析',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/bind', component: bind, name: 'bind', hidden:true },
            { path: '/pay', component: pay, name: 'pay', hidden:true },
            // { path: '/echarts', component: echarts, name: '地域占比' },
            { path: '/sku', component: echartSku, name: 'sku销售占比' },
            // { path: '/tooBuy', component: tooBuy, name: '回购分析' },
            { path: '/maplist', component: maplist, name: '地域占比' },
            { path: '/payMoney', component: payMoney, name: '消费能力分析' },
            { path: '/analysis', component: analysis, name: '回购分析'},
            { path: '/xiaofei', component: xiaofei, name: '消费频次分析'},
            { path: '/RFM', component: RFM, name: 'RFM模型分析'}
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;