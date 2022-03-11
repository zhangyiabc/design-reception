<template>
  <Layout>
    <template>
      <div class="detail" v-if="blogShow">
        <div class="detail-container">
          <div class="contentFixed">
            <div class="like" @click="handleLikeClick">
              <span
                ><a-badge
                  :count="blog.likecount"
                  :number-style="likeed ? likeActive : likeNoActive"
              /></span>
              <i
                class="iconfont icon-dianzan"
                :style="{ color: likeed ? '#1e80ff' : '#c2c8d1' }"
              ></i>
              <!-- <a-icon type="like" :style="{ color: likeed ? '#1e80ff' : '#c2c8d1' }" /> -->
            </div>
            <a href="#comment">
              <div class="comment">
                <span>
                  <a-badge
                    :count="blog.commentcount"
                    :number-style="likeNoActive"
                /></span>
                <i class="iconfont icon-pinglun1" /></div
            ></a>
            <a-tooltip placement="top">
              <template slot="title">
                <span>分享</span>
              </template>
              <div class="share" @click="handleShareClick">
                <i class="iconfont icon-fenxiang" />
              </div>
            </a-tooltip>
            <!-- <div class="share" @click="handleShareClick">
              <i class="iconfont icon-fenxiang" />
            </div> -->
            <a-divider />
            <a-tooltip placement="top">
              <template slot="title">
                <span>举报此文章</span>
              </template>
              <div class="report">
                <i class="iconfont icon-jubao"></i>
              </div>
            </a-tooltip>
          </div>
          <div class="contentLeft">
            <div class="contentDetail">
              <h1 class="title">{{ blog.title }}</h1>
              <div class="user-info">
                <div class="left-info">
                  <div class="avatar">
                    <a-avatar v-if="!isSvg"  :size="64" icon="user" :src="avatar" />
                    <div v-if="isSvg" :style="{width:'64px',height:'64px'}" v-html="svg"></div>
                  </div>
                  <div class="info-detail">
                    <p class="author">{{ blog.User.author }}</p>
                    <p class="date">{{ blog.createdAt | formatTime }}</p>
                  </div>
                </div>
                <div class="right-info">
                  <span class="tag">所属标签: </span>
                  <a-tag color="cyan"> {{ blog.Label.tag }}</a-tag>
                </div>
              </div>
              <div class="cover">
                <img
                  style="width: 100%; margin-bottom: 20px"
                  :src="blog.cover"
                />
              </div>
              <div class="content" v-html="blog.content"></div>
            </div>
            <div class="middle"></div>
            <div class="footer" id="comment">
              <h2 class="commitTitle">评论</h2>
              <WriteComment
                :avatar="avatar"
                :loading="publishLoading"
                @handlePublishComment="handlePublishComment"
              />
              <div class="list">
                <CommentList
                  :blog="blog"
                  :total="commentReq.total"
                  :commentList="commentList"
                  @handleDelete="handleDelete"
                  @handlePageChange="handlePageChange"
                />
              </div>
            </div>
          </div>
          <div class="contentRight">
            <div class="right-user">
              <div class="right-user-info">
                <div class="avatar">
                  <a-avatar v-if="!isSvg" :size="60" :src="avatar" />
                  <div v-if="isSvg" :style="{width:'60px',height:'60px'}"  v-html="svg"></div>
                </div>
                <div class="avatar-right">
                  <p>{{ blog.User.author }}</p>
                  <p>{{ blog.User.UserInfo.autograph }}</p>
                </div>
              </div>
              <div class="right-other-info">
                <div class="like">
                  <!-- <a-icon type="like" /> -->
                  <i class="icon-dianzan iconfont"></i>
                  文章被点赞<span>{{ blog.likecount }}</span
                  >次
                </div>
                <div class="view">
                  <i class="icon-liulan iconfont" /> 文章被浏览<span>{{
                    blog.viewcount
                  }}</span
                  >次
                </div>
                <div class="rank">
                  <i class="icon-chengjiu iconfont" /> 该作者共发布<span>{{
                    blog.User.count
                  }}</span
                  >篇文章
                </div>
                <div class="achievement" v-if="blog.User.count > 10">
                  <i class="icon-shangsheng iconfont"></i>
                  优秀创作者
                  <span></span>
                </div>
              </div>
            </div>
            <div class="catalogue">
              <div class="text">目录</div>
              <Outline v-if="handList.length > 0" :list="handList" />
            </div>
          </div>
        </div>
      </div>
      <div class="" v-else>拼命加载</div>
    </template>
  </Layout>
</template>

<script>
/**
 * 同样需要判断是否点赞过
 */
