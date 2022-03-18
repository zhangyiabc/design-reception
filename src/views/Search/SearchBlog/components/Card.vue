<template>
  <div class="blog-card">
    <div class="content" @click="handleGoDetail">
      <div class="top">
        <span class="author" @click="handleUserClick">{{
          blog.User.author
        }}</span>
        <span class="date">{{ blog.createdAt | formatTime }}</span>
        <span class="label" @click="handleLabelClick">{{
          blog.Label.tag
        }}</span>
      </div>
      <div class="middle">
        <div class="middle-left">
          <div class="title" v-html="formatTitle(blog.title)"></div>
          <div class="abstract">
            <p>{{ blog.abstract || "-无摘要" }}</p>
          </div>
          <div class="tools">
            <span class="view"
              ><i class="iconfont icon-liulan" />{{ blog.viewcount }}</span
            >
            <span
              class="like"
              ref="like"
              :style="{ color: isLike ? '#1d7dfa' : '#4e5969' }"
              @click="handleLike"
              ><i class="iconfont icon-dianzan"></i>{{ blog.likecount }}</span
            >
            <span class="comment"
              ><i class="iconfont icon-pinglun1" />{{ blog.commentcount }}</span
            >
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
/**
 * 判断这篇文章用户有没有点赞
 */
import { like as likeApi, cancelLike } from "@/apis/like";
import moment from "moment";
export default {
  filters: {
    formatTime(time) {
      return moment(time).format("yyyy-MM-DD h:mm:ss");
    },
  },
  data() {
    return {
      isLike: false,
    };
  },
  props: {
    blog: {
      type: Object,
      default: () => {},
    },
    titleKey: {
      type: String,
      default: "",
    },
  },
  mounted() {
    // console.log("start");
    const result = this.isHas(this.$store.getters.likeList, this.blog.id);
    this.isLike = result;
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
    formatTitle(title) {
      const tempBigArr = title.split("");
      const tempSmall = this.titleKey.split("");
      const start = this.hasChild(tempBigArr, tempSmall);
      tempBigArr.splice(start + tempSmall.length +1, 0, "</span>");
      tempBigArr.splice(start + 1, 0, '<span style="color:red">');
      return `<b>${tempBigArr.join("")}</b>`;
    },
    // 判断大数组里面是不是有小数组，并把开始的下标返回
    hasChild(big, small) {
      let abs = 0;
      for (let i = 0; i < big.length; i++) {
        let start = small[abs];
        if (big[i].toLowerCase() == start.toLowerCase()) {
          abs++;
        }
        if (abs == small.length) {
          return i - abs;
        }
      }
    },
    handleUserClick(e) {
      e.stopPropagation();
      // 跳转到个人主页去
      // console.log("跳转个人主页",this.blog.UserId);
      this.$router.push({
        path: "/user",
        name: "UserInfo",
        params: {
          id: this.blog.UserId,
        },
      });
    },
    isHas(arr, id) {
      if (arr.length === 0) {
        return false;
      }
      for (const item of arr) {
        if (item.ArticleId == id) {
          return true;
        }
      }
      return false;
    },
    handleLike(e) {
      e.stopPropagation();
      // console.log("点击了喜欢");
      // 调接口，改样式
      // vuex中添加一项
      if (this.isLike) {
        // 此时已经点赞过这个文章，取消点赞
        // vuex移除这一项
        cancelLike({
          articleId: this.blog.id,
        }).then((res) => {
          if (res.code === "200") {
            this.blog.likecount--;
            this.$store.dispatch("like/deleteLike", this.blog.id);
          }
        });
      } else {
        // 没点赞，进行点赞
        // vuex添加一项
        likeApi({
          articleId: this.blog.id,
        }).then((res) => {
          if (res.code === "200") {
            this.blog.likecount++;
            this.$store.dispatch("like/addLikeList", {
              id: res.data.id,
              title: this.blog.title,
              cover: this.blog.cover,
              UserId: this.blog.UserId,
              ArticleId: this.blog.id,
            });
          }
        });
      }
      this.isLike = !this.isLike;
    },
    handleGoDetail() {
      // store中添加一项
      this.$store.dispatch("article/addBlogList", this.blog);
      // 跳转detail页面
      this.$router.push({
        name: "Detail",
        params: {
          id: this.blog.id,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("//at.alicdn.com/t/font_2804341_big5hs3d5cj.css");
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
        .tools {
          font-size: 18px;
          display: flex;
          align-items: center;
          span {
            cursor: pointer;
            margin-right: 18px;
            // color: #4e5969;

            i {
              font-size: 22px;
              margin-right: 8px;
            }
          }
          span.like,
          span.comment {
            &:hover {
              color: #1d7dfa;
            }
          }
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
