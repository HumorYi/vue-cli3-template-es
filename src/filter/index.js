/*
 * @Author: Bamboo
 * @AuthorEmail: bamboo8493@126.com
 * @AuthorDescription:
 * @Modifier:过滤器
 * @ModifierEmail:
 * @ModifierDescription:
 * @Date: 2019-12-27 10:48:37
 * @LastEditTime : 2019-12-27 10:49:38
 */
import { UTIL_LIB } from '@/util'

const padStartZero = data => (String(data).length < 2 ? '0' + data : data)

export default [
  {
    name: 'date',
    fn(value, splitSymbol = '.') {
      // value => seconds
      const date = new Date(value * 1000)
      const year = date.getFullYear()
      const month = padStartZero(date.getMonth() + 1)
      const day = padStartZero(date.getDate())

      return year + splitSymbol + month + splitSymbol + day
    }
  },
  {
    name: 'datetime',
    fn: (value, dateSplitSymbol = '-', timeSplitSymbol = ':') => {
      const date = new Date(value)
      const year = date.getFullYear()
      const month = padStartZero(date.getMonth() + 1)
      const day = padStartZero(date.getDate())
      const hour = padStartZero(date.getHours())
      const minutes = padStartZero(date.getMinutes())
      const seconds = padStartZero(date.getSeconds())

      return (
        year +
        dateSplitSymbol +
        month +
        dateSplitSymbol +
        day +
        ' ' +
        hour +
        timeSplitSymbol +
        minutes +
        timeSplitSymbol +
        seconds
      )
    }
  },
  {
    name: 'coupon',
    fn(value, rate = 100) {
      return (value > 0 ? '￥' + Math.floor(value / rate) : '暂无') + '券'
    }
  },
  {
    name: 'price',
    fn(value) {
      return UTIL_LIB.toDecimal(value)
    }
  },
  {
    name: 'earn',
    fn(value) {
      return UTIL_LIB.toDecimal(value, 2)
    }
  },
  {
    name: 'decimals',
    fn(value, bit = 2) {
      return Number(Number(value).toFixed(bit)) || 0
    }
  },
  {
    name: 'mobile',
    fn(value) {
      return value.slice(0, 3) + '****' + value.slice(7)
    }
  }
]
