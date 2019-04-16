<template>

  <div class="mui-numbox" data-numbox-min="1" data-numbox-max="max" style="height:25px">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <!-- 给文本框绑定 改变 事件，每当文本框的 数值 改变时，都获取一下当前最新的数值 -->
    <input id="test" class="mui-input-numbox" type="number" :value="initcount" @change="countChanged" ref="numbox" readonly>
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>

</template>

<script>
// 导入mui框架
import mui from '../../lib/mui/js/mui.min.js';

export default {
    mouted(){
        // 初始化数字选择框组件
        mui('mui-numbox').numbox();
    },
    methods: {
      countChanged(){
        // 数量改变了
        // console.log(this.$refs.number.value);
        // 每当数量值改变，则立即把最新的数量同步到 购物车的 store 中，覆盖原来购物车中的数量
        this.$store.commit('updateGoodsInfo', { 
          id: this.goodsid, 
          count: this.$refs.number.value 
        });
      }
    },
    props: ['initcount', 'goodsid']
};
</script>

<style lang="scss" scoped>

</style>

