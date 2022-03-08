import styles from './outline.module.scss'
export default {
  name: 'outline',
  data() {
    return {
      name: 'hello jsx vue.js',
      outlineList: this.list,
      html: ""
    }
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    list: {
      handler: function (newValue) {
        this.outlineList = newValue;
        this.html = this.renderH2(this.outlineList);
      },
      deep: true,
      immediate: false
    }
  },
  methods: {
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
      const strArr = []
      strArr.push(<a-anchor-link href={'#' + HList[0]["id"]} title={HList[0]["text"]}></a-anchor-link>)
      for (let i = 1; i < HList.length; i++) {
        let prev = 1
        let next = HNum[HList[i].tag];
        const temp = next - prev;
        if (temp === 0) {
          strArr.push(<a-anchor-link href={'#' + HList[i]["id"]} title={HList[i]["text"]}></a-anchor-link>)
        } else if (temp > 0) {
          let str = <a-anchor-link href={'#' + HList[i]["id"]} title={HList[i]["text"]}></a-anchor-link>
          let n = temp
          while (n > 0) {
            str = <a-anchor-link class={styles.linkContent}>{str}</a-anchor-link>
            n--
          }
          strArr.push(str);
        }
      }
      return strArr;
    }
  },
  render() {
    return (
      <div class={styles.outline}>
        <a-anchor class={styles.wapper}>{this.html} </a-anchor>
      </div>
    )
  }
}