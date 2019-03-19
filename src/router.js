import VueRouter from 'vue-router';



// 3.创建路由对象
var router = new VueRouter({
    routes: [
    ],
    linkActiveClass: 'mui-active'   // 覆盖默认的路由高亮类，默认的类名叫router-link-active
});


// 把路由对象暴露出去
export default router;



