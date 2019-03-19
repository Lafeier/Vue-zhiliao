// 项目入口文件
import Vue from 'vue';
// 1.1 导入路由的包
import VueRouter from 'vue-router';
// 1.2 安装路由
Vue.use(VueRouter);


// 导入MUI的样式
import './lib/mui/css/mui.min.css';
// 导入MUI扩展图标的样式
import './lib/mui/css/icons-extra.css';

// 按需导入 Mint-UI 的组件
import { Header } from 'mint-ui';
Vue.component(Header.name, Header);


// 1.3 导入自己的router.js路由模块
import router from './router.js';


// 导入 App根组件
import app from './App.vue';

var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router  // 1.4 挂载路由到 vm 实例上
});


















