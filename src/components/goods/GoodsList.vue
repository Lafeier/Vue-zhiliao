<template>
    <div class="goods-list">

        <!-- 使用静态数据的写法 -->
        <!-- <div class="goods-item">
            <img src="../../images/huawei.png" alt="">
            <h1 class="title">华为mete30（全网通）128G版</h1>
            <div class="info">
                <p class="price">
                    <span class="now">¥4599</span>
                    <span class="old">¥4299</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩60件</span>
                </p>
            </div>
        </div>
        <div class="goods-item">
            <img src="../../images/mi.png" alt="">
            <h1 class="title">小米8 旗舰版（全网通）128G版4摄像头滑盖陶瓷机身 全球首款SB滑盖机</h1>
            <div class="info">
                <p class="price">
                    <span class="now">¥1999</span>
                    <span class="old">¥3999</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩5000件</span>
                </p>
            </div>
        </div>
        <div class="goods-item">
            <img src="../../images/huawei.png" alt="">
            <h1 class="title">华为mete30（全网通）128G版</h1>
            <div class="info">
                <p class="price">
                    <span class="now">¥4599</span>
                    <span class="old">¥4299</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩60件</span>
                </p>
            </div>
        </div> -->

        <!-- 使用真实数据的写法 -->
        <!-- <router-link class="goods-item" v-for="item in goodslist" :key="item.id" :to="'/home/goodsinfo/' + item.id" tag="div">
            <img :src="item.img_url" alt="">
            <h1 class="title">{{ item.title }}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">¥{{ item.sell_price }}</span>
                    <span class="old">¥{{ item.market_price }}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{ item.stock_quantity }}件</span>
                </p>
            </div>
        </router-link> -->

        <!-- 在网页中，有两种跳转方式 -->
        <!-- 方式1：使用 a 标签的形式叫做 标签跳转 -->
        <!-- 方式2：使用 window.location.href 的形式，叫 编程式导航 -->
        <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="goDetail(item.id)">
            <img :src="item.img_url" alt="">
            <h1 class="title">{{ item.title }}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">¥{{ item.sell_price }}</span>
                    <span class="old">¥{{ item.market_price }}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{ item.stock_quantity }}件</span>
                </p>
            </div>
        </div>

        <!-- 加载更多按钮 -->
        <!-- 这里的按钮绑定了一个点击事件，以实现编程式导航 -->
        <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>

    </div>
</template>

<script>
export default {
    data(){
        // data是往自己组件内部挂载一些私有数据的
        return {
            pageIndex: 1,    // 分页的页数，默认显示第1页
            goodslist: []    // 定义一个空数组，用来存放返回的商品列表的数据
        }
    },
    created(){
        this.getGoodsList();
    },
    methods: {
        getGoodsList(){     // 定义用来获取商品列表数据的方法
            // 1.获取商品列表的数据
            this.$http.get('api/getgoods?pageindex=' + this.pageIndex).then(result => {
                if (result.body.status === 0) {
                    // this.goodslist = result.body.message;
                    // 因为有加载更多按钮，所以点击加载更多按钮时应该将每次返回的数据拼接上之前的数据，再赋值会给goodslist
                    this.goodslist = this.goodslist.concat(result.body.message);
                }
            });
        },
        getMore(){  // 定义加载更多按钮的事件处理函数
            this.pageIndex++;   // 页码值加1
            this.getGoodsList();    // 获取最新页码对应的商品列表页数据
        },
        goDetail(id){
            // 通过JS方式来实现导航跳转
            // 注意：一定要区分 this.$route 和 this.$router 这两个对象
            // 其中：this.$route 是一个[路由参数对象]，所有路由中的参数，params，query 都属于它
            // 其中：this.$router 是一个[路由导航对象]，用它可以方便的使用JS代码，实现路由的 前进、后退、跳转到新的URL地址
            
            // console.log(this);  // 这里的this表示Vue实例
            // 1.传递字符串，最简单方式
            // this.$router.push('/home/goodsinfo/' + id);
            // 2.传递一个对象
            // this.$router.push({ path: '/home/goodsinfo/' + id });
            // 3.传递命名的路由
            this.$router.push({ name: 'goodsinfo', params: { id: id } });
        }
    }
}
</script>

<style lang="scss" scoped>
    .goods-list{
        display: flex;
        flex-wrap: wrap;
        padding: 7px;
        justify-content: space-between;

        .goods-item{
            width: 49%;
            border: 1px solid #ccc;
            box-shadow: 0 0 8px #ccc;
            margin: 4px 0;
            padding: 2px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 293px;

            img{
                width: 100%;
            }

            .title{
                font-size: 14px;
            }

            .info{
                background-color: #eee;
                p{
                    margin: 0;
                    padding: 3px;
                }
                .price{
                    .now{
                        color: red;
                        font-weight: bold;
                        font-size: 16px;
                    }
                    .old{
                        text-decoration: line-through;
                        font-size: 12px;
                        margin-left: 10px;
                    }
                }
                .sell{
                    display: flex;
                    justify-content: space-between;
                    font-size: 13px;
                }
            }
        }
    }
</style>
