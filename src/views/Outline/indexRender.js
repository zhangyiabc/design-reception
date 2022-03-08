import Vue from 'vue'
function renderH(HList) {
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
  let str = `<a-anchor-link href="#${HList[0]["id"]}" title='${HList[0]["text"]}'></a-anchor-link>`;
  for (let i = 1; i < HList.length; i++) {
    let prev = HNum[HList[i - 1].tag];
    let next = HNum[HList[i].tag];
    const temp = next - prev;
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
  console.log(str);
  return str;
}
renderH([])


const renderHead = (createElement, list) => {
  const HNum = {
    H1: 1,
    H2: 2,
    H3: 3,
    H4: 4,
    H5: 5,
    H6: 6,
  };
  if (list.length == 0) {
    return list
  }
  const newOptions = []
  // let ALinkChild = []
  newOptions.push(
    ['a-anchor-link',
      {
        attrs: {
          href: '#' + list[0]['id'],
          title: list[0]['text']
        },
      },
      []
    ]
  )
  for (let i = 1; i < list.length; i++) {
    let prev = HNum[list[i - 1].tag];
    let next = HNum[list[i].tag];
    const temp = next - prev;
    if (temp === 0) {
      newOptions.push(
        [
          'a-anchor-link',
          {
            attrs: {
              href: '#' + list[0]['id'],
              title: list[0]['text']
            },
          },
          []
        ]
      )
    } else if (temp > 0) {
      // let n = temp
      for(let i = 0; i< temp; i++){
        //
      }
    }
  }
  return newOptions
}

export default Vue.component('outline', {
  data() {
    return {
      name: 'hello vue.js',
      outlineList: this.list,
    }
  },
  render(createElement) {
    var self = this

    return createElement(
      'div',
      {
        'class': 'outline',
      },
      [
        createElement('a-anchor', {}, renderHead(createElement, self.list))
      ]

    )
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  }
})




// function Node(name, attr, child) {
//   this.name = name;
//   this.attr = attr;
//   this.child = child
// }



// const createChild = (option) => {
//   var node = new Node('a-anchor-link', {
//     attr: {
//       href: "#" + option.id,
//       title: option.text
//     }
//   }, [])
//   return node
// }
// const renderNode = (createElement, list) => {
//   const HNum = {
//     H1: 1,
//     H2: 2,
//     H3: 3,
//     H4: 4,
//     H5: 5,
//     H6: 6,
//   };
//   if (list.length == 0) {
//     return list
//   }
//   var node = new Node('a-anchor', {}, [])

//   for (let i = 1; i < list.length; i++) {
//     let prev = HNum[list[i - 1].tag];
//     let next = HNum[list[i].tag];
//     const temp = next - prev;
//     if (temp === 0) {
//       node.child.push(createChild({ id: list[i]['id'], text: list[i]['text'] }))
      
//     } else if (temp > 0) {
//       // let n = temp;
//       //   while(n> 0){
//       //     ALinkChild.push()
//       //   }
//       //   newOptions[i - 1] = createElement()
//     }
//   }


//   // const newOptions = []
//   // // let ALinkChild = []
//   // newOptions.push(
//   //   ['a-anchor-link',
//   //     {
//   //       attrs: {
//   //         href: '#' + list[0]['id'],
//   //         title: list[0]['text']
//   //       },
//   //     },
//   //     []
//   //   ]
//   // )
//   // for (let i = 1; i < list.length; i++) {
//   //   let prev = HNum[list[i - 1].tag];
//   //   let next = HNum[list[i].tag];
//   //   const temp = next - prev;
//   //   if (temp === 0) {
//   //     newOptions.push(
//   //       [
//   //         'a-anchor-link',
//   //         {
//   //           attrs: {
//   //             href: '#' + list[0]['id'],
//   //             title: list[0]['text']
//   //           },
//   //         },
//   //         []
//   //       ]
//   //     )
//   //   } else if (temp > 0) {
//   //     // let n = temp;
//   //     //   while(n> 0){
//   //     //     ALinkChild.push()
//   //     //   }
//   //     //   newOptions[i - 1] = createElement()
//   //   }
//   // }
//   // return newOptions
// }

