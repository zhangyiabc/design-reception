<template>
  <div class="SearchBlog">
    <div class="content" v-if="!isLoading">
      <div class="list" v-if="blogList.length > 0">
        <template v-for="blog of blogList">
          <Card :blog="blog" :key="blog.id" :titleKey="reqBody.title" />
        </template>
        <div class="footer">
          <a-pagination
            :defaultPageSize="5"
            :default-current="reqBody.page"
            :total="reqBody.total"
            @change="onPagerChange"
          />
        </div>
      </div>
      <div v-else class="noData">
        <a-empty :imageStyle="{ height: '200px' }" :image="imgSrc" />
      </div>
    </div>
    <div class="loading" v-if="isLoading">
      <a-spin class="spin" size="large" tip="玩命加载中..." />
    </div>
  </div>
</template>

<script>
import { getAllArticle } from "@/apis/article";
import Card from "./components/Card.vue";
const imgSrc = require("@/assets/empty.png");
export default {
  components: {
    Card,
  },
  data() {
    return {
      isLoading: false,
      imgSrc,
      blogList: [],
      reqBody: {
        page: 1,
        size: 5,
        total: 0,
        review: "success",
        title: "",
      },
    };
  },
  watch: {
    ["$route.query"]: {
      // this.selectedTags = [+to.query.tag];
      // this.reqBody.LabelId = +to.query.tag || "all";
      // this.getBlogList();
      handler: function (newValue) {
        this.reqBody.title = newValue.query;
        this.getAllList();
      },
    },
  },
  created() {
    this.reqBody.title = this.$route.query.query;
    this.getAllList();
  },
  methods: {
    getAllList() {
      this.isLoading = true;
      getAllArticle(this.reqBody)
        .then((res) => {
          // console.log(res);
          this.blogList = res.data.data;
          this.reqBody.total = res.data.total
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    onPagerChange(page) {
      console.log(page);
      this.reqBody.page = page
      this.getAllList()
    },
  },
};
</script>

<style lang="scss" scoped>
.SearchBlog {
  min-height: 500px;
  margin-bottom: 20px;
  .spin {
    position: absolute;
    top: 50%;
    left: 50%;
  }
  .footer{
    margin-top: 10px;
    display: flex;
    padding-right: 10px;
    justify-content: flex-end;
  }

}
</style>
