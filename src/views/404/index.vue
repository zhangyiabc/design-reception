<template>
  <Layout>
    <template>
      <div class="notfind-container">
        <div class="imgBox">
          <img :src="imgSrc" alt="">
        </div>
        <div class="btn">
          <a-button type="link" size="large" @click="handleGoBackHome">回到首页</a-button>
        </div>
      </div>
    </template>
  </Layout>
</template>

<script>
const imgSrc = require("@/assets/404.png");
import Layout from "@/layout";
export default {
  components: {
    Layout,
  },
  data() {
    return {
      imgSrc,
    };
  },
  methods:{
    handleGoBackHome(){
      this.$router.push({
        path:"/"
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.notfind-container {
  text-align: center;
  div.imgBox{
    height: 500px;
    img{
      height: 100%;
    }
  }
  .btn{
    .a-button{
      font-size: 20px;
    }
  }
}
</style>
