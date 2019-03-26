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
















