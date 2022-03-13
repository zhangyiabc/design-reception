<template>
  <div class="orderCard">
    <div class="content">
      <div class="left">
        <a-avatar v-if="!isSvg" :size="45" icon="user" :src="avatar" />
        <div
          v-if="isSvg"
          :style="{ width: '45px', height: '45px' }"
          v-html="svg"
        ></div>
      </div>
      <div class="middle">
        <div class="author">{{ Info.author }}</div>
        <div class="autograph">{{Info.UserInfo.autograph}}</div>
      </div>
      <div class="right">
        <p>发布<span>{{Info.count}}</span>篇文章</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    Info: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      svg: "",
    };
  },
  computed: {
    avatar() {
      return this.Info.UserInfo.avatar;
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
    this.formatAvatar(this.avatar);
    // console.log(this.Info);
  },
  methods: {
    formatAvatar(avatar) {
      if (!this.isSvg) {
        return;
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
.orderCard {
  padding: 10px;
  box-sizing: border-box;
  width: 100%;
  .content {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .left {
      width: 18%;
    }
    .middle {
      width: 44%;
      .author {
        font-size: 15px;
        color: #333;
      }
      .autograph{
        color: #999;
        font-size: 13px;
      }
    }
    .right{
      flex: 1 1 auto;
      p{
        margin-top: 10px;
        line-height: 20px;
        span{
          margin: 0 5px;
          color: rgb(81, 131, 113);
          font-size: 16px;
        }
      }
    }
  }
}
</style>
