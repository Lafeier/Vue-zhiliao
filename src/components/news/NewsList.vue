<template>
  <div>

    <!--使用固定的，假数据的写法-->
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media">
        <router-link to="/home/newsinfo">
          <img class="mui-media-object mui-pull-left" src="../../images/myself.png">
          <div class="mui-media-body">
            <h1>幸福</h1>
            <p class="mui-ellipsis">
                <span>发表时间：2017-08-08 12:30:30</span>
                <span>点击次数：0次</span>
            </p>
          </div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media">
        <a href="javascript:;">
          <img class="mui-media-object mui-pull-left" src="../../images/myself.png">
          <div class="mui-media-body">
            <h1>幸福</h1>
            <p class="mui-ellipsis">
                <span>发表时间：2017-08-08 12:30:30</span>
                <span>点击次数：0次</span>
            </p>
          </div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media">
        <a href="javascript:;">
          <img class="mui-media-object mui-pull-left" src="../../images/myself.png">
          <div class="mui-media-body">
            <h1>幸福</h1>
            <p class="mui-ellipsis">
                <span>发表时间：2017-08-08 12:30:30</span>
                <span>点击次数：0次</span>
            </p>
          </div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media">
        <a href="javascript:;">
          <img class="mui-media-object mui-pull-left" src="../../images/myself.png">
          <div class="mui-media-body">
            <h1>幸福</h1>
            <p class="mui-ellipsis">
                <span>发表时间：2017-08-08 12:30:30</span>
                <span>点击次数：0次</span>
            </p>
          </div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media">
        <a href="javascript:;">
          <img class="mui-media-object mui-pull-left" src="../../images/myself.png">
          <div class="mui-media-body">
            <h1>幸福</h1>
            <p class="mui-ellipsis">
                <span>发表时间：2017-08-08 12:30:30</span>
                <span>点击次数：0次</span>
            </p>
          </div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media">
        <a href="javascript:;">
          <img class="mui-media-object mui-pull-left" src="../../images/myself.png">
          <div class="mui-media-body">
            <h1>幸福</h1>
            <p class="mui-ellipsis">
                <span>发表时间：2017-08-08 12:30:30</span>
                <span>点击次数：0次</span>
            </p>
          </div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media">
        <a href="javascript:;">
          <img class="mui-media-object mui-pull-left" src="../../images/myself.png">
          <div class="mui-media-body">
            <h1>幸福</h1>
            <p class="mui-ellipsis">
                <span>发表时间：2017-08-08 12:30:30</span>
                <span>点击次数：0次</span>
            </p>
          </div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media">
        <a href="javascript:;">
          <img class="mui-media-object mui-pull-left" src="../../images/myself.png">
          <div class="mui-media-body">
            <h1>幸福</h1>
            <p class="mui-ellipsis">
                <span>发表时间：2017-08-08 12:30:30</span>
                <span>点击次数：0次</span>
            </p>
          </div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media">
        <a href="javascript:;">
          <img class="mui-media-object mui-pull-left" src="../../images/myself.png">
          <div class="mui-media-body">
            <h1>幸福</h1>
            <p class="mui-ellipsis">
                <span>发表时间：2017-08-08 12:30:30</span>
                <span>点击次数：0次</span>
            </p>
          </div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media">
        <a href="javascript:;">
          <img class="mui-media-object mui-pull-left" src="../../images/myself.png">
          <div class="mui-media-body">
            <h1>幸福</h1>
            <p class="mui-ellipsis">
                <span>发表时间：2017-08-08 12:30:30</span>
                <span>点击次数：0次</span>
            </p>
          </div>
        </a>
      </li>
    </ul>

    <!--使用真实数据时的写法-->
    <!-- <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
        <router-link :to="'/home/newsinfo' + item.id">
          <img class="mui-media-object mui-pull-left" :src="item.img_url">
          <div class="mui-media-body">
            <h1>{{ item.title }}</h1>
            <p class="mui-ellipsis">
                <span>发表时间：{{ item.add_time | dateFormat }}</span>
                <span>点击次数：{{ item.click }}次</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul> -->

  </div>
</template>

<script>
    import { Toast } from 'mint-ui';

    export default {
        data() {
            return {
                // newslist: []    // 该空数组用来装请求返回来的 新闻列表 的数据
            }
        },
        created(){
            // this.getNewsList(); // 在相应的生命周期来调用getNewsList()方法
        },
        methods: {
            // 请求数据地址已失效，无法实现相关效果
            // 请求真实数据时的写法
            getNewsList(){  // 定义 获取新闻资讯列表 的方法
                // this.$http.get('api/getnewslist').then(result => {
                //     if (result.body.status == 0) {
                //         this.newslist = result.body.message;    // 将返回来的数据装到空数组中
                //     } else {
                //         Toast('获取新闻列表失败');  // 获取数据失败则弹窗提示
                //     }
                // });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .mui-table-view{
        li{
            h1{
                font-size: 14px;
            }

            .mui-ellipsis{
                font-size: 12px;
                color: #226aff;
                display: flex;
                justify-content: space-between;
            }
        }
    }
</style>
