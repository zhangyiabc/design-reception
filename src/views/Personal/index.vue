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
                          <a-col :span="2">
                            <a-button type="primary" html-type="submit">
                              查询
                            </a-button>
                          </a-col>
                        </a-row>
                      </a-form>
                    </div>
                    <div v-if="!blogLoading" class="list">
                      <template v-for="blog of blogList">
                        <BlogCard
                          :key="blog.id"
                          :blog="blog"
                          @handleDeleteClick="handleDeleteClick"
                        />
                      </template>
                    </div>
                    <div class="loading" v-if="blogLoading">
                      <a-spin class="spin" size="large" tip="玩命加载中..." />
                    </div>
                    <div class="footer">
                      <a-pagination
                        size="small"
                        :defaultPageSize="5"
                        :total="getBlogReq.total"
                        @change="handleBlogPageChange"
                      />
                    </div>
                  </div>
                </a-tab-pane>
                <a-tab-pane key="2">
                  <span slot="tab">
                    <a-icon type="like" />
                    我的推荐
                  </span>
                  <div class="recommend">
                    <div class="list" v-if="!likeLoading">
                      <template v-for="like of likeList">
                        <LikeCard :like="like" :key="like.id" />
                      </template>
                    </div>
                    <div class="loading" v-if="likeLoading">
                      <a-spin class="spin" size="large" tip="玩命加载中..." />
                    </div>
                    <div class="footer">
                      <a-pagination
                        size="small"
                        :defaultPageSize="5"
                        :total="getLikeReq.total"
                        @change="handleLikePageChange"
                      />
                    </div>
                  </div>
                </a-tab-pane>
              </a-tabs>
            </div>
          </div>
          <div class="contentRight">
            <div class="achievement">成就</div>
          </div>
        </div>
      </template>
    </Layout>
  </div>
</template>

<script>
/**
 * 个人页面 可以展示个人发布过的文章
 * 可以按条件查询被驳回的文章、审核通过的文章
 */
import Layout from "@/layout";
import BlogCard from "./Card/BlogCard.vue";
import LikeCard from "./Card/LikeCard.vue";
import { mapGetters } from "vuex";
import UserHeader from "@/components/UserHeader";
import { getAllArticle, deleteArticle } from "@/apis/article";
import { getItem } from "@/utils/auth";
export default {
  components: {
    Layout,
    UserHeader,
    BlogCard,
    LikeCard,
  },
  computed: {
    ...mapGetters({
      UserInfo: "info",
    }),
  },
  data() {
    return {
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
    };
  },
  created() {
    this.getMyArticle();
    // this.initLike();
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
    },
    handleModify() {
      console.log("点击了修改个人信息");
    },
    getMyArticle() {
      this.blogLoading = true
      this.getBlogReq.UserId = this.UserInfo.id;
      console.log(this.getBlogReq.UserId);
      if (!this.getBlogReq.UserId) {
        this.getBlogReq.UserId = +getItem("id");
      }
      console.log(this.getBlogReq.UserId);
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
      const temp = this.$store.getters.likeList;
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
  width: 56%;
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
  .contentLeft {
    width: 74%;
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
    width: 24%;
    background-color: palegoldenrod;
  }
  .loading{
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
