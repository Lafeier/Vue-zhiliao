<template>
  <div>

    <!-- 轮播图区域 不用真实数据时的版本 -->
    <mt-swipe :auto="4000">
        <mt-swipe-item>1</mt-swipe-item>
        <mt-swipe-item>2</mt-swipe-item>
        <mt-swipe-item>3</mt-swipe-item>
    </mt-swipe>
    <!-- 轮播图区域 使用请求真实数据时的版本 -->
    <!-- <mt-swipe :auto="4000">  -->
      <!-- 在组件中，使用v-for循环的话，一定要使用key -->
      <!-- <mt-swipe-item v-for="item in lunbotuList" :key="item.url"> -->
        <!-- <img :src="item.img" alt> -->
      <!-- </mt-swipe-item> -->
    <!-- </mt-swipe> -->
    

    <!-- 九宫格到六宫格的改造工程 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newsList">
          <img src="../../images/menu1.png" alt="">
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/photolist">
          <img src="../../images/menu2.png" alt="">
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu3.png" alt="">
          <div class="mui-media-body">商品购买</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu4.png" alt="">
          <div class="mui-media-body">留言反馈</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu5.png" alt="">
          <div class="mui-media-body">视频专区</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu6.png" alt="">
          <div class="mui-media-body">联系我们</div>
        </a>
      </li>
    </ul>

  </div>
</template>


<script>
// 导入mint-ui的提示框组件
import { Toast } from "mint-ui";

export default {
  data() {
    return {
    // lunbotuList: [] // 保存轮播图数据
    };
  },
  created() {
    // this.getLunbotu();
  },
  methods: {
    // 请求数据地址已失效，无法实现相关效果
    getLunbotu() {
      // 获取首页轮播图数据的方法
      // 这里如果使用了 Vue.http.options.root = 'root' 来配置请求根路径，那么下面可以只写 api/getnewslist
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
};
</script>


<style lang="scss" scoped>
// 轮播图样式
.mint-swipe {
  height: 200px;

  .mint-swipe-item {
    &:nth-child(1) {
      background-color: green;
    }
    &:nth-child(2) {
      background-color: yellowgreen;
    }
    &:nth-child(3) {
      background-color: skyblue;
    }
  }

  img {
    width: 100%;
    height: 100%;
  }
}

// 六宫格样式
.mui-grid-view.mui-grid-9{
  background-color: #fff;
  border: none;

  img{
    width: 60px;
    height: 60px;
  }

  .mui-media-body{
    font-size: 13px;
  }
}

.mui-grid-view.mui-grid-9 .mui-table-view-cell{
  border: none;
}
</style>











