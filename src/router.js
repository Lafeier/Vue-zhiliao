import VueRouter from 'vue-router';


// 导入首页tabbar中对应的路由组件
import HomeContainer from './components/tabbar/HomeContainer.vue';
import MemberContainer from './components/tabbar/MemberContainer.vue';
import ShopCarContainer from './components/tabbar/ShopCarContainer.vue';
import SearchContainer from './components/tabbar/SearchContainer.vue';

import NewsList from './components/news/NewsList.vue';
import NewsInfo from './components/news/NewsInfo.vue';


// 3.创建路由对象
var router = new VueRouter({
    routes: [   // 配置路由规则
        { path: '/', redirect: '/home' },
        { path: '/home', component: HomeContainer },
        { path: '/member', component: MemberContainer },
        { path: '/shopcar', component: ShopCarContainer },
        { path: '/search', component: SearchContainer },
        { path: '/home/newsList', component: NewsList },
        // { path: '/home/newsinfo/:id', component: NewsInfo },
        { path: '/home/newsinfo', component: NewsInfo }
    ],
    linkActiveClass: 'mui-active'   // 覆盖默认的路由高亮类，默认的类名叫router-link-active
});


// 把路由对象暴露出去
export default router;



