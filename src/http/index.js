/*
 * @Author: Bamboo
 * @AuthorEmail: bamboo8493@126.com
 * @AuthorDescription:http请求
 * @Modifier:
 * @ModifierEmail:
 * @ModifierDescription:
 * @Date: 2019-12-27 10:48:37
 * @LastEditTime : 2019-12-31 09:24:07
 */
import axios from 'axios'
import router from '../router'
import qs from 'qs'

import { CONFIG_API } from '@/config'
import { UTIL_USER } from '@/util'

// 默认不启用 cookie
// axios.defaults.withCredentials = true
// axios.defaults.baseURL = process.env.APIURL
// 无效，axios bug
// axios.defaults.headers.post['content-type'] = 'application/json;charset=UTF-8'

// 匹配需要登录验证的路由，自动添加 access_token 字段，只适应最外层路由，不使用嵌套路由
/* const getRouter = (routes, currentRoute) =>
  routes.find(route => {
    if (route.path === currentRoute) {
      return true
    }

    route.children && getRouter(route.children, currentRoute)
  })

const currentRoute = window.location.hash.slice(1).split('?')[0]
const currentRouter = getRouter(router.options.routes, currentRoute)

if (currentRouter && currentRouter.meta && currentRouter.meta.loginAuth) {
  config.data.access_token = UTIL_LOCAL_STORAGE.getAccessToken()
} */

// 添加响应拦截器
axios.interceptors.request.use(
  config => {
    if (config.data && config.method === 'post' && config.data.constructor !== FormData) {
      // 判断config.data.constructor不是 formdata，则不qs格式化data
      // 数组需要格式化一下，格式化模式有三种：indices、brackets、repeat
      config.data = qs.stringify(config.data, { arrayFormat: 'repeat' })
    }

    return config
  },
  error => Promise.reject(error)
)

// 添加请求拦截器
axios.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
)

/**
 * 公共请求入口
 * @param method  'get || post'
 * @param url   'string'
 * @param param 'object'
 * @return {Promise}
 */
export const request = (method, url, param = {}) => {
  let config = { url, method }

  if (method === 'post') {
    config.data = param
  } else {
    config.params = param
  }

  return axios(config)
    .then(({ data }) => {
      if (
        !data.code ||
        data.code === CONFIG_API.SUCCESS.code ||
        // data.code === CONFIG_API.FAIL.code ||
        data.code === 40001
      ) {
        return data
      }

      // 用户状态变更
      if (data.code === CONFIG_API.ACCESS_TOKEN_INVALID.code) {
        UTIL_USER.signOut()

        return router.replace({ name: 'login' })
      }

      throw new Error(`服务器响应失败: ${data.msg}`)
    })
    .catch(err => console.error(err))
}
