// 项目入口文件
import Vue from 'vue';
// 1.1 导入路由的包
import VueRouter from 'vue-router';
// 1.2 安装路由
Vue.use(VueRouter);


// 导入格式化时间的插件
import moment from 'moment';
// 定义全局过滤器
Vue.filter('dateFormat', function(dataStr, pattern = 'YYYY-MM-DD HH:MM:SS'){
    return moment(dataStr).format(pattern);
});


// 2.1 导入vue-resource
import VueResource from 'vue-resource';
// 2.2 安装vue-resource
Vue.use(VueResource);

// 设置请求的根路径（因为依赖于vue-resource，所以一定要放在引入vue-resource的后面）
// 这里设置了根路径后，在其他组件中来请求数据时，就只需要写后面的api路径即可，防止如果域名如果有变动则要全改请求地址
// 请求真实数据时的写法
// Vue.http.options.root = 'http://www.escook.cn:3000';

// 全局设置post的时候表单中数据格式的组织形式 application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true;





// 导入MUI的样式
import './lib/mui/css/mui.min.css';
// 导入MUI扩展图标的样式
import './lib/mui/css/icons-extra.css';

// 按需导入 Mint-UI 的组件
// import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui';
// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload);
import MintUI from 'mint-ui';
Vue.use(MintUI);
import 'mint-ui/lib/style.css';

// 导入并安装图片详情页的缩略图组件
import VuePreview from 'vue-preview';
Vue.use(VuePreview);


// 1.3 导入自己的router.js路由模块
import router from './router.js';


// 导入 App根组件
import app from './App.vue';

var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router  // 1.4 挂载路由到 vm 实例上
});


















