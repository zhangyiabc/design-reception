<template>
  <div class="search-container">
    <Layout>
      <template>
        <a-affix :offset-top="0">
          <div class="top">
            <div class="content">
              <div :class="tab === 1?'active':''" @click="handleTabChange(1)">文章</div>
              <div :class="tab === 2?'active':''" @click="handleTabChange(2)">用户</div>
            </div>
          </div>
        </a-affix>
        <div class="searchContent">
          <SearchBlog v-if="tab===1" />
          <SearchUser v-if="tab===2" />
        </div>
      </template>
    </Layout>
  </div>
</template>

<script>
import store from "@/store";
import Layout from "@/layout";
import SearchBlog from './SearchBlog/index.vue'
import SearchUser from './SearchUser/index.vue'
export default {
  components: {
    Layout,
    SearchBlog,
    SearchUser
  },
  created() {
    
    store.dispatch("search/changeKey", this.$route.query.query);
  },
  data(){
    return {
      tab:1,
    }
  },
  methods: {
    handleTabChange(tab) {
      console.log(tab);
      this.tab = tab
    },
  },
};
</script>

<style lang="scss" scoped>
.search-container {
  padding-bottom:20px;
  min-height: 100vh;
  background-color: rgb(244, 245, 245);
  .top {
    border-top: 1px #e3e5e7 solid;
    border-bottom: 1px #e3e5e7 solid;
    background-color: #fff;
    box-sizing: border-box;
    height: 50px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    .content {
      width: 70%;
      margin: 0 auto;
      display: flex;
      height: 100%;
      
      div{
        padding: 0 10px;
        line-height: 50px;
        margin: 0 10px;
        color: #333;
        cursor: pointer;
        &:hover{
          color:#007fff;
        }
        &.active{
          color:#007fff;
        }
      }
    }
  }
  .searchContent {
    width: 70%;
    margin: 0 auto;
    margin-top: 20px;
    background-color: #fff;
    padding: 20px;
  }
}
</style>
