<template>
  <div class="commentCard">
    <div class="cardLeft">
      <a-avatar :size="40" :src="avatar" />
    </div>
    <div class="cardRight">
      <div class="name">{{ comment.User.author }}</div>
      <div class="content">{{ comment.content }}</div>
      <div class="footer">
        <div class="tools">
          <div class="time">{{ comment.createdAt | formatTime }}</div>
        </div>
        <div class="btn" @click="handleDelete">
          <i v-if="showBtn" class="icon-shanchu iconfont"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import store from "@/store";
export default {
  filters: {
    formatTime(time) {
      const now = moment().utc();
      // console.log(now.from(moment(time)));
      // return moment.utc(time).format("yyyy年MM月DD日 h:mm");
      return moment.utc(time).from(now);
    },
  },
  props: {
    comment: {
      type: Object,
      default: () => {},
    },
    blog: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      showBtn: false,
    };
  },
  computed: {
    avatar() {
      return this.comment.User.UserInfo.avatar;
    },
  },
  created() {
    this.showBtn = this.judgePower();
  },
  methods: {
    judgePower() {
      if (this.blog.UserId == store.getters.info.id) {
        return true;
      } else if (this.comment.UserId == store.getters.info.id) {
        return true;
      }
      return false;
    },
    handleDelete() {
      this.$emit("handleDelete", { id: this.comment.id });
    },
  },
};
</script>

<style lang="scss" scoped>
.commentCard {
  width: 100%;
  display: flex;
  border-bottom: 1px #e3e5e7 solid;
  padding: 10px 5px 20px 5px;
  .cardLeft {
    width: 7%;
  }
  .cardRight {
    width: 88%;
    .name {
      color: #61666d;
      font-size: 13px;
    }
    .content {
      color: #18191c;
      font-size: 15px;
    }
    .footer {
      margin-top: 5px;
      display: flex;
      justify-content: space-between;
      .tools {
        display: flex;
        // background-color: red;
        color: #9499a0;
        div {
          margin-right: 15px;
        }
      }
      .btn {
        width: 10%;
        i {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