import { getArticleDetail } from "@/apis/article";
import { like as likeApi, cancelLike } from "@/apis/like";
import { publishComment, getAllComment, deleteComment } from "@/apis/comment";
import Layout from "@/layout";
import Outline from "../Outline/indexJSX.jsx";
import WriteComment from "./components/WriteComment.vue";
import CommentList from "./components/CommentList.vue";
import { getItem } from "@/utils/auth";
import moment from "moment";
import copy from "clipboard-copy";
const html2json = require("html2json").html2json;
export default {
  filters: {
    formatTime(time) {
      return moment(time).format("yyyy年MM月DD日 h:mm");
    },
  },
  components: {
    Layout,
    Outline,
    WriteComment,
    CommentList,
  },

  computed: {
    blogList() {
      return this.$store.getters.blogList;
    },
    blogShow() {
      return Object.keys(this.blog).length > 0 && this.avatar;
    },
    tag() {
      return this.blog.Label.tag;
    },
    avatar() {
      return this.blog.User?.UserInfo?.avatar;
    },
    likeList() {
      return this.$store.getters.likeList;
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
  created() {
    this.articleId = this.$route.params.id;
    
    if (this.blogList.length > 0) {
      this.blog = this.getNowArticle(this.blogList, this.articleId);
      this.commentReq.articleId = this.blog.id;
      this.handList = this.getElement(html2json(this.blog.content).child);
      this.getComment();
    } else {
      // 尝试从localStorage中读取数据，如果有拿出来，没有的话掉接口
      const tempList = JSON.parse(getItem("bloglist"));
      if (tempList && tempList.length > 0) {
        const res = this.getNowArticle(tempList, this.articleId);
        // 判断能不能从localStorage拿到数据，拿不到就掉接口
        if (!res) {
          this.getArticle(this.articleId);
        } else {
          this.blog = res;
          this.commentReq.articleId = this.blog.id;
          this.handList = this.getElement(html2json(this.blog.content).child);
          this.getComment();
        }
      } else {
        this.getArticle(this.articleId);
      }
    }
  },
  mounted() {
    this.commentReq.articleId = this.blog.id;
    const result = this.isHas(this.likeList, this.articleId);
    this.likeed = result;
    console.log(this.likeed)
  },
  watch: {
    likeList: {
      handler: function () {
        const result = this.isHas(this.likeList, this.articleId);
        this.likeed = result;
      },
    },
    avatar:{
      handler:function(){
        this.formatAvatar(this.avatar);
      }
    }
  },
  data() {
    return {
      svg:'',
      articleId: "",
      likeed: false,
      blog: {},
      handList: [],
      publishLoading: false,
      commentList: [],
      likeNoActive: {
        backgroundColor: "#c2c8d1",
        color: "#fff",
        // boxShadow: "0 0 0 1px #d9d9d9 inset",
      },
      likeActive: {
        backgroundColor: "#1e80ff",
        color: "#fff",
        // boxShadow: "0 0 0 1px #d9d9d9 inset",
      },
      commentReq: {
        articleId: "",
        page: 1,
        size: 5,
        total: 0,
      },
    };
  },
  methods: {
    formatAvatar(avatar) {
      if(!this.isSvg){
        return 
      }
      fetch(avatar)
        .then((res) => res.text())
        .then((svg) => {
          this.svg = svg;
        });
    },
    getNowArticle(arr, id) {
      for (const item of arr) {
        if (item.id == id) {
          return item;
        }
      }
      return null;
    },
    getComment() {
      getAllComment({
        ...this.commentReq,
      }).then((res) => {
        this.commentList = res.data.data;
        this.commentReq.total = res.data.total;
      });
    },
    getArticle(id) {
      // 掉接口获取文章详情
      getArticleDetail(id)
        .then((res) => {
          this.blog = res.data;
          this.commentReq.articleId = this.blog.id;
          this.handList = this.getElement(html2json(this.blog.content).child);
        })
        .finally(() => {
          this.getComment();
        });
    },
    getElement(arr) {
      if (arr.length === 1 && arr[0]["child"]) {
        arr = arr[0]["child"];
      } else if (arr.length === 1 && !arr[0]["child"]) {
        return [];
      }
      const reg = /^h[1-6]$/;
      const newArr = [];
      for (const item of arr) {
        if (item.node === "element" && reg.test(item.tag)) {
          const text = this.getHText(item.child);
          // 调用一个方法，将h标签中的child中的所有text取出来
          newArr.push({
            tag: item.tag.toUpperCase(),
            id: item.attr.id,
            text,
          });
        }
      }
      // console.log(newArr);
      return newArr;
    },
    getHText(HList) {
      let str = "";
      for (const item of HList) {
        if (item.node === "text") {
          str += this.getTextHeaper(item);
        } else if (item.node === "element" && item.child.length > 0) {
          str += this.getHText(item.child);
        }
      }
      return str;
    },
    getTextHeaper(obj) {
      // 利用正则表达式去除标题中的空格(&nbsp;)
      const temp = obj.text.replace(/&nbsp;/, "");
      return temp;
    },
    // 点击了分享
    handleShareClick() {
      copy(
        `【《${this.blog.title}》——知识星球  】 ${window.location.href}`
      ).then(() => {
        this.$message.success("已复制到剪贴板");
      });
    },
    handleLikeClick() {
      // 调接口，改样式
      // vuex中添加一项
      if (this.likeed) {
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
              UserId: res.UserId,
              ArticleId: this.blog.id,
            });
          }
        });
      }
      this.likeed = !this.likeed;
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
    // 发布一条评论
    handlePublishComment(value) {
      // 调接口
      this.publishLoading = true;
      publishComment({
        objectId: this.blog.id,
        content: value,
        type: "art",
      })
        .then((res) => {
          if (res.code === "200") {
            this.$message.success("发布成功");
            // 重新调获取列表接口
            this.blog.commentcount++;
            this.getComment();
          }
        })
        .finally(() => {
          this.publishLoading = false;
        });
    },
    handleDelete(obj) {
      deleteComment({
        articleId: this.blog.id,
        id: obj.id,
      }).then((res) => {
        if (res.code === "200") {
          this.$message.success("删除成功");
          this.blog.commentcount--;
          this.getComment();
        }
      });
    },
    handlePageChange(page) {
      this.commentReq.page = page;
      this.getComment();
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("//at.alicdn.com/t/font_2804341_ncgv9nsirnk.css");
.detail {
  scroll-behavior: smooth;
  background-color: rgb(244, 245, 245);
  .detail-container {
    width: 76%;
    margin: 0 auto;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    background-color: rgb(244, 245, 245);
    //
    .contentFixed {
      position: fixed;
      top: 20%;
      left: 6%;
      width: 50px;
      height: 500px;
      box-sizing: border-box;
      div {
        &.like,
        &.comment,
        &.share,
        &.report {
          cursor: pointer;
          position: relative;
          width: 100%;
          height: 50px;
          margin-bottom: 20px;
          border-radius: 50%;
          text-align: center;
          background-color: #fff;
          line-height: 50px;
          box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.04);
          transition: 0.3s;
          i {
            font-weight: 500;
            font-size: 22px;
            color: #999;
          }
          span {
            position: absolute;
            top: 0;
            left: 75%;
          }
        }
        &:hover {
          box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
          i {
            color: #333;
          }
        }
      }
    }
    .contentLeft {
      background-color: #fff;
      width: 72%;
      // background-color: rgb(244, 245, 245);

      padding: 30px 0 0 0;
      border-radius: 5px;
      box-sizing: border-box;
      .contentDetail {
        background-color: #fff;
        padding: 0 30px;
        .title {
          font-size: 32px;
          font-weight: 600;
          line-height: 1.31;
          color: #252933;
        }
        .user-info {
          margin: 10px 0 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .left-info {
            display: flex;
            justify-content: space-between;
            .avatar {
              margin-right: 10px;
            }
            p {
              margin: 0;
              padding: 0;
              color: #515767;
              font-size: 14px;
            }
            .info-detail {
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              p.author {
                font-size: 15px;
              }
            }
          }
        }
      }
      .middle {
        width: 100%;
        height: 15px;
        background-color: rgb(244, 245, 245);
      }
      .footer {
        background-color: #fff;
        margin-bottom: 20px;
        padding: 30px;
        .commitTitle {
          font-size: 18px;
          line-height: 30px;
          font-weight: 600;
          color: #252933;
        }
        .list {
          margin-top: 20px;
        }
      }
    }
    .contentRight {
      width: 26%;
      // background-color: greenyellow;
      border-radius: 4px;
      // padding: 20px;
      box-sizing: border-box;
      .right-user {
        width: 100%;
        // height: 260px;
        background-color: #fff;
        // border: 1px solid #111;
        margin-bottom: 20px;
        padding: 20px;
        .right-user-info {
          display: flex;
          height: 90px;
          // background-color: teal;
          align-items: center;
          border-bottom: 1px solid #999;
          .avatar {
            margin-right: 15px;
          }
          p {
            padding: 0;
            margin: 0;
            line-height: 25px;
          }
        }
        .right-other-info {
          padding: 10px 0 0 0;
          div {
            // margin: 10px 0;
            display: flex;
            align-items: center;
            i {
              background-color: rgb(225, 239, 255);
              display: inline-block;
              width: 25px;
              height: 25px;
              line-height: 25px;
              border-radius: 50%;
              text-align: center;
              color: rgb(123, 185, 255);
              font-weight: 700;
              margin-right: 8px;
              font-size: 18px;
            }
            span {
              font-size: 22px;
              margin: -1px 4px 0 4px;
              color: #87d068;
            }
          }
        }
      }
      .catalogue {
        background-color: #fff;
        padding: 10px;
        // text-align: center;
        .text {
          // text-align: center;
          text-indent: 2px;
          font-size: 18px;
          color: #333;
        }
      }
    }
  }
}
</style>
