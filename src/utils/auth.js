import Cookies from 'js-cookie'

const TokenKey = 'token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getCookie(item){
  return Cookies.get(item)
}

export function getItem(name) {
  return sessionStorage.getItem(name)
}

export function setItem(name, value) {
  return sessionStorage.setItem(name, value)
}
