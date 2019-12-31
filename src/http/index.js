/*
 * @Author: Bamboo
 * @AuthorEmail: bamboo8493@126.com
 * @AuthorDescription:http请求
 * @Modifier:
 * @ModifierEmail:
 * @ModifierDescription:
 * @Date: 2019-12-27 10:48:37
 * @LastEditTime : 2019-12-31 15:01:57
 */
import axios from 'axios'
import router from '../router'
import qs from 'qs'

// import { Message } from 'element-ui'

import { CONFIG_API } from '@/config'
import { UTIL_USER } from '@/util'
import { ERROR_API } from '@/error'

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
    .then(({ data: { code, msg, data } }) => {
      // 响应成功，把响应数据返回给接口
      if (code === CONFIG_API.SUCCESS.code) {
        return data
      }

      // 响应失败，弹出响应失败信息
      if (code === CONFIG_API.FAIL.code) {
        // return Message.error(msg)
      }

      // token 失效
      if (code === CONFIG_API.ACCESS_TOKEN_INVALID.code) {
        UTIL_USER.signOut()

        return router.replace({ name: 'login' })
      }

      // 响应异常
      if (code === CONFIG_API.ACCESS_EXCEPTION.code) {
        return ERROR_API(msg)
      }

      // 未知响应错误
      ERROR_API(`服务器响应未知错误，错误码为：${code}:，错误提示信息为：${msg}`)
    })
    .catch(err => console.error(err))
}
