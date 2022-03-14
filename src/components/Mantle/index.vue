<template>
  <div class="mantle-container">
    <div class="content" :style="{ width: width+'px' }">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      default: 350,
    },
  },
};
</script>

<style lang="scss" scoped>
.mantle-container {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  transition: 0.3s ease-out;
  .content {
    position: relative;
    transition: 0.3s ease-out;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    // height: 180px;
    padding: 20px;
    box-sizing: border-box;
  }
}
</style>
