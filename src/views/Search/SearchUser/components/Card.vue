<template>
  <div class="card">
    <div class="content">
      <div class="left">
        <a-avatar v-if="!isSvg" :size="64" :src="avatar" />
        <div v-if="isSvg" class="svg" v-html="svg"></div>
      </div>
      <div class="info">
        <div class="author" v-html="formatAuthor(user.author)"></div>
        <div class="autograph">
          <i class="iconfont icon-qianming"></i>{{ user.UserInfo.autograph }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => {},
    },
    authorKey: {
      type: String,
      default: "",
    },
  },
  created() {
    console.log(this.user);
    this.formatAvatar(this.avatar);
  },
  data() {
    return {
      svg: "",
    };
  },
  computed: {
    avatar() {
      return this.user.UserInfo.avatar;
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
  methods: {
    formatAuthor(author) {
      const tempBigArr = author.split("");
      const tempSmall = this.authorKey.split("");
      const start = this.hasChild(tempBigArr, tempSmall);
      tempBigArr.splice(start + tempSmall.length, 0, "</span>");
      tempBigArr.splice(start, 0, '<span style="color:red">');
      return `<b>${tempBigArr.join("")}</b>`;
    },
    hasChild(big, small) {
      let abs = 0;
      for (let i = 0; i < big.length; i++) {
        let start = small[abs];
        if (big[i].toLowerCase() == start.toLowerCase()) {
          abs++;
        }
        if (abs == small.length) {
          return i - abs + 1;
        }
      }
    },
    formatAvatar(avatar) {
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
.card {
  border-bottom: 1px solid #f1f1f1;
  .svg {
    width: 64px;
    height: 64px;
  }
  .content {
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    .left {
      width: 5%;
    }
    .info {
      width: 93%;
      .author {
        font-size: 17px;
        font-weight: 700;
      }
    }
  }
}
</style>
