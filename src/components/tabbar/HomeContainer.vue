<template>
    <div>
        <!-- 轮播图区域 -->
        <mt-swipe :auto="4000">
            <!-- 在组件中，使用v-for循环的话，一定要使用key -->
            <mt-swipe-item v-for="item in lunbotuList" :key="item.url">
                <img :src="item.img" alt="">
            </mt-swipe-item>
        </mt-swipe>
        <h1>HomeContainer</h1>
    </div>
</template>

<script>
// 导入mint-ui的提示框组件
import { Toast } from 'mint-ui';

export default {
    data(){
        return {
            lunbotuList: [] // 保存轮播图数据
        }
    },
    created() {
        // this.getLunbotu();
    },
    methods: {
        // 请求数据地址已失效，无法实现相关效果
        getLunbotu(){   // 获取首页轮播图数据的方法
            // this.$http.get('http://www.escook.cn:3000/api/getnewslist').then(result => {
            //     // console.log(result.body);
            //     if (result.body.status === 0) {
            //         // 成功了
            //         this.lunbotuList = result.body.message;
            //     } else {
            //         // 失败了
            //         Toast('轮播图加载失败');
            //     }
            // });
        }
    }
}
</script>

<style lang="scss" scoped>
    .mint-swipe{
        height: 200px;

        .mint-swipe-item{
            &:nth-child(1){
                background-color: green;
            }
            &:nth-child(2){
                background-color: yellowgreen;
            }
            &:nth-child(3){
                background-color: skyblue;
            }
        }

        img{
            width: 100%;
            height: 100%;
        }
    }
</style>











