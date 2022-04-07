<template>
  <div class="main">
    <Layout>
      <template>
        <div class="persional-container">
          <div class="contentLeft">
            <div class="userInfo">
              <UserHeader
                v-if="UserInfo.id"
                :isPerson="true"
                :info="UserInfo"
                @handleModify="handleModify"
              />
            </div>
            <div class="tabHeader">
              <a-tabs default-active-key="1">
                <a-tab-pane key="1">
                  <span slot="tab">
                    <a-icon type="read" />
                    文章
                  </span>
                  <div class="article">
                    <div class="search">
                      <a-form
                        :form="form"
                        :wrapper-col="{ span: 18 }"
                        @submit="handleSubmit"
                        style="height: 100%"
                      >
                        <a-row
                          type="flex"
                          align="middle"
                          justify="end"
                          style="height: 100%"
                        >
                          <a-col :span="6">
                            <a-form-item
                              :labelCol="{ span: 12 }"
                              :style="{ marginBottom: 0 }"
                            >
                              <a-input
                                v-decorator="['title', {}]"
                                placeholder="输入文章标题筛选"
                              />
                            </a-form-item>
                          </a-col>
                          <a-col :span="6">
                            <a-form-item
                              :labelCol="{ span: 12 }"
                              :style="{ marginBottom: 0 }"
                            >
                              <a-select
                                v-decorator="['review']"
                                placeholder="请选择审核状态"
                                @change="handleSelectChange"
                              >
                                <a-select-option value="waiting">
                                  审核中
                                </a-select-option>
                                <a-select-option value="success">
                                  审核通过
                                </a-select-option>
                                <a-select-option value="refuse">
                                  审核未通过
                                </a-select-option>
                              </a-select>
                            </a-form-item>
                          </a-col>
                          <a-col :span="3">
                            <a-button type="primary" html-type="submit">
                              查询
                            </a-button>
                          </a-col>
                        </a-row>
                      </a-form>
                    </div>
                    <div v-if="!blogLoading">
                      <div v-if="getBlogReq.total == 0" class="noData">
                        <a-empty
                          :imageStyle="{ height: '200px' }"
                          :image="imgSrc"
                        />
                      </div>
                      <div class="list" v-else>
                        <template v-for="blog of blogList">
                          <BlogCard
                            :key="blog.id"
                            :blog="blog"
                            @handleDeleteClick="handleDeleteClick"
                          />
                        </template>
                        <div class="footer">
                          <a-pagination
                            size="small"
                            :defaultPageSize="5"
                            :current="getBlogReq.page"
                            :total="getBlogReq.total"
                            @change="handleBlogPageChange"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="loading" v-if="blogLoading">
                      <a-spin class="spin" size="large" tip="玩命加载中..." />
                    </div>
                  </div>
                </a-tab-pane>
                <a-tab-pane key="2">
                  <span slot="tab">
                    <a-icon type="like" />
                    我的推荐
                  </span>
                  <div class="recommend">
                    <div v-if="!likeLoading">
                      <div class="list" v-if="likeList.length > 0">
                        <template v-for="like of likeList">
                          <LikeCard :like="like" :key="like.id" />
                        </template>
                        <div class="footer">
                          <a-pagination
                            size="small"
                            :current="getLikeReq.page"
                            :defaultPageSize="5"
                            :total="getLikeReq.total"
                            @change="handleLikePageChange"
                          />
                        </div>
                      </div>
                      <div v-else class="noData">
                        <a-empty
                          :imageStyle="{ height: '200px' }"
                          :image="imgSrc"
                        />
                      </div>
                    </div>
                    <div class="loading" v-if="likeLoading">
                      <a-spin class="spin" size="large" tip="玩命加载中..." />
                    </div>
                  </div>
                </a-tab-pane>
              </a-tabs>
            </div>
          </div>
          <div class="contentRight">
            <div class="title">我的个人信息</div>
            <div class="form">
              <div class="tel">
                <span>电 话：</span>{{ UserInfo.UserInfo.tel }}
              </div>
              <div class="email">
                <span>邮 箱：</span>{{ UserInfo.UserInfo.email }}
              </div>
              <div class="sex">
                <span>性 别：</span>{{ UserInfo.UserInfo.sex | formatSex }}
              </div>
              <div class="join">
                <span>加 入 时 间：</span
                >{{ UserInfo.UserInfo.createdAt | formatTime }}
              </div>
            </div>
          </div>
        </div>
      </template>
    </Layout>
    <a-modal
      v-model="visible"
      title="修改个人信息"
      @ok="handleOk"
      :footer="null"
    >
      <Modify v-if="visible" :info="modifyInfo" @handleModify="handleModifyOff" />
    </a-modal>
  </div>
</template>

<script>
/**
 * 个人页面 可以展示个人发布过的文章
 * 可以按条件查询被驳回的文章、审核通过的文章
 */
