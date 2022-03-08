<template>
  <Layout>
    <template>
      <div class="user-info-container">
        <div class="userInfoContent">
          <div class="contentLeft">
            <div class="userInfo">
              <div class="infoLeft">
                左边头像
              </div>
              <div class="infoRight">
                右边信息
                昵称
                个性签名
                来知识星球时间（当前时间 - createdAt）
              </div>
            </div>
            <div class="tabHeader">
              <div class="tab">文章</div>
              <div class="search">
                状态查
                名字查
              </div>
            </div>
            <div class="list">
              文章列表
            </div>
            <div class="footer">
              页码
            </div>
          </div>
          <div class="contentRight">
            <div class="achievement">
              成就
            </div>
          </div>
        </div>
      </div>
    </template>
  </Layout>
</template>

<script>
import Layout from "@/layout";
export default {
  components: {
    Layout,
  },
};
</script>

<style lang="scss" scoped>
.user-info-container {
  background-color: rgb(244, 245, 245);
  .userInfoContent {
    width: 70%;
    margin: 0 auto;
    display: flex;
    .contentLeft{
      background-color: red;
      width: 70%;
    }
  }
}
</style>