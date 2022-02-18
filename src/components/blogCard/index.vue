<template>
  <div class="blog-card">
    <div class="content" @click="handleGoDetail">
      <div class="top">
        <span class="author">{{ blog.User.author }}</span>
        <span class="date">{{ blog.createdAt | formatTime }}</span>
        <span class="label" @click="handleLabelClick">{{
          blog.Label.tag
        }}</span>
      </div>
      <div class="middle">
        <div class="middle-left">
          <div class="title">{{ blog.title }}</div>
          <div class="abstract">
            <p>{{ blog.abstract || "无摘要" }}</p>
          </div>
          <div class="tools">
            <span>点赞</span>
            <span>点赞</span>
            <span>点赞</span>
          </div>
        </div>
        <div class="middle-right" v-if="blog.cover">
          <img class="thumb" :src="blog.cover" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  filters: {
    formatTime(time) {
      return moment(time).format("yyyy-MM-DD h:mm:ss");
    },
  },
  props: {
    blog: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    handleLabelClick(e) {
      e.stopPropagation();
      // 跳转该标签下的主页
      const nowLabel = this.$route.query.tag;
      if (nowLabel == this.blog.Label.id) {
        return;
      }
      this.$router.push({
        path: "/",
        query: {
          tag: +this.blog.Label.id,
        },
      });
    },
    handleGoDetail() {
      console.log("点击了卡片");
    },
  },
};
</script>

<style lang="scss" scoped>
.blog-card {
  padding: 10px;
  padding-bottom: 0;
  height: 142px;
  box-sizing: border-box;
  background-color: #fff;
  transition: all 0.3s ease-in;
  cursor: pointer;
  &:hover {
    background: #fafafa;
  }
  .content {
    width: 100%;
    height: 100%;
    border-bottom: 1px solid #f1f1f1;
    padding: 0 10px;
    box-sizing: border-box;
    .top {
      margin-bottom: 2px;
      span {
        // margin: 0 5px;
        display: inline-block;
        position: relative;
        padding: 0 10px;
        cursor: pointer;
        // transition: all .3s ease-in;
        &.author {
          padding: 0;
          padding-right: 10px;
          color: #4e5969;
        }
        &.date,
        &.label {
          font-size: 13px;
          line-height: 22px;
          color: #86909c;
        }
        &.author:hover,
        &.label:hover {
          color: #1d7dfa;
          // font-weight: bold;
        }
      }
      .label::before,
      .date::before {
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        display: block;
        width: 1px;
        height: 14px;
        background: #e5e6eb;
        content: " ";
      }
    }
    .title {
      font-weight: 700;
      font-size: 16px;
      line-height: 24px;
      color: #1d2129;
      margin: 5px 0;
    }
    .middle {
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      .middle-left {
        flex: 1;
        margin-right: 15px;
        // background-color: lightpink;

        overflow: hidden;
        .abstract {
          width: 100%;
          height: 25px;
        }
        .abstract p {
          width: 100%;
          height: 25px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          color: #86909c;
          font-size: 13px;
          line-height: 22px;
          -webkit-line-clamp: 1;
          // background-color: lightcyan;
          margin-bottom: 12px;
        }
        p {
          padding: 0;
          margin: 0;
        }
      }
      .middle-right {
        width: 150px;
        height: 100%;
        display: flex;
        // background-color: cadetblue;
        img {
          object-fit: cover;
          flex: 0 0 auto;
          width: 120px;
          height: 90px;
          // height: 100%;
          // margin-left: 24px;
          // background-color: #fff;
          border-radius: 2px;
        }
      }
    }
  }
}
</style>
