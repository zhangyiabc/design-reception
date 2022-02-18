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
  }
  .header{
    height: 60px;
  }
  .middle{
    height: calc(100% - 60px);
  }
</style>
