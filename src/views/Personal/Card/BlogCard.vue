<template>
  <div class="card">
    <div class="content">
      <div class="top">
        <span class="author">{{ blog.User.author }}</span> <span>|</span>
        <span class="time">{{ blog.createdAt | formatTime }}</span>
        <span>|</span>
        <span class="label"
          ><a-tag color="cyan">{{ blog.Label.tag }}</a-tag></span
        >
      </div>
      <div class="header">
        <div class="status">
          <a-tag :color="color">{{ blog.review | formatReview }}</a-tag>
        </div>
        <div class="title">{{ blog.title }}</div>
      </div>
      <div class="info">
        <div v-if="blog.cover" class="cover">
          <img :src="blog.cover" alt="" />
        </div>
        <div class="abstract">
          {{ blog.abstract ? blog.abstract : "-无摘要" }}
        </div>
      </div>
      <div class="tools">
        <a-button
          class="btn"
          shape="circle"
          type="primary"
          size="small"
          @click="handleEditClick"
          ><a-icon type="edit"
        /></a-button>
        <a-popconfirm
          title="删除后不可恢复，确定删除吗?"
          ok-text="Yes"
          cancel-text="No"
          @confirm="confirm"
        >
          <a-button
            class="btn"
            shape="circle"
            type="danger"
            size="small"
            ><a-icon type="delete"
          /></a-button>
        </a-popconfirm>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  filters: {
    formatReview(review) {
      switch (review) {
        case "success":
          return "审核通过";
        case "waiting":
          return "审核中";
        case "refuse":
          return "审核不通过";
      }
    },
    formatTime(time) {
      const now = moment().utc();
      // console.log(now.from(moment(time)));
      // return moment.utc(time).format("yyyy年MM月DD日 h:mm");
      return moment.utc(time).from(now);
    },
  },
  props: {
    blog: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      color: this.formatColor(),
    };
  },
  // created() {
  //   console.log(this.blog);
  // },
  methods: {
    formatColor() {
      if (this.blog.review == "success") {
        return "green";
      } else if (this.blog.review == "waiting") {
        return "orange";
      } else {
        return "red";
      }
    },
    handleEditClick() {
      console.log("点击了编辑");
    },
    // handleDeleteClick() {
    //   console.log("点击了删除");
      
    // },
    confirm(){
      this.$emit("handleDeleteClick", this.blog.id);
    }
  },
};
</script>

<style lang="scss" scoped>
.card {
  padding: 10px;
  .content {
    border-bottom: 1px #e3e5e7 solid;
    padding-bottom: 10px;
    .top {
      span {
        margin-right: 7px;
      }
    }
    .header {
      margin-top: 5px;
      display: flex;
      .title {
        color: #1d2129;
        font-size: 16px;
      }
    }
    .info {
      margin-top: 10px;
      display: flex;
      height: 40px;
      .cover {
        width: 15%;

        img {
          height: 50px;
        }
      }
      .abstract {
        width: 80%;
        height: 50px;
      }
    }
    .tools {
      margin-top: 5px;
      display: flex;
      justify-content: flex-end;
      .btn {
        margin-left: 10px;
      }
    }
  }
}
</style>
