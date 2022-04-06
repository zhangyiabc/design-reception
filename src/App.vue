<template>
  <div id="app">
    <a-config-provider :locale="locale">
      <router-view />
    </a-config-provider>
  </div>
</template>
<script>
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
export default {
  data() {
    return {
      locale: zhCN,
    };
  },
};
</script>
<style lang="scss">

@font-face {
  font-family: "ali";
  src: url("./assets/font/ali.ttf");
}
@font-face {
  font-family: '演示秋鸿楷体';
  src: url('./assets/font/ysqhk.ttf');
}
// @font-face {
//   font-family: '思源宋体';
//   src: url('./assets/font/syst.otf');
// }
@font-face {
  font-family: '思源黑体';
  src: url('./assets/font/syht.ttf');
}

html,
body {
  width: 100%;
  margin: 0;
  padding: 0;
}
#app {
  font-family:'ali', '思源黑体', Avenir, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  height: 100%;
}
</style>
