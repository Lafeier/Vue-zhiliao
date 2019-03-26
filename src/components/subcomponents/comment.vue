<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入你要BB的内容（吐槽最多只能120字）" maxlength="120"></textarea>

        <!-- 使用mint-ui的button组件 -->
        <mt-button type="primary" size="large">发表评论</mt-button>

        <!-- 评论内容列表 -->
        <div class="cmt-list">
            <!-- 评论内容的每一项 -->
            <div class="cmt-item" v-for="(item, i) in comments" :key="item.add_time">
                <div class="cmt-title">
                    第{{ i+1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp;发表时间：{{ item.add_time }}
                </div>
                <div class="cmt-body">
                    {{ item.content }}
                    <!-- 为了避免没发表评论的用户内容显示undefined，可以使用下面的方法 -->
                    <!-- {{ item.content === "undefined" ? "此用户很懒，什么都没说" : item.content }} -->
                </div>
            </div>
        </div>

        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
// 导入mint-ui的提示框
import { Toast } from 'mint-ui';

export default {
    data(){
        return {
            pageIndex: 1,    // 默认显示第一页数据
            comments: []    //定义一个空数组用来装评论数据
        }
    },
    create(){
        this.getComments();
    },
    methods: {
        getComments(){  // 获取评论数据的方法
            // 因为评论子组件获取评论时，需要父组件的id值，所以应该将父组件的id值传过来
            this.$http.get('api/getcomments/' + this.id + '?pageindex=' + this.pageIndex).then(result => {
                if (result.body.status === 0) {
                    // 这样写会在再次请求数据后，将后来的数据覆盖掉前面的数据了
                    // this.comments = result.body.message;
                    // 每当获取新评论数据的时候，不能把原来的数据覆盖掉，而是应该将老数据拼接上新数据
                    this.comments = this.comments.concat(result.body.message);  // 用此写法
                } else {
                    Toast('获取数据失败');
                }
            });
        },
        getMore(){  // 加载更多数据的方法
            this.pageIndex++;   // 让页码加1
            this.getComments(); // 然后重新执行获取评论数据的方法来获取更多评论数据
        }
    },
    props: ['id']
};
</script>

<style lang="scss" scoped>
    .cmt-container{
        h3{
            font-size: 18px;
        }

        textarea{
            font-size: 13px;
            height: 85px;
            margin: 0;
        }

        .cmt-list{
            margin: 5px 0;

            .cmt-item{
                font-size:13px;

                .cmt-title{
                    background-color: #ccc;
                    line-height: 30px;
                }

                .cmt-body{
                    line-height: 30px;
                    text-indent: 2em;
                }
            }
        }

    }
</style>

