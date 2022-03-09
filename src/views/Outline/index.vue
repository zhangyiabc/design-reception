<template>
  <div class="outline">
    <ul>
      <div v-html="renderH(outlineList)"></div>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      outlineList: this.list,
      listHtml: "",
    };
  },
  watch: {
    list: {
      handler(newValue) {
        this.outlineList = newValue;
        this.listHtml = this.renderH(this.outlineList);
      },
      deep: true,
    },
  },
  created() {
    // console.log(this.list);
    this.listHtml = this.renderH(this.outlineList);
  },
  methods: {
    initCatalogue(list) {
      console.log(list);
    },

    renderH(HList) {
      if (HList.length == 0) {
        return "";
      }
      const HNum = {
        H1: 1,
        H2: 2,
        H3: 3,
        H4: 4,
        H5: 5,
        H6: 6,
      };
      // console.log(HList)
      let str = `<li><a href="#${HList[0]["id"]}">${HList[0]["text"]}</a></li>`;
      for (let i = 1; i < HList.length; i++) {
        let prev = HNum[HList[i - 1].tag];
        let next = HNum[HList[i].tag];
        const temp = next - prev;
        console.log(temp);
        if (temp === 0) {
          str += `<li><a href="#${HList[i]["id"]}">${HList[i]["text"]}</a></li>`;
        } else if (temp > 0) {
          let n = temp;
          while (n > 0) {
            str += `<ul>`;
            n--;
          }
          str += `<li><a href='#${HList[i]["id"]}'>${HList[i]["text"]}</a></li>`;
        } else if (temp < 0) {
          let n = temp;
          while (n < 0) {
            str += `</ul>`;
            n++;
          }
          str += `<li><a herf="#${HList[i]["id"]}">${HList[i]["text"]}</a></li>`;
        }
      }
      return str;
    },
    renderH2(HList) {
      if (HList.length == 0) {
        return "";
      }
      const HNum = {
        H1: 1,
        H2: 2,
        H3: 3,
        H4: 4,
        H5: 5,
        H6: 6,
      };
      // console.log(HList)
      let str = `<a-anchor-link href="#${HList[0]["id"]}" title='${HList[0]["text"]}'></a-anchor-link>`;
      for (let i = 1; i < HList.length; i++) {
        let prev = HNum[HList[i - 1].tag];
        let next = HNum[HList[i].tag];
        const temp = next - prev;
        console.log(temp);
        if (temp === 0) {
          str += `<a-anchor-link href="#${HList[i]["id"]}" title='${HList[i]["text"]}'></a-anchor-link>`;
        } else if (temp > 0) {
          let n = temp;
          while (n > 0) {
            str += `<a-anchor-link>`;
            n--;
          }
          str += `<a-anchor-link href="#${HList[i]["id"]}" title='${HList[i]["text"]}'></a-anchor-link>`;
        } else if (temp < 0) {
          let n = temp;
          while (n < 0) {
            str += `</a-anchor-link>`;
            n++;
          }
          str += `<a-anchor-link href="#${HList[i]["id"]}" title='${HList[i]["text"]}'></a-anchor-link>`;
        }
      }
      return str;
    },
  },
};
</script>

<style lang="scss" scoped>
.outline {
  padding: 0 15px;
  // background-color: tan;
  ::v-deep ul {
    list-style: none;
    padding-left: 12px;
  }
  ::v-deep li {
    list-style: none;
    line-height: 25px;
    padding: 0 5px;
    font-size: 15px;
    margin: 2px 0;
    a {
      color: #999;
    }
  }
}
</style>
