<template>
  <div class="search-container">
    <Layout>
      <template>
        筛选页面
        这个页面进行展示筛选结果，并且把结果中的关键字标记为红色
        <p>下面还应该有分页</p>
      </template>
    </Layout>
  </div>
</template>

<script>
import store from '@/store'
import Layout from '@/layout'
export default {
  components:{
    Layout
  },
  created(){
    store.dispatch('search/changeKey',this.$route.query.query)
  }
}
</script>

<style>

</style>