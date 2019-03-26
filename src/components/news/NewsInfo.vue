<template>
    <div class="newsinfo-container">
        <!-- 大标题 -->
        <h3 class="title">{{ newsinfo.title }}</h3>
        <!-- 子标题 -->
        <p class="subtitle">
            <span>发表时间：{{ newsinfo.add_time | dateFormat }}</span>
            <span>点击次数：{{ newsinfo.click }}次</span>
        </p>

        <hr>

        <!-- 新闻详情内容区域 -->
        <div class="content" v-html="newsinfo.content"></div>

        <!-- 评论子组件区域 -->
        <comment-box :id="this.id"></comment-box>   <!--这里父组件传值给子组件-->
    </div>
</template>

<script>
// 1.导入 comment 评论子组件
import comment from '../subcomponents/comment.vue';

export default {
    data(){
        return {
            id: this.$route.params.id,   // 将URL地址中传过来的id值，挂载到data上，方便以后调用
            newsinfo: {}    //定义一个空对象，用来装返回的新闻详情数据
        };
    },
    create(){
        this.getNewsInfo(); // 页面创建好后就调用获取新闻详情数据的方法
    },
    methods: {
        getNewsInfo(){  // 定义获取新闻详情数据的方法
            this.$http.get('api/getnew/' + this.id).then(result => {
                if (result.body.status == 0) {
                    this.newsinfo = result.body.message[0]; // message是一个数组，里面每一项是一个对象
                } else {
                    Toast('获取新闻信息失败');
                }
            });
        }
    },
    components: {
        // 用来注册子组件的节点
        'comment-box': comment
    }
}
</script>

<!--这里要把scoped去掉，图片的宽度设置才有效，这里去掉不会影响全局的样式-->
<!--因为这里我们一开始就用唯一的一个类名newsinfo-container来包裹样式了，其他地方没有这个类-->
<!--至于这里为什么去掉scoped后，img设置宽度才生效，原理比较复杂，这里不详解-->
<style lang="scss">
    .newsinfo-container{
        padding: 0 10px;

        .title{
            font-size: 16px;
            text-align: center;
            margin: 15px 0;
            color: red;
        }
        .subtitle{
            font-size: 13px;
            color: #226aff;
            display: flex;
            justify-content: space-between;
        }
        .content{
            img{    // 为了使详情页中出现的图片能够完整显示，设置宽度为100%
                width: 100%;    // 除了这里设置外，还要把上面的style标签里的scoped去掉
            }
        }
    }
</style>

