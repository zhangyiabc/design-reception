<template>
  <div class="layout">
    <div class="header">
      <!-- 头部插槽 -->
      <Header />
      <!-- 默认中间插槽 -->
    </div>
    <div class="middle">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Header from './components/Header'
export default {
  components:{
    Header
  }
}
</script>

<style lang="scss" scoped>
  .layout{
    height: 100%;
    background-color: rgb(244, 245, 245);
  }
  .header{
    height: 60px;
    background-color: #fff;
  }
  .middle{
    height: calc(100% - 60px);
    background-color: rgb(244, 245, 245);
  }
</style>
