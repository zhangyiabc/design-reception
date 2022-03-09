import request from '@/utils/request'

// 获取一条名人名言
const sentence = () => {
  return request({
    url: "https://v1.hitokoto.cn/?c=h&c=i&c=d&encode=json",
    method: "GET"
  })
}

export {
  sentence
}