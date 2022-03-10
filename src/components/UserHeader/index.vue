<template>
  <div class="userHeader">
    <div class="top">
      <div class="headerLeft">
        <a-avatar :size="90" icon="user" :src="info.UserInfo.avatar" />
      </div>
      <div class="headerRight">
        <div class="infoRight">
          <div class="name">{{ info.author }}</div>
          <div class="autograph">
            <i class="iconfont icon-qianming"></i>{{ info.UserInfo.autograph }}
          </div>
        </div>
        <a-button class="modifyBtn" v-if="isPerson" size="large" @click="handleModify"> 修改个人资料 </a-button>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 传入是不是个人的信息（个人信息可以编辑个人资料，不是不能）
 * 点击个人资料，抛出点击事件
 */
export default {
  props: {
    isPerson: {
      type: Boolean,
      default: false,
    },
    info: {
      type: Object,
      default: () => {},
    },
  },
  created() {
    // console.log(this.info);
  },
  methods:{
    handleModify(){
      this.$emit('handleModify')
    }
  }
};
</script>

<style lang="scss" scoped>
@import url("//at.alicdn.com/t/font_2804341_ncgv9nsirnk.css");
.userHeader {
  padding: 30px;
  .top {
    display: flex;
    justify-content: space-between;
    
    border-bottom: 1px solid #e4e6eb;
    padding-bottom: 15px;
    .headerLeft {
      width: 15%;
    }
    .headerRight {
      width: 83%;
      position: relative;
      .infoRight {
        .name {
          font-size: 26px;
          color: #333;
          font-weight: 700;
          margin-bottom: 10px;
        }
        .autograph {
          color: #72777b;;
          i {
            margin-right: 5px;
          }
        }
      }
      .modifyBtn{
        position: absolute;
        top: 50px;
        right: 0;
      }
    }
  }
}
</style>
