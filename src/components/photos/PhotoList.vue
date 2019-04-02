<template>
  <div>

    <!-- 顶部滑动条区域 静态时写法 -->
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
        <div class="mui-scroll">
          <a
            class="mui-control-item mui-active"
            href="#item1mobile"
            data-wid="tab-top-subpage-1.html"
          >推荐</a>
          <a class="mui-control-item" href="#item2mobile" data-wid="tab-top-subpage-2.html">热点</a>
          <a class="mui-control-item" href="#item3mobile" data-wid="tab-top-subpage-3.html">北京</a>
          <a class="mui-control-item" href="#item4mobile" data-wid="tab-top-subpage-4.html">社会</a>
          <a class="mui-control-item" href="#item5mobile" data-wid="tab-top-subpage-5.html">娱乐</a>
          <a class="mui-control-item" href="#item6mobile" data-wid="tab-top-subpage-6.html">科技</a>
        </div>
      </div>
    </div>

    <!-- 顶部滑动条区域 使用真实数据时的写法-->
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
        <div class="mui-scroll">
          <a :class="['mui-control-item', item.id == 0 ? 'mui-active' : '']" v-for="item in cates" :key="item.id" @tap="getPhotoListByCateId(item.id)">
            {{ item.id }}
          </a>
        </div>
      </div>
    </div>

    <!-- 图片列表区域 -->
    <ul class="photo-list">
      <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/' + item.id" tag="li">
        <img v-lazy="item.img_url">
        <div class="info">
          <h1 class="info-title">{{ item.title }}</h1>
          <div class="info-body">{{ item.zhaiyao }}</div>
        </div>
      </router-link>
    </ul>

  </div>
</template>

<script>
// 1.导入mui的js文件
import mui from '../../lib/mui/js/mui.min.js';


export default {
  data(){
    return {
      cates: [], // 定义一个数组，用来装所有分类的列表数据
      list: []  // 定义一个数组，用来装图片列表的数据
    }
  },
  created(){
    this.getAllCategory();
    this.getPhotoListByCateId(0); // 默认一进入页面，主动调用一次来获取图片列表，并且默认是第一项
  },
  mounted(){  // 当组件中的DOM结构被渲染好并放到页面中后，会执行这个钩子函数
    // 如果要操作元素了，最好是在 mouted 里面，因为这个时候 DOM元素 是最新的
    // 2.初始化控件
    mui('.mui-scroll-wrapper').scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {
    getAllCategory(){ 
      // 获取所有的图片分类
      this.$http.get('api/getimgcategory').then(result => {
        if (result.body.status === 0) {
          // 手动拼接出一个最完整的 分类列表
          result.body.message.unshift({ title: '全部', id: 0 });
          this.cates = result.body.message;
        }
      });
    },
    getPhotoListByCateId(cateId){
      // 根据分类id获取图片列表数据
      this.$http.get('api/getimages/' + cateId).then(result => {
        if (result.body.status === 0) {
          this.list = result.body.message;
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
  *{
    touch-action: pan-y;  // 看笔记记录理解该样式
  }

  .photo-list{
    list-style: noen;
    margin: 0;
    padding: 10px;
    padding-bottom: 0;

    li{
      background-color: #ccc;
      text-align: center;
      margin-bottom: 10px;
      box-shadow: 0 0 9px #999;
      position: relative; // 为了下面信息能够覆盖图片底部

      img{  // 从服务器加载过来的真实图片
        width: 100%;
        vertical-align: middle;
      }
      img[lazy="loading"] { // 懒加载里写死的图片
        width: 40px;
        height: 300px;
        margin: auto;
      }

      .info{
        color: white;
        text-align: left;
        position: absolute; // 将信息层覆盖图片底部
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.4);
        max-height: 84px;
        .info-title{
          font-size: 14px;
        }
        .info-body{
          font-size: 13px;
        }
      }
    }
  }
</style>

