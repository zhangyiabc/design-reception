<template>
  <div id="app">
    <a-config-provider :locale="locale">
    <router-view />
    </a-config-provider>
  </div>
</template>
<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
export default {
  data(){
    return {
       locale: zhCN,
    }
  }
}
</script>
<style lang="scss">
html,
body {
  width: 100%;
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  height: 100%;
}
</style>
