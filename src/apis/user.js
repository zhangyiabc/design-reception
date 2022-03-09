import request from '@/utils/request'

export function login(data) {
  return request({
    url: "/api/user/login",
    method: "POST",
    data
  })
}

export function register(data) {
  return request({
    url: "/api/user/register",
    method: "POST",
    data
  })
}

export function getUserDetail(id) {
  return request({
    url: "/api/user/" + id,
    method: "GET"
  })
}

export function whoami() {
  return request({
    url: '/api/user/whoami',
    method: "GET"
  })
}