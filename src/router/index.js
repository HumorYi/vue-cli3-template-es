/*
 * @Author: Bamboo
 * @AuthorEmail: bamboo8493@126.com
 * @AuthorDescription: 路由配置
 * @Modifier:
 * @ModifierEmail:
 * @ModifierDescription:
 * @Date: 2019-12-27 09:16:54
 * @LastEditTime : 2019-12-30 14:35:19
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

// import { UTIL_USER } from '@/util'

import Index from '../views/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    meta: {
      title: '首页'
    },
    component: Index
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  // 控制页面滚动条
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    // 页面缓存，指定滚动条位置为上次访问位置
    if (from.meta.keepAlive) {
      from.meta.savedPosition = document.body.scrollTop
    }

    return { x: 0, y: to.meta.savedPosition || 0 }
  }
})

// 路由加载前
router.beforeEach((to, from, next) => {
  // 路由发生变化修改页签标题
  if (to.meta.title) {
    document.title = to.meta.title
  }

  // 未登录跳转到登录页
  /* if (to.name !== 'login' && !UTIL_USER.isLogin()) {
    return next({
      name: 'login',
      // 用于登录成功后跳转回原页面
      query: { redirect: to.query.redirect || to.name }
    })
  } */

  return next()
})

export default router
