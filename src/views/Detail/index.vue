<template>
  <Layout>
    <template>
      <div class="detail">
        <div class="detail-container">
          <div class="contentFixed">
            position：fixed；固定定位 点赞量 评论量 转发(复制url + title +
            自定义到剪贴板) 举报
          </div>
          <div class="contentLeft">
            <div class="contentDetail">
              <h1 class="title">{{blog.title}}</h1>
              <div class="user-info">
                <div class="left-info">
                  <div class="avatar">
                    <a-avatar :size="64" icon="user" :src="avatar" />
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
            <div class="footer">文章的评论列表</div>
          </div>
          <div class="contentRight">
            <div class="right-user">
              <div class="right-user-info">
                <div class="avatar">
                  <a-avatar :size="60" :src="avatar" />
                </div>
                <div class="avatar-right">
                  <p>{{ blog.User.author }}</p>
                  <p>{{ blog.User.UserInfo.autograph }}</p>
                </div>
              </div>
              <div class="right-other-info">
                <div class="like">
                  <i class="el-icon-magic-stick" />
                  文章被点赞<span>{{ blog.likecount }}</span
                  >次
                </div>
                <div class="view">
                  <i class="el-icon-view" /> 文章被浏览<span>0</span>次
                </div>
                <div class="rank">
                  <i class="el-icon-trophy" /> 该作者共发布<span>{{
                    blog.User.count
                  }}</span
                  >篇文章
                </div>
              </div>
            </div>
            <div class="catalogue">
              <div class="text">目录</div>
              <Outline :list="handList" />
            </div>
          </div>
        </div>
      </div>
    </template>
  </Layout>
</template>

<script>
import Layout from "@/layout";
import Outline from "../Outline/indexJSX.jsx";
import { getItem } from "@/utils/auth";
import { getArticleDetail } from "@/apis/article";
import moment from "moment";
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
  },

  computed: {
    blogList() {
      return this.$store.getters.blogList;
    },
    tag() {
      return this.blog.Label.tag;
    },
    avatar() {
      return this.blog.User.UserInfo.avatar;
    },
  },
  created() {
    this.articleId = this.$route.params.id;
    if (this.blogList.length > 0) {
      this.blog = this.getNowArticle(this.blogList, this.articleId);
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
        }
      } else {
        this.getArticle(this.articleId);
      }
    }
  },
  mounted() {
    this.handList = this.getElement(html2json(this.blog.content).child);
  },
  data() {
    return {
      articleId: "",
      blog: "",
      handList: [],
    };
  },
  methods: {
    getNowArticle(arr, id) {
      for (const item of arr) {
        if (item.id == id) {
          return item;
        }
      }
      return null;
    },
    getArticle(id) {
      // 掉接口获取文章详情
      getArticleDetail(id).then((res) => {
        this.blog = res.data;
        this.handList = this.getElement(html2json(this.blog.content).child);
      });
    },
    getElement(arr) {
      if (arr.length === 1) {
        arr = arr[0]["child"];
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
      console.log(newArr);
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
  },
};
</script>

<style lang="scss" scoped>
.detail {
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
      left: 30px;
      width: 80px;
      height: 500px;
      background-color: red;
      box-sizing: border-box;
      padding: 20px 10px;
    }
    .contentLeft {
      background-color: #fff;
      width: 72%;
      // background-color: rgb(244, 245, 245);

      padding: 30px 0;
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
        height: 250px;
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
              margin-right: 5px;
            }
            span {
              font-size: 22px;
              margin: 0 2px;
              color: aqua;
            }
          }
        }
      }
      .catalogue{
        background-color: #fff;
        padding: 10px;
        // text-align: center;
        .text{
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
