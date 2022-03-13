<template>
  <div class="layout">
    <div class="header">
      <!-- 头部插槽 -->
      <Header />
      <!-- 默认中间插槽 -->
    </div>
    <div class="middle">
      <slot></slot>
      <div id="components-back-top-demo-custom">
        <a-back-top class="one">
          <div class="ant-back-top-inner">
            <!-- <a-icon type="to-top" /> -->
            <i class="iconfont icon-huidaodingbu"></i>
          </div>
        </a-back-top>
        <!-- <a-back-top :visibilityHeight='0' @click="handleClick">
          <div class="ant-back-top-inner">
          <i class="iconfont icon-31wentifankui"></i>
          </div>
        </a-back-top> -->
        <div class="feedback">
          <FeedBack />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FeedBack from "../components/FeedBack";
import Header from "./components/Header";
export default {
  components: {
    Header,
    FeedBack,
  },
  methods: {
    handleClick() {
      console.log("点击了反馈");
    },
  },
};
</script>

<style lang="scss" scoped>
.layout {
  height: 100%;
  background-color: rgb(244, 245, 245);
}
.header {
  height: 60px;
  background-color: #fff;
}
.middle {
  height: calc(100% - 60px);
  background-color: rgb(244, 245, 245);
}
#components-back-top-demo-custom .ant-back-top.one {
  right: 30px;
  bottom: 100px;
}
#components-back-top-demo-custom .ant-back-top{
  cursor: pointer;
}
#components-back-top-demo-custom .ant-back-top-inner {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  line-height: 40px;
  // border-radius: 4px;
  // background-color: #8dbfe7;
  box-shadow: 0 2px 8px rgba(50, 50, 50, 0.04);
  background-color: #fff;
  border: 1px solid #f1f1f1;
  color: #909090;
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
// #components-back-top-demo-custom
.feedback {
  position: fixed;
  bottom: 52px;
  right: 30px;
  text-align: center;
}
</style>
