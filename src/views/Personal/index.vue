<template>
  <Layout>
    <template>
      <div class="persional-container">
        个人页面 可以展示个人发布过的文章
        可以按条件查询被驳回的文章、审核通过的文章
        <div class="contentLeft">
          <div class="userInfo">
            <div class="infoLeft">左边头像</div>
            <div class="infoRight">
              右边信息 昵称 个性签名 来知识星球时间（当前时间 - createdAt） btn
              编辑个人资料（弹出修改弹框）
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
            每个文章可以查看 编辑 删除
            编辑里面是可以发布的
          </div>
          <div class="footer">
            页码
          </div>
        </div>
        <div class="contentRight">
          <div class="achievement">成就</div>
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

<style>
</style>