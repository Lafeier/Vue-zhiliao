// 项目入口文件
import Vue from 'vue';
// 1.1 导入路由的包
import VueRouter from 'vue-router';
// 1.2 安装路由
Vue.use(VueRouter);


// 导入vuex并注册
import Vuex from 'vuex';
Vue.use(Vuex);

// 每次刚进入网站时，肯定会调用 main.js 在刚调用的时候，先从本地存储中，把购物车的数据读取出来，放到store中
// 每次进入网站后，一开始就从储存中读取购物车里商品的数据
var car = JSON.parse(localStorage.getItem('car') || '[]');  // 注意储存的信息是字符串形式的，所以还需要转一下

var store = new Vuex.Store({    // 实例化一个数据仓储对象
    state: {    // this.$store.state.xxx
        // 将购物车中的商品数据，用一个数组储存起来，在 car 数组中，储存一些商品的对象，我们可以暂时将这个对象设计成这个样子
        // { id:商品的id, count:商品的数量, price:商品的单价, selected:true }
        car: []
    },
    mutations: {    // this.$store.commit('方法的名称', '按需传递唯一的参数')
        addToCar(state, goodsinfo){
            // 点击加入购物车按钮，就把商品信息，保存到 store 中的 state 里的 car 上
            // 分析：
            // 1.如果购物车中，之前就已经有这个对应的商品了，那么只需要更新数量即可
            // 2.如果没有，则直接把 商品数据，push 到 car 中即可

            // 假设 在购物车中，没有找到对应的商品
            var flag = false;

            state.car.some(item => {
                if (item.id == goodsinfo.id) {
                    item.count += parseInt(goodsinfo.count);    // 从客户端传过来的goodsinfo可能是一个字符串，所以要取整一下
                    flag = true;    // 如果购物车有该件商品了，把 flag 设置为 true
                    return true;
                }
            });

            if (!flag) {    // 如果经过上面的循环，flag还是false，说明购物车没有这件商品
                state.car.push(goodsinfo);  // 这时就可以把传递过来的 商品信息对象 直接添加到数组中
            }

            // 当更新 car 之后，把 car 数组，储存到本地的 localStorage 中
            localStorage.setItem('car', JSON.stringify(state.car));
        },
        updateGoodsInfo(state, goodsinfo){
            // 修改购物车中商品的数量
            // 分析：
            state.car.some(item => {
                if (item.id == goodsinfo.id) {
                    item.count == parseInt(goodsinfo.count);
                }
                return true;
            });

            // 当修改完商品的数量，把最新的购物车数据，保存到本地存储中
            localStorage.setItem('car', JSON.stringify(state.car));
        },
        removeFormCar(state, id){
            // 根据id，从store中的购物车中删除对应的那条商品数据
            state.car.some((item, i) => {
                if (item.id == id) {
                    state.car.splice(i, 1);
                    return true;
                }
            });

            // 将删除完毕后的，最新购物车数据，同步到到本地存储中
            localStorage.setItem('car', JSON.stringify(state.car));
        },
        updateGoodsSelected(state, info){
            state.car.some(item => {
                if (item.id == info.id) {
                    item.selected = info.selected;
                }
            });

            // 把购物车中所有商品的最新状态保存 store 中
            localStorage.setItem('car', JSON.stringify(state.car));
        }
    },
    getters: {  // this.$store.getters.xxx
        // getters相当于 计算属性，也相当于 filters
        getAllCount(state){   // 定义一个函数用来显示购物车中商品的数量
            var c = 0;
            state.car.forEach(item => {
                c += item.count;
            });
            return c;
        },
        getGoodsCount(state){   // 定义一个函数用来循环购物车中所有商品数据，从里面找出id和count值组成一个对象
            var o = {};
            state.car.forEach(item =>{
                o[item.id] = item.count
            });
            return o;
        },
        getGoodsSelected(state){   // 定义一个函数用来获取购物车中每件商品对应的开关状态
            var o ={};
            state.car.forEach(item => {
                o[item.id] = item.selected;
            });
            return o;
        },
        getGoodsCountAndAmount(state){  // 定义一个函数用来显示被勾选的商品数量和计算总价
            var o = {
                count: 0,    // 勾选的数量
                amount: 0   // 勾选的总价
            }
            state.car.forEach(item => {
                if (item.selected) {
                    o.count += 1;
                    o.amount += item.price * item.count;
                }
            });
            return o;
        }
    }
});


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
    router,  // 1.4 挂载路由到 vm 实例上
    store   // 将store挂载到 vm 实例上
});


















