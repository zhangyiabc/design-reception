<template>
  <div class="likeCard">
    <div class="content">
      <div class="left" v-if="like.cover">
        <div class="cover">
          <img :src="like.cover" alt="" />
        </div>
      </div>
      <div class="right" @click="handleClick">
        <div class="title">{{ like.title }}</div>
        <div class="tools">
          <span class="time">{{ like.createdAt | formatTime }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { removeItem } from "@/utils/auth";
import moment from "moment";
export default {
  filters: {
    formatTime(time) {
      const now = moment().utc();
      // console.log(now.from(moment(time)));
      // return moment.utc(time).format("yyyy年MM月DD日 h:mm");
      return moment.utc(time).from(now);
    },
  },
  props: {
    like: {
      type: Object,
      default: () => {},
    },
  },
  created() {

  },
  methods: {
    handleClick() {
      removeItem("bloglist");
      this.$router.push({
        name: "Detail",
        params: {
          id: this.like.ArticleId,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.likeCard {
  width: 100%;
  padding: 10px;
  .content {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
    border-bottom: 1px #e3e5e7 solid;
    .left {
      width: 17%;
      .cover {
        img {
          height: 50px;
        }
      }
    }
    .right {
      width: 80%;
      cursor: pointer;
      .title {
        font-size: 20px;
        color: #1d2129;
      }
      .tools {
        display: flex;
        justify-content: flex-end;
        color: #86909c;
        font-size: 13px;
      }
    }
  }
}
</style>
