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
              <a-tabs default-active-key="1">
                <a-tab-pane key="1" >
                  <span slot="tab">
                    <a-icon type="read" />
                    文章
                  </span>
                </a-tab-pane>
              </a-tabs>
            </div>
            <div class="content" v-if="!isLoading">
              <div v-if="blogList.length > 0" class="list">
                <template v-for="blog of blogList">
                  <BlogCard :blog="blog" :key="blog.id" />
                </template>
              </div>
              <div class="empty" v-else>
                <a-empty :image="imgSrc" />
              </div>
            </div>
            <div v-else class="loading">
              <a-spin class="spin" size="large" tip="玩命加载中..." />
            </div>
            <div class="footer" v-if="getBlogReq.total > 0">
              <a-pagination
                size="small"
                :defaultPageSize="5"
                :total="getBlogReq.total"
                @change="handleBlogPageChange"
              />
            </div>
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
const imgSrc = require("@/assets/empty.png");
import Layout from "@/layout";
import BlogCard from "@/components/blogCard/index.vue";
import UserHeader from "@/components/UserHeader";
import { getAllArticle as getAllArticleApi } from "@/apis/article";
import { getUserDetail } from "@/apis/user";
export default {
  components: {
    Layout,
    UserHeader,
    BlogCard,
  },
  data() {
    return {
      imgSrc,
      id: "",
      isLoading: false,
      UserInfo: {},
      blogList: [],
      showHeader: false,
      getBlogReq: {
        page: 1,
        size: 5,
        total: 0,
        review: "success",
        title: "",
        UserId: "",
      },
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getBlogReq.UserId = this.$route.params.id;
    this.getUserInfo();
    this.getAllArticle();
  },
  methods: {
    getUserInfo() {
      getUserDetail(this.id).then((res) => {
        this.showHeader = true;
        this.UserInfo = res.data;
      });
    },
    handleBlogPageChange(page) {
      this.getBlogReq.page = page;
      this.getAllArticle()
    },
    getAllArticle() {
      this.isLoading = true;
      getAllArticleApi(this.getBlogReq)
        .then((res) => {
          this.blogList = res.data.data;
          this.getBlogReq.total = res.data.total;
        })
        .finally(() => {
          this.isLoading = false;
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
    padding-bottom: 20px;
    .contentLeft {
      background-color: #fff;
      width: 74%;
      .userInfo {
        background-color: #fff;
      }
    }
    .tabHeader{
      margin-top: 10px;
      background-color: #fff;
    }
    .contentRight {
      width: 24%;
      background-color: palegoldenrod;
    }
    .loading {
      margin-top: 30px;
      display: flex;
      justify-content: center;
    }
    .footer{
      margin-top: 10px;
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
