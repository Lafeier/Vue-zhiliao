<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入你要BB的内容（吐槽最多只能120字）" maxlength="120" v-model="msg"></textarea>

        <!-- 使用mint-ui的button组件 -->
        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>

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
            comments: [],    // 定义一个空数组用来装评论数据
            msg: ''          // 定义一个空字符串用来装评论输入的内容
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
        },
        postComment(){  // 提交评论内容的方法
            // 校验内容是否为空
            if (this.msg.trim().length === 0) { // 如果为空
                return Toast('评论内容不能为空!');    // 弹窗提示，并且用return来阻止代码继续往后执行
            }

            // 提交评论
            // 参数1：提交的URL地址
            // 参数2：提交给服务器的数据对象 { content: this.msg }
            // 参数3：定义提交的时候，表单中数据的格式 { emulateJSON: true }
            this.$http.post('api/postcomment/' + this.$route.params.id, { content: this.msg.trim() } ).then(result => {
                if (result.body.status === 0) {
                    // 拼接出一个评论对象
                    var cmt = { 
                        user_name: '匿名用户', 
                        add_time: Date.now(), 
                        content:this.msg.trim() 
                    };
                    // 将评论对象追加到comments数组中
                    this.comments = cmt;
                    // 将文本域内容清空
                    this.msg = '';  
                } else {

                }
            });
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

