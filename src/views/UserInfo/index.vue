<template>
  <Layout>
    <template>
      <div class="user-info-container">
        <div class="userInfoContent">
          <div class="contentLeft">
            <div class="userInfo" v-if="showHeader">
              <UserHeader :isPerson="false" :info="UserInfo" />
            </div>
            <div class="tabHeader">
              <div class="tab">文章</div>
              <div class="search">状态查 名字查</div>
            </div>
            <div class="list">文章列表</div>
            <div class="footer">页码</div>
          </div>
          <div class="contentRight">
            <div class="achievement">成就</div>
          </div>
        </div>
      </div>
    </template>
  </Layout>
</template>

<script>
import Layout from "@/layout";
import UserHeader from "@/components/UserHeader";

import { getUserDetail } from "@/apis/user";
export default {
  components: {
    Layout,
    UserHeader,
  },
  data() {
    return {
      id: "",
      UserInfo: {},
      showHeader: false,
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      getUserDetail(this.id).then((res) => {
        this.showHeader = true;
        this.UserInfo = res.data;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.user-info-container {
  background-color: rgb(244, 245, 245);
  .userInfoContent {
    width: 56%;
    margin: 20px auto;
    display: flex;
    justify-content: space-between;
    .contentLeft {
      width: 74%;
      .userInfo{
        background-color: #fff;
      }
    }
    .contentRight{
      width: 24%;
      background-color: palegoldenrod;
    }
  }
}
</style>