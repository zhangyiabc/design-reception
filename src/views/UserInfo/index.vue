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
                <a-tab-pane key="1">
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
            <div class="achievement">
              <div class="header">
                <span>个人成就</span>
              </div>
              <div class="content">
                <div class="rank">
                  <i class="icon-chengjiu iconfont" /> 该作者共发布<span>{{
                   UserInfo.count
                  }}</span
                  >篇文章
                </div>
                <div class="good" v-if="UserInfo.count > 10">
                  <i class="icon-shangsheng iconfont"></i>
                  优秀创作者
                  <span></span>
                </div>
                <div class="join">
                  <i class="iconfont icon-jiaruwomen"></i>
                  加入于 ——{{UserInfo.createdAt | formatTime}}
                </div>
              </div>
            </div>
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
import moment from 'moment'
export default {
  filters:{
    formatTime(time){
      return moment(time).format("yyyy-MM-DD");
    }
  },
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
      this.getAllArticle();
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
      width: 70%;
      .userInfo {
        background-color: #fff;
      }
    }
    .tabHeader {
      margin-top: 10px;
      background-color: #fff;
    }
    .contentRight {
      width: 28%;
      // background-color: palegoldenrod;
      .achievement {
        height: 185px;
        background-color: #fff;
        .header {
          height: 50px;
          padding: 0px 12px;
          box-sizing: border-box;
          border-bottom: 1px solid rgba(230, 230, 231, 0.5);
          span {
            font-size: 16px;
            line-height: 50px;
            font-weight: 600;
            color: #31445b;
          }
        }
      }
      .content{
        margin-top: 10px;
        padding: 0 10px;
        div{
          height: 30px;
          font-size: 15px;
          margin-bottom: 10px;
          i{
            margin-right: 5px;
            color: #fff;
            display: inline-block;
            text-align: center;
            line-height: 28px;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            background-color: rgb(87, 161, 158);
          }
          span{
            font-size: 16px;
            margin: 0 2px;
          }
        }
      }
    }
    .loading {
      margin-top: 30px;
      display: flex;
      justify-content: center;
    }
    .footer {
      margin-top: 10px;
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
