<template>
  <Layout>
    <template>
      <div class="publish-container">
        <div class="top">
          <img :src="publishSrc" alt="" />
          <p>发布成功！有了你的分享，我们的知识星球会变得更好！</p>
        </div>
        <div class="content">
          <div class="title">
            《 {{title}} 》
          </div>
          <div class="desc">
            您的文章已成功发布，管理员正在审核中，请耐心等待
          </div>
        </div>
        <div class="footer">
          <router-link to='/'>回到首页</router-link>
        </div>
      </div>
    </template>
  </Layout>
</template>

<script>
const publishSrc = require("../../assets/publish.png");
import Layout from "@/layout";
export default {
  components: {
    Layout,
  },
  computed:{
    title(){
      return this.$store.getters.title
    }
  },
  data() {
    return {
      publishSrc,
    };
  },
  
};
</script>

<style lang="scss" scoped>
.publish-container {
  background-color: rgb(244, 245, 245);
  height: 100%;
  .top {
    width: 80%;
    margin: 0 auto;
    text-align: center;
    img {
      width: 40%;
    }
    p {
      font-size: 16px;
      color: #666;
      text-align: center;
      margin-top: -20px;
    }
  }
  .content {
    margin: 0 auto;
    width: 50%;
    background-color: #fff;
    height: 80px;
    text-align: center;
    padding: 10px 20px;
    .title{
      font-size: 20px;
      font-weight: 700;
    }
    .desc{
      margin-top: 5px;
    }
  }
  .footer{
    margin-top: 30px;
    text-align: center;
  }
}
</style>
