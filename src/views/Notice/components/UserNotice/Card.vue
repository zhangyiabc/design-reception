<template>
  <div class="card">
    <a-badge style="width: 100%" :dot="Message.status == 'unread'">
      <div class="content">
        <div class="left">
          <a-avatar v-if="!isSvg" :size="45" icon="user" :src="avatar" />
          <div
            v-if="isSvg"
            :style="{ width: '45px', height: '45px' }"
            v-html="svg"
          ></div>
        </div>
        <div class="right" @click="handMessageClick">
          <div class="header">
            <b @click="handleBTagClick">{{ this.Message.User.author }}</b>
            {{ this.Message.type | formatType }} 了我的文章<a-button
              type="link"
              @click="handleBtnClick"
              >《{{ this.Message.happenInfo }}》</a-button
            >
          </div>
          <div class="tools">
            <span>{{ Message.createdAt | formatTime }}</span>
          </div>
        </div>
      </div>
    </a-badge>
    <a-modal
      v-model="visible"
      title="我的消息"
      ok-text="确认"
      cancel-text="取消"
      @ok="hideModal"
    >
      <p>
        <b>{{ this.Message.User.author }}</b>
        {{ this.Message.type | formatType }} 了我的文章<span
          >《{{ this.Message.happenInfo }}》</span
        >
      </p>
    </a-modal>
  </div>
</template>

<script>
import { getUserNoticeDetail } from "@/apis/notice";
import moment from "moment";
export default {
  filters: {
    formatType(type) {
      if (type == "like") {
        return "点赞";
      } else {
        return "评论";
      }
    },
    formatTime(time) {
      return moment.utc(time).format("yyyy年MM月DD日 h:mm");
    },
  },
  props: {
    Message: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      svg: "",
      visible: false,
    };
  },
  created() {
    this.formatAvatar();
  },
  computed: {
    avatar() {
      return this.Message.User.UserInfo.avatar;
    },
    content() {
      const str =
        this.Message.User.author +
        this.Message.type +
        "您的文章：《" +
        this.Message.happenInfo +
        "》";
      console.log(str);
      return "";
    },
    isSvg() {
      if (
        this.avatar &&
        this.avatar.indexOf("https://api.multiavatar.com/") == 0
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    formatAvatar(avatar) {
      if (!this.isSvg) {
        return;
      }
      fetch(avatar)
        .then((res) => res.text())
        .then((svg) => {
          this.svg = svg;
        });
    },
    handleBTagClick(e) {
      e.stopPropagation();

      console.log("点击了b标签，去用户详情页");
    },
    handleBtnClick(e) {
      e.stopPropagation();

      console.log("文章被点击，去文章详情页");
    },
    handMessageClick() {
      console.log("点击了消息");
      // 弹出框
      this.visible = true;
      if (this.Message.status == "unread") {
        getUserNoticeDetail(this.Message.id);
        this.Message.status = "read";
        this.$store.dispatch("notice/reduceUserTotal");
      }
    },
    hideModal() {
      this.visible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  padding: 5px 0;
  transition: 0.3s;
  &:hover {
    background-color: #f1f1f1;
  }
}
.content {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #f1f1f1;
  .left {
    width: 6%;
  }
  .right {
    flex: 1 1 auto;
    div {
      &.header {
        b {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
