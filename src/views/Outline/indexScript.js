import Vue from 'vue'
<script type="text/x-template" id="anchored-heading-template">
  
</script>
export default Vue.component('outline',{
  template:'#anchored-heading-template',
  
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      outlineList: this.list,
      // listHtml: "",
    };
  },
})