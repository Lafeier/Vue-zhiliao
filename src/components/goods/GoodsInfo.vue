<template>
    <div class="goods-container">

        <!-- 小球 -->
        <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>
        
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
                    <p>购买数量：<numbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox></p>  <!-- 导入计数框子组件 -->
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addToShopCar()">加入购物车</mt-button>
                        <!-- 分析：如何实现点击加入购物车的时候，拿到计数框里的 选择数量 -->
                        <!-- 1.经过分析发现：按钮是属于 goodsinfo 页面的，而数字是属于 numbox 组件的 -->
                        <!-- 2.由于涉及到父子组件嵌套了，所以无法 直接 在goodsinfo页面中获取到 选中的商品的数量值 -->
                        <!-- 3. 怎么解决这个问题：涉及到了子组件向父组件传值了（事件调用机制）-->
                        <!-- 4.事件调用的本质：父向子传递方法，子调用这个方法，同时把数据当做 参数 来传递给方法 -->
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
            lunbotu: [],      // 定义一个空数组，用来装返回来的轮播图数据
            goodsinfo: {},    // 定义一个空对象，用来装返回来的商品参数信息（返回的是一个只包含一个对象的数组）
            ballFlag: false,  // 用来控制小球隐藏与显示的标识符
            selectedCount: 1  // 定义一个变量，用来保存用户选择商品的数量，默认为1件
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
        },
        addToShopCar(){ // 定义添加到购物车函数
            // 改变小球的Flag值
            this.ballFlag = !this.ballFlag;
        },
        beforeEnter(el){
            el.style.transform = 'translate(0, 0)';     // translate(0,0)表示一开始时的位置
        },
        enter(el, done){
            el.offsetWidth;


            // 小球动画优化思路：
            // 1.先分析导致小球动画不准确的原因：我们把小球位移到的最终位置，已经局限在了某一分辨率下的，滚动条未滚动的情况下
            // 2.只要分辨率和测试的时候不一样，或者滚动条有一定的滚动距离后，问题就出现了
            // 3.因此，经过我们的分析，得到结论：不能把横坐标和纵坐标的位置直接写死，而是根据不同的情况来动态的计算这两个坐标值
            // 4.经过分析，得出解题思路：先得到 徽标 的横纵坐标，再得到 小球 的横纵坐标，然后对 y值 求差，对 x值 求差，得到结果，就是横纵坐标要位移的距离
            // 5.如何获得 徽标 和 小球 的位置？？？ domObject.getBoundingClientRect()

            // 获取小球在页面中的位置：
            const ballPosition = this.$refs.ball.getBoundingClientRect();
            // 获取徽标在页面中的位置（这里稍稍操作了一下Dom，因为这里确实用操作Dom的方法方便一点）
            const badgePosition = document.getElementById('badge').getBoundingClientRect();

            // 得到两者的横纵坐标的差值
            const xDist = badgePosition.left - ballPosition.left;
            const yDist = badgePosition.top - ballPosition.top;



            el.style.transform = `translate(${xDist}px, ${yDist}px)`;
            el.style.transition = 'all 0.5s ease';
            done();       // done()是afterEnter()的引用
        },
        afterEnter(el){
            this.ballFlag = !this.ballFlag;
        },
        getSelectedCount(count){    // 定义获取numbox中数量的方法，并由子组件调用
            // 子组件在调用这个方法时，将数据当做参数传递给父组件里data中的selectedCount
            this.selectedCount = count;
            // console.log(this.selectedCount);    // 打印出从子组件中传递过来的数量值     
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

        .ball{
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background-color: red;
            position: absolute;
            z-index: 99;
            top: 390px;
            left: 146px;
            // transform: translate(93px, 230px);
        }
    }
</style>

