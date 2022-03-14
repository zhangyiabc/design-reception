<template>
  <div class="wrtiteComment">
    <div class="left">
      <a-avatar v-if="!isSvg" :size="64" :src="avatar" />
      <div
        v-if="isSvg"
        :style="{ width: '64px', height: '64px' }"
        v-html="svg"
      ></div>
    </div>
    <div class="right">
      <a-textarea
        placeholder="输入评论 (Enter换行)"
        :auto-size="{ minRows: 3, maxRows: 6 }"
        :maxLength="100"
        :style="{ backgroundColor: 'rgb(244, 245, 245)' }"
        v-model="commentText"
        @blur="handleBlur"
        @focus="showBtn = true"
      />
      <a-button
        :loading="loading"
        v-if="showBtn"
        class="btn"
        type="primary"
        @click="handlePublishComment"
      >
        发布评论
      </a-button>
    </div>
  </div>
</template>

<script>
import { getItem } from "@/utils/auth";

export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
      default: "",
    },
  },
  computed: {
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
  watch: {
    loading: {
      handler: function (oldValue, newValue) {
        if (oldValue == false && newValue == true) {
          this.commentText = "";
        }
      },
      immediate: false,
    },
  },
  data() {
    return {
      svg: "",
      commentText: "",
      showBtn: false,
    };
  },
  created() {
    this.formatAvatar(this.avatar);
  },
  methods: {
    handlePublishComment() {
      this.$emit("handlePublishComment", this.commentText);
    },
    handleBlur() {
      if (this.commentText.length > 0) {
        this.showBtn = true;
      } else {
        this.showBtn = false;
      }
    },
    formatAvatar(avatar) {
      if (!this.isSvg) {
        return;
      }
      const svg = getItem("svg");
      if (svg) {
        this.svg = svg;
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
.wrtiteComment {
  height: 74px;
  width: 100%;
  display: flex;
  .left {
    width: 7%;
    margin-right: 20px;
  }
  .right {
    width: 90%;
    // display: flex;
    // flex-direction:column;
    position: relative;
    .btn {
      position: absolute;
      top: 105%;
      right: 0;
      // width: 100px;
    }
  }
}
</style>
