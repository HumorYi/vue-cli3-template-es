/*
 * @Author: Bamboo
 * @AuthorEmail: bamboo8493@126.com
 * @AuthorDate: Do not edit
 * @AuthorDescription: 验证工具
 * @Modifier:
 * @ModifierEmail:
 * @ModifierDate: Do not edit
 * @ModifierDescription:
 */
/* eslint-disable */
export default {
  /**
   * 手机号码验证
   * @param {String} val
   * @return: {Boolean}
   */
  isMobile(val) {
    return /^1[3456789]\d{9}$/.test(val)
  },
  /**
   * 邮箱验证
   * @param {String} val
   * @return: {Boolean}
   */
  isEmail(val) {
    return /^[\w.-]+@([a-zA-Z\d-]+\.)+[a-zA-Z\d]{2,4}$/.test(val)
  },
  /**
   * 支付宝账号验证
   * @param {String} val
   * @return: {Boolean}
   */
  isAliPayAccount(val) {
    return this.isMobile(val) || this.isEmail(val)
  },
  /**
   * IPhone 验证
   * @return: {Boolean}
   */
  isIPhone() {
    return /iphone/gi.test(window.navigator.userAgent)
  },
  /**
   * IPhoneX 及 后续的机型验证
   * @return: {Boolean}
   */
  isIPhoneX() {
    return this.isIPhone() && window.screen.height >= 812
  },
  /**
   * IOS 系统验证
   * @return: {Boolean}
   */
  isIOS() {
    return (
      window &&
      window.navigator &&
      window.navigator.userAgent &&
      /\(i[^;]+;( U;)? CPU.+Mac OS X/.test(window.navigator.userAgent)
    )
  },
  /**
   * android 系统验证
   * @return: {Boolean}
   */
  isAndroid() {
    return (
      (window &&
        window.navigator &&
        window.navigator.userAgent &&
        window.navigator.userAgent.indexOf('Android') !== -1) ||
      window.navigator.userAgent.indexOf('Linux') !== -1
    )
  },
  /**
   * 正则匹配
   * @param {String} type 类型
   * @param {String} value 验证数据
   * @return: {Boolean}
   */
  matchFn(type, value) {
    let match = {
      // 链接
      url: /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/gi,
      // 固话
      phone: /^((\d{8})|(\d{3, 4})-(\d{7,8})|(\d{3, 4})-(\d{7,8})-(\d{1, 4})|(\d{7,8})-(\d{1, 4}))$/gi,
      // 手机号码
      tel: /^1[34578]\d{9}$/gi,
      // 6位数密码验证
      passWord: /^\d{6,}$/gi,
      // 正整数（不包含0）
      positiveInt: /^[1-9]\d*$/gi,
      // 非负整数（包含0）
      nonnegativeInt: /^[1-9]\d*|0$/gi,
      // 浮点
      float: /^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/gi,
      // 小数点后不超过两位
      floatFixedTwo: /^\d+(\.\d{1,2})?$/gi,
      // 邮编
      postcode: /^[1-9]\d{5}(?!\d)$/gi,
      // 邮箱
      email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/gi,
      // 字母或数字
      letterOrNum: /^[a-zA-Z\d]+$/gi,
      // 10位，第一个不能为0
      // 可以输入中文，字母，数字
      room: /^[\u4e00-\u9fa5_a-zA-Z1-9_][\u4e00-\u9fa5_a-zA-Z0-9_]{0,10}$/gi,
      // 身份证
      identity_no: /^\d{15}|\d{18}$/gi
    }
    return match[type].test(value)
  }
}
/* eslint-enable */
