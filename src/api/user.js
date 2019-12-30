/*
 * @Author: Bamboo
 * @AuthorEmail: bamboo8493@126.com
 * @AuthorDescription:用户操作接口
 * @Modifier:
 * @ModifierEmail:
 * @ModifierDescription:
 * @Date: 2019-12-27 11:20:39
 * @LastEditTime : 2019-12-27 11:22:44
 */
import { request } from '../http'

// 获取启动的登录方式
const GET_OPEN_LOGIN_TYPE = '/reset_password/login_type'

export default {
  //  登录方式
  getOpenLoginType: data => request('get', GET_OPEN_LOGIN_TYPE, data)
}
