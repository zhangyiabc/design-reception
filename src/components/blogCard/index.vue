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
          <div class="title">{{ blog.title }}</div>
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
import { mapGetters } from 'vuex'
import { like as likeApi, cancelLike } from "@/apis/like";
import moment from "moment";
export default {
  filters: {
    formatTime(time) {
      // const now = moment().utc();
      // console.log(now.from(moment(time)));
      return moment(time).utcOffset(8).format("yyyy年MM月DD日 HH:mm");
      // return moment.utc(time).from(now);
    },
  },
  computed:{
    ...mapGetters({ 
      userInfo: "info",
    }),
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
  },
  mounted() {
    // console.log(this.blog)
    const result = this.isHas(this.$store.getters.likeList, this.blog.id);
    this.isLike = result;
  },
  watch: {
    ["$store.getters.likeList"]: {
      handler: function () {
        const result = this.isHas(this.$store.getters.likeList, this.blog.id);
        this.isLike = result;
      },
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
      // 判断用户是否登录
      // 没登录不可以点赞
      if(Object.keys(this.userInfo).length == 0){
        // this.$message.warn('请先登录')
        this.$message.warn('请先登录', [0.5], () => {
          this.$store.dispatch("setting/setShow", true);
        })
        
        return 
      }
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