const imgSrc = require("@/assets/empty.png");
import Layout from "@/layout";
import Modify from "./Modify";
import BlogCard from "./Card/BlogCard.vue";
import LikeCard from "./Card/LikeCard.vue";
import { mapGetters } from "vuex";
import UserHeader from "@/components/UserHeader";
import { getAllArticle, deleteArticle } from "@/apis/article";
import { getItem } from "@/utils/auth";
import moment from "moment";
export default {
  filters: {
    formatSex(sex) {
      return sex == "1" ? "男" : "女";
    },
    formatTime(time) {
      return moment.utc(time).format("yyyy-MM-DD h:mm:ss");
    },
  },
  components: {
    Layout,
    UserHeader,
    BlogCard,
    LikeCard,
    Modify,
  },
  computed: {
    ...mapGetters({
      UserInfo: "info",
    }),
  },
  data() {
    return {
      visible: false,
      imgSrc,
      form: this.$form.createForm(this, { name: "coordinated" }),
      blogList: [],
      allLikeList: [],
      likeList: [],
      blogLoading: false,
      likeLoading: false,
      getBlogReq: {
        title: "",
        page: 1,
        size: 5,
        review: "all",
        UserId: "",
        total: 0,
      },

      getLikeReq: {
        page: 1,
        size: 5,
        userId: "",
        total: 0,
      },
      modifyInfo: {
        
      },
    };
  },
  created() {
    this.getMyArticle();
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.getBlogReq = {
            ...this.getBlogReq,
            ...values,
          };
          this.getMyArticle();
        }
      });
    },
    handleSelectChange(value) {
      console.log(value);
      this.getBlogReq.page = 1;
    },
    handleModify() {
      // 设置modifyInfo的属性
      this.modifyInfo = {
        author: this.UserInfo.author,
        sex: this.UserInfo.UserInfo.sex,
        tel: this.UserInfo.UserInfo.tel,
        email: this.UserInfo.UserInfo.email,
        autograph: this.UserInfo.UserInfo.autograph,
        username: this.UserInfo.username,
        id: this.UserInfo.id,
        avatar: this.UserInfo.UserInfo.avatar,
        password:"*********"
      };
      this.visible = true;
      // console.log("点击了修改个人信息");
    },
    handleModifyOff(){
      this.visible = false
      this.$store.dispatch('user/whoami')
    },
    handleOk() {
      this.visible = false;
    },
    getMyArticle() {
      this.blogLoading = true;
      this.getBlogReq.UserId = this.UserInfo.id;
      if (!this.getBlogReq.UserId) {
        this.getBlogReq.UserId = +getItem("id");
      }
      getAllArticle({
        ...this.getBlogReq,
      })
        .then((res) => {
          this.blogList = res.data.data;
          this.getBlogReq.total = res.data.total;
        })
        .finally(() => {
          this.initLike();
          this.blogLoading = false;
        });
    },
    initLike() {
      this.likeLoading = true;
      const temp = this.$store.getters.likeList || [];
      if (temp.length == 0) {
        this.likeLoading = false;
        return;
      }
      this.getLikeReq.total = temp.length;
      for (let i = 0; i < temp.length; i++) {
        if (i % 5 == 0) {
          this.allLikeList.push([]);
        }
        let index = parseInt(i / 5);
        // console.log(index)
        this.allLikeList[index].push(temp[i]);
      }
      this.getNowLike();
    },
    handleBlogPageChange(page) {
      this.getBlogReq.page = page;
      this.getMyArticle();
    },
    handleLikePageChange(page) {
      this.getLikeReq.page = page;
      this.getNowLike();
    },
    getNowLike() {
      this.likeLoading = false;
      this.likeList = this.allLikeList[this.getLikeReq.page - 1];
    },
    handleDeleteClick(id) {
      deleteArticle({ id }).then((res) => {
        if (res.code === "200") {
          this.$message.success("删除成功");
          this.getBlogReq.page = 1;
          this.getMyArticle();
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.persional-container {
  width: 65%;
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
  .contentLeft {
    width: 70%;
    .userInfo {
      background-color: #fff;
    }
    .tabHeader {
      background-color: #fff;
      margin-top: 15px;
      .article,
      .recommend {
        padding: 0 10px 10px;
        .footer {
          display: flex;
          justify-content: flex-end;
        }
      }
      .article {
        .search {
          height: 40px;
        }
        .list {
          margin-top: 10px;
        }
        .footer {
          display: flex;
          justify-content: flex-end;
        }
      }
    }
  }
  .contentRight {
    width: 28%;
    height: 300px;
    background-color: #fff;
    padding: 20px 10px;
    border-radius: 4px;
    .title {
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 10px;
    }
    div {
      margin-bottom: 10px;
    }
  }
  .loading {
    display: flex;
    margin-top: 30px;
    justify-content: center;
  }
}
.main {
  background-color: rgb(244, 245, 245);
  padding-bottom: 30px;
}
</style>
