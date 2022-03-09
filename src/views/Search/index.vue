<template>
  <div class="search-container">
    <Layout>
      <template>
        可选择tab ------ 文章  用户
        文章页面下
        这个页面进行展示筛选结果，并且把结果中的关键字标记为红色
        <p>下面还应该有分页</p>

        用户下
        显示用户
        一条一条的用户 用户信息右侧可以去他的主页，点击用户昵称可以去他的主页
        并且把用户的昵称关键字标红
        <p>分页</p>
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