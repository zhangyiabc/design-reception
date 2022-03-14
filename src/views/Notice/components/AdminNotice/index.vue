<template>
  <div class="adminNotice">
    <div class="search">
      <a-select default-value="all" style="width: 160px" @change="handleChange">
        <a-select-option value="read"> 已读 </a-select-option>
        <a-select-option value="unread"> 未读 </a-select-option>
        <a-select-option value="all"> 全部 </a-select-option>
      </a-select>
    </div>
    <div class="content" v-if="!isLoading">
      <div class="list" v-if="messageList.length > 0">
        <template v-for="message of messageList">
          <Card :Message="message" :key="message.id" />
        </template>
        <div class="footer">
          <a-pagination
            :defaultPageSize="8"
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
import Card from './Card.vue'
const imgSrc = require("@/assets/empty.png");
import { mapGetters } from "vuex";
import { getAllAdminNotice } from "@/apis/notice";
export default {
  components:{
    Card
  },
  data() {
    return {
      messageList: [],
      isLoading: false,
      imgSrc,
      reqBody: {
        page: 1,
        size: 8,
        total: 0,
        status: "all",
      },
    };
  },
  computed: {
    ...mapGetters({
      UserInfo: "info",
    }),
  },
  created() {
    this.getMessage();
  },
  //   watch: {
  //   UserInfo: {
  //     handler: function () {
  //       this.reqBody = this.UserInfo?.id;
  //       if (this.reqBody) {
  //         this.getMessage();
  //       }
  //     },
  //     immediate: true,
  //   },
  // },
  methods: {
    handleChange(value) {
      this.reqBody.page = 1

      this.reqBody.status = value;
      this.getMessage()
    },
    onPagerChange(page) {
      this.reqBody.page = page;
      this.getMessage()

    },
    getMessage() {
      this.isLoading = true;
      getAllAdminNotice(this.reqBody)
        .then((res) => {
          // console.log(res);
          this.messageList = res.data.data
          this.reqBody.total = res.data.total
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.adminNotice {
  padding: 10px 20px;
  .search {
    display: flex;
    justify-content: flex-end;
  }
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
