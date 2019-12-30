/*
 * @Author: Bamboo
 * @AuthorEmail: bamboo8493@126.com
 * @AuthorDescription: 工具库
 * @Modifier:
 * @ModifierEmail:
 * @ModifierDescription:
 * @Date: 2019-12-27 10:48:37
 * @LastEditTime : 2019-12-30 14:33:21
 */
export default {
  /**
   * 设置百分比
   * @param {Number} start 分子
   * @param {Number} end 分母
   * @return {String} 'x%'
   */
  setPercent(start, end) {
    return Math.floor((start / end) * 100) + '%'
  },
  /**
   * canvas 文本缩略符
   * @param {Object} context canvas.getContext('2d)
   * @param {String} text 文本内容
   * @param {Number} maxWidth 截取字符长度
   * @param {Boolean} isAddEllipsis 是否添加缩略符
   * @return: {String} 'xx...'
   */
  textEllipsis(context, text, maxWidth, isAddEllipsis = false) {
    let width = context.measureText(text).width
    let ellipsis = '…'
    let ellipsisWidth = context.measureText(ellipsis).width
    let len = text.length

    if (!isAddEllipsis) {
      if (width <= maxWidth) {
        return text
      }

      while (width >= maxWidth && len-- > 0) {
        text = text.substring(0, len)
        width = context.measureText(text).width
      }

      return text
    }

    if (width <= maxWidth || width <= ellipsisWidth) {
      return text
    }

    while (width >= maxWidth - ellipsisWidth && len-- > 0) {
      text = text.substring(0, len)
      width = context.measureText(text).width
    }

    return text + ellipsis
  },
  /**
   * 设置保留小数位
   * @param {Number} value 数值
   * @param {Number} bit 要保留的小数位数
   * @param {Number} rate 数值转换比例（分）
   * @return: {String} '21.x'
   */
  toDecimal(value, bit = 1, rate = 100) {
    if (value >= 0 && value < 1) {
      return '0.' + ''.padEnd(bit, '0')
    }

    let ret = String(value / rate).split('.')
    let int_price = Number(ret[0])
    let decimal_price = ret[1] || ''
    let decimal_price_len = decimal_price.length

    if (decimal_price_len > bit) {
      decimal_price = decimal_price.slice(0, bit)
    } else if (decimal_price_len < bit) {
      decimal_price = decimal_price.padEnd(bit, '0')
    }

    return int_price + '.' + decimal_price
  },
  /**
   * 添加时间前缀，数字未满 10 前补 0
   * @param {Number} val
   * @return: {String} '02'
   */
  addTimePrefix(val) {
    return val < 10 ? '0' + val : val
  },
  /**
   * 格式化时间
   * @param {String} timeTemp 时间模板，例如 '2019-11'
   * @return: {String} '2019-11-01 01:02:03'
   */
  format(timeTemp) {
    let time = new Date(timeTemp)
    let y = time.getFullYear()
    let m = time.getMonth() + 1
    let d = time.getDate()
    let h = time.getHours()
    let mm = time.getMinutes()
    let s = time.getSeconds()

    return (
      y +
      '-' +
      this.addTimePrefix(m) +
      '-' +
      this.addTimePrefix(d) +
      ' ' +
      this.addTimePrefix(h) +
      ':' +
      this.addTimePrefix(mm) +
      ':' +
      this.addTimePrefix(s)
    )
  },
  /**
   * 获取上月日期
   * @param {Date} date
   * @return: {Date}
   */
  getLastMonthDate(date) {
    let lastMonthDate = new Date(date)
    lastMonthDate.setDate(1)
    lastMonthDate.setMonth(lastMonthDate.getMonth() - 1)

    return lastMonthDate
  }
}
