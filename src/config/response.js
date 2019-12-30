/*
 * @Author: Bamboo
 * @AuthorEmail: bamboo8493@126.com
 * @AuthorDescription:服务器响应的状态码和信息
 * @Modifier:
 * @ModifierEmail:
 * @ModifierDescription:
 * @Date: 2019-12-27 10:48:37
 * @LastEditTime : 2019-12-27 11:39:07
 */

export default {
  SUCCESS: { code: 0, msg: '响应成功' },
  FAIL: { code: -1, msg: '响应失败' },
  ACCESS_TOKEN_INVALID: { code: -1001, msg: '响应access_token无效' },
  ACCESS_EXCEPTION: { code: -1002, msg: '响应异常' }
}
