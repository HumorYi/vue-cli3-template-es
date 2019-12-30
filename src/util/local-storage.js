/*
 * @Author: Bamboo
 * @AuthorEmail: bamboo8493@126.com
 * @AuthorDate: 2019-08-26 09:25:22
 * @AuthorDescription: 存储在 localStorage 的数据，设置和获取时统一进行 JSON 格式化
 * @Modifier:
 * @ModifierEmail:
 * @ModifierDate: Do not edit
 * @ModifierDescription:
 */

// 存储的 key
const ACCESS_TOKEN_EXPIRE_DATE = 'ACCESS_TOKEN_EXPIRE_DATE'
const ACCESS_TOKEN = 'ACCESS_TOKEN'

// 对操作 key 的方法进行统一处理
const getItem = (key, val = '') => {
  let item = localStorage.getItem(key)
  return item && item !== 'undefined' ? JSON.parse(localStorage.getItem(key)) : val
}
const setItem = (key, val) => localStorage.setItem(key, JSON.stringify(val))
const removeItem = key => localStorage.removeItem(key)

// 暴露出去操作 key 的方法
export default {
  getAccessToken: () => getItem(ACCESS_TOKEN),
  setAccessToken: val => setItem(ACCESS_TOKEN, val),
  delAccessToken: () => removeItem(ACCESS_TOKEN),

  getAccessTokenExpireDate: () => getItem(ACCESS_TOKEN_EXPIRE_DATE, {}),
  setAccessTokenExpireDate: val => setItem(ACCESS_TOKEN_EXPIRE_DATE, val),
  delAccessTokenExpireDate: () => removeItem(ACCESS_TOKEN_EXPIRE_DATE)
}
