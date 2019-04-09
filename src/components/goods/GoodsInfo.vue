<template>
    <div class="goods-container">
        
        <!-- 商品轮播图区域 -->
        <div class="mui-card">
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<swiper :lunbotuList="lunbotu" :isfull="false"></swiper>
				</div>
			</div>
		</div>

        <!-- 商品购买区域 -->
        <div class="mui-card">
			<div class="mui-card-header">{{ goodsinfo.title }}</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<p class="price">
                        市场价：<del>¥{{ goodsinfo.market_price }}</del>&nbsp;&nbsp;销售价：<span class="now-price">¥{{ goodsinfo.sell_price }}</span>
                    </p>
                    <p>购买数量：<numbox></numbox></p>  <!-- 导入计数框子组件 -->
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small">加入购物车</mt-button>
                    </p>
				</div>
			</div>
		</div>

        <!-- 商品参数区域 -->
        <div class="mui-card">
			<div class="mui-card-header">商品参数</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<p>商品货号：{{ goodsinfo.goods_no }}</p>
                    <p>库存情况：{{ goodsinfo.stock_quantity }}件</p>
                    <p>上架时间：{{ goodsinfo.add_time | dateFormat }}</p>
				</div>
			</div>
			<div class="mui-card-footer">
                <mt-button type="primary" size="large" @click="goDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" @click="goComment(id)">商品评论</mt-button>
            </div>
		</div>

    </div>
</template>

<script>
// 导入轮播图子组件
import swiper from '../subcomponents/swiper.vue';
// 导入数字选择框组件
import numbox from '../subcomponents/goodsinfo_numbox.vue';

export default {
    data(){
        return {
            id: this.$route.params.id,   // 将路由参数对象中的 id 挂载到 data 上，方便后期调用
            lunbotu: [],     // 定义一个空数组，用来装返回来的轮播图数据
            goodsinfo: {}   // 定义一个空对象，用来装返回来的商品参数信息（返回的是一个只包含一个对象的数组）
        }
    },
    created(){
        this.getLunbotu();
        this.goodsinfo();
    },
    methods: {
        getLunbotu(){   // 定义获取轮播图数据的函数
            this.$http.get('api/getthumimages/' + this.id).then(result => {
                if (result.body.status === 0) {
                    // 先循环轮播图的每一项，为 item 添加 img 属性，因为 轮播图 组件中，只认识 item.img，不认识 imte.src
                    result.body.message.forEach(item => {
                        item.img = item.src;
                    });
                    this.lunbotu = result.body.message;
                }
            });
        },
        getGoodsInfo(){ // 定义获取商品参数区的价格、标题的函数
            // 获取商品信息
            this.$http.get('api/goods/getinfo/' + this.id).then(result => {
                if (result.body.status === 0) {
                    this.goodsinfo = result.body.message[0];    // 将返回的数组中索引值为0，也就是唯一的一个对象赋值给goodsinfo空对象
                }
            });
        },
        goDesc(id){
            // 点击使用编程式导航跳转到 图文介绍 页面
            this.$router.push({ name: 'goodsdesc', params: { id } });
        },
        goComment(id){
            // 点击使用编程是导航跳转到 商品评论 页面
            this.$router.push({ name: 'goodscomment', params: { id } });
        }
    },
    components: {
        // 注册轮播图子组件
        swiper,
        numbox
    }
}
</script>

<style lang="scss" scoped>
    .goods-container{
        background-color: #ccc;
        overflow: hidden;

        .now-price{
            color: red;
            font-size: 16px;
            font-weight: bold;
        }

        .mui-card-footer{
            display: block;
            button{
                margin: 15px 0;
            }
        }
    }
</style>

