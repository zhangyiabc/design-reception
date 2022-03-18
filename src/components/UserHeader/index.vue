<template>
  <div class="userHeader">
    <div class="top">
      <div class="headerLeft">
        <a-avatar v-if="!isSvg" :size="90" icon="user" :src="info.UserInfo.avatar" />
        <div v-if="isSvg" :style="{width:'90px',height:'90px'}" v-html="svg"></div>
      </div>
      <div class="headerRight">
        <div class="infoRight">
          <div class="name">{{ info.author }}</div>
          <div class="autograph">
            <i class="iconfont icon-qianming"></i>{{ info.UserInfo.autograph }}
          </div>
        </div>
        <a-button
          class="modifyBtn"
          v-if="isPerson"
          size="large"
          @click="handleModify"
        >
          修改个人资料
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 传入是不是个人的信息（个人信息可以编辑个人资料，不是不能）
 * 点击个人资料，抛出点击事件
 */
import {getItem} from '@/utils/auth'
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
  data(){
    return {
      svg:''
    }
  },
  computed: {
    avatar() {
      return this.info.UserInfo.avatar;
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
    // console.log(this.info);
    this.formatAvatar(this.avatar);
  },
  methods: {
    handleModify() {
      this.$emit("handleModify");
    },
    formatAvatar(avatar) {
      if(!this.isSvg){
        return 
      }
      const svg = getItem('svg')
      if(svg){
        this.svg = svg
        return 
      }
      fetch(avatar)
        .then((res) => res.text())
        .then((svg) => {
          this.svg = svg;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("//at.alicdn.com/t/font_2804341_big5hs3d5cj.css");
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
          color: #72777b;
          i {
            margin-right: 5px;
          }
        }
      }
      .modifyBtn {
        position: absolute;
        top: 50px;
        right: 0;
      }
    }
  }
}
</style>
