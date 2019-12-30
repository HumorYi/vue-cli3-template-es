/*
 * @Author: Bamboo
 * @AuthorEmail: bamboo8493@126.com
 * @AuthorDescription:用户工具：登录态永久保存，不存在前端过期的说法，只有后端 token 过期
 * @Modifier:
 * @ModifierEmail:
 * @ModifierDescription:
 * @Date: 2019-12-27 15:25:59
 * @LastEditTime : 2019-12-30 13:59:11
 */

import LOCAL_STORAGE from './local-storage'

export default {
  /**
   * 更新过期token
   * @return: void
   */
  updateAccessTokenExpireDate() {
    const existDate = 7
    const start = Date.now()
    const end = Date.now() + 1000 * 60 * 60 * 24 * existDate
    LOCAL_STORAGE.setAccessTokenExpireDate({ start, end })
  },
  /**
   * 登录: 永久保存
   * @param {Boolean} isSaveLoginStatus 是否保存登录态
   * @param {String} access_token token 数据
   * @param {Object} app Vue 实例
   * @param {String} tip 提示信息
   * @param {String} redirect 重定向路径
   * @return: void
   */
  signIn(isSaveLoginStatus, access_token, app, tip, redirect) {
    isSaveLoginStatus && LOCAL_STORAGE.setAccessToken(access_token)
    // this.updateAccessTokenExpireDate()

    if (app) {
      tip && app.$message.success(tip)
      setTimeout(() => {
        app.$router.replace({ name: redirect || app.$route.query.redirect || 'index' })
      }, 3000)
    }
  },
  /**
   * 退出登录
   * @return: void
   */
  signOut() {
    LOCAL_STORAGE.delAccessToken()
    // LOCAL_STORAGE.delAccessTokenExpireDate()
  },
  /**
   * 是否登录
   * @return: {Boolean}
   */
  isLogin() {
    return LOCAL_STORAGE.getAccessToken() !== ''
  }
}
