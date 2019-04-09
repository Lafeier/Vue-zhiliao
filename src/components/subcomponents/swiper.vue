<template>
    <div>
        <mt-swipe :auto="4000"> 
            <!-- 在组件中，使用v-for循环的话，一定要使用key -->
            <!-- 将来，谁使用此 轮播图组件，谁就为我们传递 lunbotuList -->
            <!-- 此时，lunbotuList应该是 父组件向子组件传值来设置 -->
            <mt-swipe-item v-for="item in lunbotuList" :key="item.url">
                <img :src="item.img" :class="{'full': isfull}">
            </mt-swipe-item>
        </mt-swipe>
    </div>

    <!-- 分析：为什么 商品评论 中的轮播图那么丑 -->
    <!-- 1.首页中的轮播图，它的宽和高，都是使用了100%的宽度 -->
    <!-- 2.商品详情页中，轮播图的图片，如果也是使用 宽高为100% 的话， 页面不好看-->
    <!-- 3.商品详情页中的轮播图，我们期望应该 高度100%，宽度自适应 -->
    <!-- 4.经过分析，得到问题的原因：首页中的轮播图 和 详情页中的轮播图，分歧点是 宽度到底是100%，还是 自适应 -->
    <!-- 5.既然这两个 轮播图，其他方面都没有冲突，只是宽度有分歧，那么我们可以定义一个属性，让使用轮播图的调用者，来手动指定 是否是100%的宽度 -->


</template>

<script>
export default {
    props: ['lunbotuList', 'isfull']
}
</script>

<style lang="scss" scoped>
// 轮播图样式
.mint-swipe {
  height: 200px;

  .mint-swipe-item {
    text-align: center; // 使轮播图的图片居中

    // &:nth-child(1) {
    //   background-color: green;
    // }
    // &:nth-child(2) {
    //   background-color: yellowgreen;
    // }
    // &:nth-child(3) {
    //   background-color: skyblue;
    // }
  }

  img {
    // width: 100%;
    height: 100%;
  }

  .full{
      width: 100%;
  }
}
</style>

