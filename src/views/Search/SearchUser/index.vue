<template>
  <div class="SearchUser">
    <div class="content" v-if="!isLoading">
      <div class="list" v-if="userList.length > 0">
        <template v-for="user of userList">
          <Card :user="user" :key="user.id" :authorKey="reqBody.author" />
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
const imgSrc = require("@/assets/empty.png");
import { getAllUsers } from "@/apis/user";
import Card from "./components/Card.vue";
export default {
  components: {
    Card,
  },

  data() {
    return {
      imgSrc,
      isLoading: false,
      userList: [],
      reqBody: {
        page: 1,
        size: 5,
        total: 0,
        author: "",
      },
    };
  },
  created() {
    this.reqBody.author = this.$route.query.query;
    this.getList();
  },
  watch: {
    ["$route.query"]: {
      // this.selectedTags = [+to.query.tag];
      // this.reqBody.LabelId = +to.query.tag || "all";
      // this.getBlogList();
      handler: function (newValue) {
        console.log(newValue);
        this.reqBody.author = newValue.query;
        this.getList();
      },
    },
  },
  methods: {
    getList() {
      this.isLoading = true;
      getAllUsers(this.reqBody)
        .then((res) => {
          console.log(res);
          this.userList = res.data.data;
          this.reqBody.total = res.data.total;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    onPagerChange(page) {
      this.reqBody.page = page;
      this.getList();
    },
  },
};
</script>

<style lang="scss" scoped>
.SearchUser {
  min-height: 500px;
  margin-bottom: 20px;
  .spin {
    position: absolute;
    top: 50%;
    left: 50%;
  }
  .footer {
    margin-top: 10px;
    display: flex;
    padding-right: 10px;
    justify-content: flex-end;
  }
}
</style>
