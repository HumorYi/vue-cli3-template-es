<!--
 * @Author: Bamboo
 * @AuthorEmail: bamboo8493@126.com
 * @AuthorDescription: 入口视图
 * @Modifier:
 * @ModifierEmail:
 * @ModifierDescription:
 * @Date: 2019-12-27 09:16:54
 * @LastEditTime : 2019-12-31 14:59:25
-->

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="sass">
@import '@/assets/sass/global.sass'

#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: #2c3e50
</style>
