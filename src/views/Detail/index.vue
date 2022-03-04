<template>
  <div class="detail-container"></div>
</template>

<script>
import {getItem} from '@/utils/auth'
import {getArticleDetail} from '@/apis/article'
export default {
  computed:{
    blogList(){
      return this.$store.getters.blogList
    }
  },
  created() {
    this.articleId = this.$route.params.id;
    if(this.blogList.length > 0){
      this.blog = this.getNowArticle(this.blogList,this.articleId)
    }else{
      // 尝试从localStorage中读取数据，如果有拿出来，没有的话掉接口
      const tempList = JSON.parse(getItem('bloglist'))
      console.log(tempList)
      if(tempList && tempList.length > 0){
        const res = this.getNowArticle(tempList,this.articleId)
        // 判断能不能从localStorage拿到数据，拿不到就掉接口
        if(!res){
          this.getArticle(this.articleId)
        }else{
          this.blog = res
        }
      }else{
        this.getArticle(this.articleId)
      }
    }
  },
  data() {
    return {
      articleId: "",
      blog:''
    };
  },
  methods: {
    getNowArticle(arr, id) {
      for (const item of arr) {
        if (item.id == id) {
          return item;
        }
      }
      return null;
    },
    getArticle(id){
      // 掉接口获取文章详情
      getArticleDetail(id).then(res => {
        this.blog = res.data
        console.log(this.blog)
      })
    }
  },
};
</script>

<style>
</style>