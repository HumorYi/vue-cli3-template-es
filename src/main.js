/*
 * @Author: Bamboo
 * @AuthorEmail: bamboo8493@126.com
 * @AuthorDescription: 入口文件
 * @Modifier:
 * @ModifierEmail:
 * @ModifierDescription:
 * @Date: 2019-12-27 15:25:59
 * @LastEditTime : 2019-12-27 15:41:28
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/register'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
