# 这是一个NB的学习课程项目


## 这个项目使用Vue来完成

### 不知道这个项目行不行，先开撸再说...

#### 项目的代码要用心去写，让别的程序猿蛋疼去...

#### 已经把项目代码上传到github了


## 制作首页App组件
1. 完成 Header 区域，使用的是 Mint-UI 中的Header组件
2. 制作底部的 Tabbar 区域，使用的是 MUI 中的Tabber.html
    + 在制作 购物车 小图标的时候，操作会相对多一些
    + 先把扩展图标的CSS样式，拷贝到项目css文件夹中
    + 拷贝扩展字体库 ttf文件 到项目fonts文件夹中
    + 为 购物车 小图标，添加如下样式类：mui-icon mui-icon-extra mui-icon-extra-cart
3. 要在中间区域放一个 router-view 组件，来展示路由匹配到的组件


## 改造 tabbar 为 router-link

## 设置路由高亮

## 点击 tabbar 中的路由链接，展示相对应的路由组件

## 制作首页轮播图样式布局

## 加载首页轮播图的数据
1. 获取数据 怎样获取？使用 vue-resource
2. 使用vue-resource的 this.$http.get 获取数据
3. 将获取到的数据保存到 data 上
4. 使用 v-for 循环渲染每个 item 项

## 改造 九宫格区域 的样式

## 改造 新闻资讯 路由链接

## 新闻资讯页面的制作
1. 绘制界面, 使用MUI中的 media-list.html
2. 使用 vue-resource 获取数据
3. 渲染真实数据

## 实现点击 新闻资讯列表 跳转到 新闻详情
1. 把列表中的每一项改造为 router-link，同时在跳转的时候要提供唯一的标识符
2. 创建新闻详情的组件页面 NewsInfo.vue
3. 在路由模块中，将 新闻详情 的路由和 组件页面 对应起来

## 实现 新闻详情 的 页面布局 和 数据渲染

## 单独封装一个 comment.vue 评论子组件
1. 先创建一个 单独的comment.vue 组件模板
2. 在需要使用 comment组件 的页面中，先手动导入comment.vue组件
    + `import comment from './comment.vue'`
3. 在父组件中，使用components属性，将刚才导入的 comment组件 注册为自己的子组件
4. 将注册子组件时候的注册名称，以 标签形式 来在页面中引入即可

## 获取所有的评论数据显示到页面中
1. getComments

## 实现点击加载更多评论的功能
1. 为加载更多按钮，绑定点击事件，在事件中，请求下一页数据
2. 点击加载更多时，让pageIndex++，然后重新调用一下 getComments() 方法重新获取最新一页的数据
3. 为了防止新数据覆盖老数据的情况，我们在 点击加载更多 的时候，每当获取到新数据，应该让 老数据 调用数组的 concat() 方法，拼接上新数组

## 发表评论
1. 对文本域进行双向数据绑定
2. 给 发表评论 按钮绑定事件
3. 校验评论内容是否为空，如果为空，则Toast用户，提示内容不能为空
4. 通过 vue-resource 发生一个请求，把评论的内容提交给服务器
5. 当评论发表OK后，重新刷新列表，以查看最新评论
    + 如果调用 getComments 来刷新评论列表的话，可能只能得到最后一页，前几页的评论获取不到
    + 换一种思路：当评论成功后，在客户端，手动拼接一出个 最新的评论对象，然后调用数组的 unshirf 方法，把最新的评论，追加到 data 中的 comments 开头，这样就能完美的实现刷新评论列表的需求

## 改造 分享图片按钮 的路由链接并显示对应的组件页面














