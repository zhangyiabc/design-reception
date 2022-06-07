<template>
  <div class="notice-container">
    <Layout>
      <template>
        <div class="top">
          <a-affix class="topSearch" :offset-top="0">
            <a-tabs :style="{backgroundColor:'#fff',overflew:'hidden',height:'47px'}" default-active-key="1" @change="callback">
              <a-tab-pane key="1">
                <span slot="tab">
                  <!-- <a-icon type="apple" /> -->
                  <a-badge :count="userNoticeTotal" title="我的消息" :offset="[10, 0]">
                    <i class="iconfont icon icon-xiaoxi"></i>
                    我的消息
                  </a-badge>
                </span>
              </a-tab-pane>
              <a-tab-pane key="2">
                <span slot="tab">
                  <!-- 系统消息 -->
                    <a-badge :count="adminNoticeTotal" title="系统消息" :offset="[10, 0]">
                      <i class="iconfont icon icon-xiaoxi1"></i>
                      系统消息 
                    </a-badge>
                </span>
              </a-tab-pane>
            </a-tabs>
          </a-affix>
        </div>
        <div class="content">
          <UserNotice v-if="tab == 1" />
          <AdminNotice v-if="tab == 2" />
        </div>
      </template>
    </Layout>
  </div>
</template>

<script>
import UserNotice from './components/UserNotice/index.vue'
import AdminNotice from './components/AdminNotice/index.vue'
import Layout from "@/layout";
export default {
  components: {
    Layout,
    UserNotice,
    AdminNotice
  },
  computed: {
    userNoticeTotal(){
      return this.$store.getters.userNoticeTotal || 0
    },
    adminNoticeTotal() {
      return this.$store.getters.adminNoticeTotal || 0
    }
  },
  data(){
    return {
      tab:1
    }
  },
  methods: {
    callback(tab) {
      this.tab = tab
    },
  },
};
</script>

<style lang="scss" scoped>
.notice-container{
  padding-bottom: 30px;
  background-color: rgb(244, 245, 245);
}
.top{
  border: 1px solid #f1f1f1;
  height: 48px;
  background-color: #fff;
  .topSearch{
    background-color: #fff;

    margin: 0 auto;
    width: 64%;
    height: 100%;
    i.icon{
      margin-right: 3px;
    }
  }
}
.content {
  margin: 0 auto;
  margin-top: 12px;
  width: 64%;
  min-height:calc(100vh - 190px);
  background-color: #fff;
  margin-bottom: 30px;
}
</style>
