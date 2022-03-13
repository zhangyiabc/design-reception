<template>
  <div class="feedBack-container" @click="handleFeedBack">
    <a-tooltip>
      <template slot="title"> 反馈 </template>
      <i class="iconfont icon-31wentifankui"></i>
    </a-tooltip>
    <a-modal v-model="visible" title="感谢您提出宝贵的意见！" @ok="handleOk">
      <div class="feedBack">
        <p>欢迎您加上本网站作者的微信，进行问题反馈。</p>
        <p>您的宝贵意见会让<b>知识星球</b>变得越来越好！</p>
        <img :src="wxSrc" alt="">
      </div>
    </a-modal>
  </div>
</template>

<script>
const wxSrc = require('../../assets/wx.jpg')
export default {
  data(){
    return {
      visible:false,
      wxSrc
    }
  },
  methods:{
    handleFeedBack(){
      this.visible = true
      console.log('点击了反馈')
    },
    handleOk(){
      this.visible = false
    }
  }
};
</script>

<style lang="scss" scoped>
.feedBack-container {
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(50, 50, 50, 0.04);
  background-color: #fff;
  border: 1px solid #f1f1f1;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    box-shadow: 0 0 5px #ddd;
  }
  i {
    font-size: 20px;
    color: #007fff;
  }

}
.feedBack{
  text-align: center;
  p{
    padding: 0;
    margin: 0;
    margin-top: 10px;
    line-height: 20px;
    b{
      margin: 0 2px;
    }
  }
  img{
    width: 60%;
  }
}
</style>
