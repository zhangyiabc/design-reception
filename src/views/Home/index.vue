<template>
  <div class="home-container">
    <Layout>
      <template>
        <div class="home-content">
          <a-affix :offset-top="top">
            <div class="top">
              <div class="know">
                <p class="info">{{ infoData.hitokoto }}</p>
                <div class="from">
                  <span>————</span>
                  <span>《{{ infoData.from }}》</span>
                </div>
              </div>
              <div class="select">
                <template v-for="info in tags">
                  <a-checkable-tag
                    class="check"
                    :key="info.id"
                    :checked="selectedTags.indexOf(info.id) > -1"
                    @change="(checked) => handleChange(info, checked)"
                  >
                    {{ info.tag }}
                  </a-checkable-tag>
                </template>
              </div>
            </div>
          </a-affix>
          <div class="blog">
            <div class="left-blog">
              <div class="blog-container" v-if="!isLoading">
                <a-empty :imageStyle="{height:'200px'}" v-if="blogList.length == 0" :image="simpleImage"  description='试试别的选项，暂无数据哦~' />
                <template v-else v-for="blog in blogList">
                  <BlogCard :blog="blog" :key="blog.id" />
                </template>
              </div>
              <div v-if="isLoading">
                <a-spin class="spin" size="large" tip="玩命加载中..." />
              </div>
              <div class="pager" v-if="blogList.length > 0">
                <a-pagination
                  show-quick-jumper
                  :default-current="pager.page"
                  :total="pager.total"
                  @change="onPagerChange"
                />
              </div>
            </div>
            <div class="right-blog"></div>
          </div>
        </div>
      </template>
    </Layout>
  </div>
</template>

<script>
import Layout from "@/layout";
import { getAllLabel } from "@/apis/label";
import { sentence } from "@/apis/sentence";
import BlogCard from "@/components/blogCard/index.vue";
import { getAllArticle } from "@/apis/article";
import store from "@/store";
const imgSrc = require("@/assets/empty.png");
export default {
  components: {
    Layout,
    BlogCard,
  },
  data() {
    return {
      isLoading: false,
      tags: [],
      top: 0,
      simpleImage: imgSrc,
      infoData: [],
      blogList: [],
      selectedTags: [],
      reqBody: {
        title: "",
        LabelId: "",
        review: "success",
      },
      pager: {
        page: 1,
        size: 10,
        total: 0,
      },
    };
  },
  watch: {
    $route(to) {
      this.selectedTags = [+to.query.tag];
      this.reqBody.LabelId = +to.query.tag || "all";
      this.getBlogList();
    },
  },
  created() {
    this.selectedTags = [+this.$route.query.tag];
    this.reqBody.LabelId = +this.$route.query.tag || "all";
    this.getSentence();
    this.getBlogList();
    if (store.getters.tags.length == 0) {
      this.getLabelList();
    } else {
      this.tags = store.getters.tags;
    }
  },
  methods: {
    getSentence() {
      sentence().then((res) => {
        this.infoData = res;
      });
    },
    getLabelList() {
      getAllLabel().then((res) => {
        this.tags = res.data;
        store.dispatch("label/setTags", res.data);
      });
    },
    handleChange(tag, check) {
      if (!check) {
        this.selectedTags = [];

        this.reqBody.LabelId = "all";
        this.getBlogList();
        this.$router.push({
          path: "/",
        });
        // return;
      } else {
        this.selectedTags = [tag.id];
        this.reqBody.LabelId = tag.id;
        this.getBlogList();
        this.$router.push({
          path: "/",
          query: {
            tag: +tag.id,
          },
        });
      }
    },
    getBlogList() {
      const body = {
        ...this.reqBody,
        ...this.pager,
      };
      this.isLoading = true;
      getAllArticle(body).then((res) => {
        this.blogList = res.data.data;
        this.pager.total = res.data.total;
        this.isLoading = false;
      });
    },
    // 页码改变
    onPagerChange(page) {
      this.pager.page = page;
      this.getBlogList();
    },
  },
};
</script>

<style lang="scss" scoped>
.home-container {
  height: 100%;
  .home-content {
    // height: 100%;
    background-color: rgb(244, 245, 245);
    padding-bottom: 50px;
  }
  .top {
    // position: fixed;
    width: 100%;
    padding: 0 20px;
    height: 52px;
    display: flex;
    background-color: #fff;
    margin-bottom: 20px;
    border-top: 1px solid #f1f1f1;
    border-bottom: 1px solid #f1f1f1;

    .check {
      border: 1px solid #f1f1f1;
      margin-top: 2px;
    }
    .know {
      position: relative;
      width: 60%;
      p {
        margin: 0;
        padding: 0;
        padding-top: 2px;
        &.info {
          font-size: 17px;
          color: #555;
          font-family: "华文楷体";
          font-weight: bold;
        }
      }
      div {
        font-size: 17px;

        font-family: "华文楷体";
        position: absolute;
        right: 40px;
        font-weight: bold;
      }
      .from {
        position: absolute;
        right: 40px;
      }
    }
  }
  .blog {
    width: 80%;
    margin: 0 auto;

    .left-blog {
      width: 70%;
      .blog-container {
        margin-bottom: 20px;
        
      }
      .spin {
        position: absolute;
        top: 50%;
        left: 50%;
      }
    }
    .pager {
      text-align: center;
    }
  }
}
</style>
