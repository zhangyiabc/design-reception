<template>
  <div class="wrtiteComment">
    <div class="left">
      <a-avatar :size="64" :src="avatar" />
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
export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    avatar:{
      type:String,
      default:''
    }
  },
  watch: {
    loading: {
      handler: function (oldValue,newValue) {
        if(oldValue == false && newValue == true){
          this.commentText = ''
        }
      },
      immediate: false,
    },
  },
  data() {
    return {
      commentText: "",
      showBtn: false,
    };
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
