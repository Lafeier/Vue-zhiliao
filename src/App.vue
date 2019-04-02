<template>
    <div class="app-container">

        <!-- 顶部 Header 区域 -->
        <mt-header fixed title="知了学院"></mt-header>

        <!-- 中间 路由router-view 区域 -->
		<transition mode="out-in">
			<router-view></router-view>
		</transition>

        <!-- 底部 Tabbar 区域 -->
        <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item-lzm" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item-lzm" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item-lzm" to="shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge">0</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item-lzm" to="search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>

    </div>
</template>

<script>
    
</script>

<style lang="scss" scoped>
	.mint-header{
		z-index: 99;
	}

    .app-container{
        padding-top: 40px;
		padding-bottom: 50px;
		overflow-x: hidden;	// 解决切换组件时页面出现滚动条的问题
    }

	.v-enter{
		opacity: 0;
		transform: translateX(100%);
	}
	.v-leave-to{	// 为了实现组件切换时，消失页面从左消失，进入页面从右进入，需要将两组类拆开写
		opacity: 0;
		transform: translateX(-100%);	// 负值向左走
		position: absolute;	
	}

	.v-enter-active,
	.v-leave-active{
		transition: all 0.5s ease;
	}



	// 改类名，以解决tabbar点击无法切换问题
	.mui-bar-tab .mui-tab-item-lzm.mui-active {
    	color: #007aff;
	}

	.mui-bar-tab .mui-tab-item-lzm {
		display: table-cell;
		overflow: hidden;
		width: 1%;
		height: 50px;
		text-align: center;
		vertical-align: middle;
		white-space: nowrap;
		text-overflow: ellipsis;
		color: #929292;
	}

	.mui-bar-tab .mui-tab-item-lzm .mui-icon {
		top: 3px;
		width: 24px;
		height: 24px;
		padding-top: 0;
		padding-bottom: 0;
	}

	.mui-bar-tab .mui-tab-item-lzm .mui-icon~.mui-tab-label {
		font-size: 11px;
		display: block;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>



















