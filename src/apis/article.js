// 关于文章的接口
import request from '@/utils/request'

const getAllArticle = (data) => {
  return request({
    url: "/api/article",
    method: "GET",
    params: data
  })
}

const addArticle = (data) => {
  return request({
    url: "/api/article",
    method: "POST",
    data: data
  })
}

const getArticleDetail = (id) => {
  return request({
    url:"/api/article/" + id,
    method:"GET"
  })
}

export {
  getAllArticle,
  addArticle,
  getArticleDetail
}