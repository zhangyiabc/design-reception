<template>
  <div class="commentList">
    <template v-for="comment of commentList">
      <CommentCard
        :comment="comment"
        :blog="blog"
        :key="comment.id"
        @handleDelete="handleDelete"
      />
      <!-- 页码 -->
    </template>
    <div class="page">
      <a-pagination size="small" hideOnSinglePage :pageSize="5" :total="total" @change="handlePageChange" />
    </div>
  </div>
</template>

<script>
import CommentCard from "./CommentCard.vue";
export default {
  props: {
    commentList: {
      type: Array,
      default: () => [],
    },
    blog: {
      type: Object,
      default: () => {},
    },
    total:{
      type:Number,
      default:0
    }
  },
  components: {
    CommentCard,
  },
  created() {
    // console.log(this.commentList)
  },
  methods: {
    handleDelete(obj) {
      this.$emit("handleDelete", obj);
    },
    handlePageChange(page){
      // console.log(page)
      this.$emit('handlePageChange',page)
    }
  },
};
</script>

<style lang="scss" scoped>
.page {
  margin: 20px;
  display: flex;
  flex-direction:row-reverse;
}
</style>
