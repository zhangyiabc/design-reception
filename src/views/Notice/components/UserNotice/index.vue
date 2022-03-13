<template>
  <div class="userNotice">
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
          </a-badge>
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
import Card from "./Card.vue";
const imgSrc = require("@/assets/empty.png");
import { mapGetters } from "vuex";
import { getAllUserNotice } from "@/apis/notice";
export default {
  components: {
    Card,
  },
  data() {
    return {
      isLoading: false,
      messageList: [],
      imgSrc,
      reqBody: {
        page: 1,
        size: 5,
        total: 0,
        status: "all",
        targetAuthorId: "",
      },
    };
  },
  computed: {
    ...mapGetters({
      UserInfo: "info",
    }),
  },
  watch: {
    UserInfo: {
      handler: function () {
        this.reqBody.targetAuthorId = this.UserInfo?.id;
        if (this.reqBody.targetAuthorId) {
          this.getMessage();
        }
      },
      immediate: true,
    },
  },
  methods: {
    getMessage() {
      this.isLoading = true;
      getAllUserNotice(this.reqBody)
        .then((res) => {
          this.messageList = res.data.data;
          this.reqBody.total = res.data.total;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    handleChange(value) {
      this.reqBody.status = value;
      this.reqBody.page = 1
      this.getMessage();
    },
    onPagerChange(page) {
      this.reqBody.page = page;
      this.getMessage();
    },
  },
};
</script>

<style lang="scss" scoped>
.userNotice {
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
  .list{
    margin-top: 15px;
  }
}
</style>
