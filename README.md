# web

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## 开发约定

- 命名

  - 命名要见名知意，简洁明了，让代码会说话，减少不必要的注释，严禁出现 拼音数字 组合命名方式，统一使用有具体意义的英文单词命名，
    可参照 google 翻译，网址：https://translate.google.cn/

  - 类（文件或文件夹）统一使用 大驼峰命名法，例如：ProductDetail
      例如：.vue 结尾、封装的 js 类文件 等

  - 普通（文件或文件夹） 统一使用 横线命名法，例如：product-detail
      例如：.sass、.js、.html 等 结尾

  - 常量数据统一使用全大写，多个单词使用 _ 分割，例如：PRODUCT_DETAIL

  - 普通数据统一使用小驼峰，例如：productDetail

  - css 类名统一使用横线，例如：product-detail

  - 全局组件统一使用 g-组件名，例如：g-product-detail

- 注释

  - 每个文件都要添加头目录注释，记录当前文件的主要功能

  - 每个函数或方法都要注释，记录当前函数的主要功能和开发思路，统一使用 vscode 中提供的块注释方式, /** 再按 tab 键，例如：
    ```
      /**
      * 设置百分比 => 描述
      * @param {Number} start 分子 => {数据类型} 变量名 描述
      * @param {Number} end 分母
      * @return {String} 'x%' => {返回数据类型} 返回数据模板 (注意: 如果没有返回值，则统一为：@return void)
      */
      setPercent(start, end) {
        return Math.floor((start / end) * 100) + '%'
      }
    ```

  - 比较难理解 或 比较长的 变量命名需要添加注释，统一使用行注释方式，注释写在变量名上一行，例如：
    ```
    // 权限访问路由
    const authorityAccessRoute = []
    ```

- 数据类型定义

  - 常量数据（数据一经定义永不改变）类型 或 引用类型（json、array、date等）如果确定不会发生替换操作，统一使用 const 声明，例如：
    ```
    const json = {}
    const TOTAL_COUNT = 100
    const DOMAIN = 'https://www.baidu.com'
    ```

  - 统一使用 函数直接量 方式创建函数，例如:
    ```
    const foo = () => {} 或 const bar = { foo() {} }
    ```

- 自定义 js 功能分类目录

  - 每个目录只需要向外暴露一个接口，在 index.js 文件中引入并向外导出，保持目录单一性、可维护、可扩展性

  - 把需要向外暴露的接口按类别写在目录下的不同文件中，最后在 index.js 中导入，使用 export default 向外统一暴露接口，可按需引入；

  - 暴露的接口名全部大写，同时要加上当前目录名做前缀，多个单词之间使用 _ 分割；

    例如：util 目录下有一个 lib.js 文件，在 index.js 中导入，再暴露出去，暴露前缀为当前文件夹名大写_（UTIL_）：
      ```
      import UTIL_LIB from './lib'
      import UTIL_USER from './user'
      export default { UTIL_LIB, UTIL_USER }
      ```

      ```
      // 外部组件或文件 按需引入工具库
      import { UTIL_LIB, UTIL_USER } from '@/util'
      ```

  - 注意：除了 通过 vue-cli 创建项目 内部的 src 目录下特定的文件夹外，其它文件夹都是自定义目录，使用方式同上

- 自定义组件向外暴露事件时，在组件内得有默认事件，防止未传递触发事件导致出现 bug

  - 事件名统一使用小驼峰，默认事件名统一加 own 前缀，意为是自己组件自有事件；

    例如：默认事件名: ownShowPopup ; 外部调用组件传递事件名 showPopup；

  - 在默认事件中需要判断是否有传 事件函数 再执行 事件函数，例如：
    ```
    ownShowPopup() { this.showPopup && this.showPopup() }
    ```

- 文件存储位置

  - 公共组件统一存放在 src/components 目录中，组件命名为大驼峰，例如：User.vue

  - 公共 JS 组件统一存放在 src/mixins 目录中，组件命名为大驼峰，例如：User.vue
      注意：在导入 mixins 内部组件时，要在导入的组件名前加 Mixins_ 前缀，避免导入组件名冲突
        例如：import Mixins_User from '@/mixins/User.vue'

  - 页面组件统一存放在 src/views 目录中，每个页面以文件夹的方式命名，Index.vue 为该页面的入口

  - 图片资源文件统一存放在 src/assets/images 目录中，公共图片存放在根文件夹中

    注意：图片资源文件分类文件夹命名应同 src/views 目录中的 页面目录名一致，存放对应页面的图片

  - 公共样式文件统一存放在 src/assets/sass 目录中

  - 所有的过滤器函数统一存放在 src/filter 目录中，index.js 为该页面的入口

  - 所有的公共工具函数统一存放在 src/util 目录中，index.js 为该页面的入口

  - axios 请求响应拦截器统一存放在 src/http 目录中，index.js 为该页面的入口

  - 所有在 main.js 中要引入的文件或其它处理,统一存放在 src/register 目录中，以单一文件的方式分类处理，index.js 为该页面的入口

  - 所有的路由配置统一存放在 src/router 目录中，父路由已文件夹 + index.js 的方式定义，子路由存放在父路由下，

    注意：router 文件分类命名应同 src/views 目录中的 页面目录名一致，存放对应页面的 router

    例如:
    ```
    父路由：my 文件夹
      index.js 父路由入口目录
      info.js 子路由存放位置
    ```

  - 公共配置文件统一封装在 src/config 目录下的文件中，index.js 为该页面的入口

    注意：加上注释，严禁出现无法读取的配置（数字、字符串等描述性信息）

  - API 统一存放在 src/api 目录中

    注意：api 文件分类文件夹命名应同 src/views 目录中的 页面目录名一致，存放对应页面的 api

    在 api 文件中封装方便调用的 Promise，包含方法，接口名，外部调用接口函数时只需传递数据即可

  - 错误处理 统一存放在 src/error 目录中，便于管理、维护、扩展

- z-index 使用约定

  - 底部轮播图 -100~0
  - 基本 0~100
  - 内容层 100~200
  - 头部、导航 200~300
  - 蒙版 300~400
  - 悬浮窗 500~600
  - 悬浮窗按钮 600~700

- 注意事项
  - 在进行条件判断时，使用全等(===)进行判断
  - 严禁出现 !user 这种判断，必须要判断到对应的数据类型，例如：user !== null
  - 尽量使用 continue, break, return 减少 if else 嵌套
  - 条件判断比较多时，使用 json 来添加 映射关系，使代码设计更清晰可读
  - 组件设计保持单一性，把使用组件的使用交给外部控制，减少组件内部逻辑
  - 路由 path 使用小写单词，多个单词之间使用 _ 分割
  - 每个路由配置项都要写 meta 元数据项，内部必须有 title 属性，表示当前页签标题，例如：
    ```
    {
      path: '/xxx',
      name: 'xxx',
      meta: {
        title: 'xxx'
      }
    }
    ```
  - 除了要实时监听数据的变化，不要在模板层（template）写逻辑，保留单一性，模板只做渲染，逻辑放在 js 处理

## 目录树
```
│  .browserslistrc                                        浏览器兼容列表等
│  .env                                                   开发环境变量配置
│  .env.analyz                                            生产环境变量分析配置
│  .env.production                                        生产环境变量配置
│  .eslintrc.js                                           eslint 配置
│  .gitignore                                             git 配置
│  .prettierrc                                            prettierrc 格式化配置
│  babel.config.js                                        babel 编译 js 配置
│  jest.config.js                                         jest 测试 配置
│  package-lock.json                                      项目配置
│  package.json                                           项目配置
│  postcss.config.js                                      postcss 配置
│  README.md                                              项目介绍
│  vue.config.js                                          vue-cli 配置（webpack）
│
├─public                                                  公共目录
│      favicon.ico                                        页签图标
│      index.html                                         打包生成模板
│
├─src                                                     源码
│  │  App.vue                                             入口组件
│  │  main.js                                             入口文件
│  │
│  ├─api                                                  接口
│  │      index.js                                        入口文件
│  │      user.js                                         其它文件
│  │
│  ├─assets                                               资源
│  │  ├─images                                            图片
│  │  └─sass                                              样式
│  │          common.sass                                 全局引入的公共样式
│  │          component.sass                              全部组件都要引入的样式
│  │          element-ui-reset.sass                       element-ui 样式重置
│  │          index.sass                                  入口样式
│  │          mixin.sass                                  函数样式
│  │          reset.sass                                  浏览器默认样式重置
│  │          variables.sass                              变量配置
│  │
│  ├─components                                           组件
│  │
│  ├─config                                               配置
│  │      index.js                                        入口文件
│  │      api.js                                          接口文件
│  │      user.js                                         用户文件
│  │
│  ├─error                                                错误配置
│  │      index.js                                        入口文件
│  │      api.js                                          接口文件
│  │
│  ├─filter                                               过滤器
│  │      index.js                                        入口文件
│  │
│  ├─http                                                 http 请求（axios）
│  │      index.js                                        入口文件
│  │
│  ├─mixins                                               js 混入组件
│  │
│  ├─plugins                                              第三方插件
│  │      element.js                                      element-ui 组件引入文件
│  │
│  ├─register                                             注册器
│  │      component.js                                    全局组件文件
│  │      css.js                                          全局样式文件
│  │      filter.js                                       全局过滤器文件
│  │      index.js                                        入口文件
│  │
│  ├─router                                               路由
│  │      index.js                                        入口文件
│  │
│  ├─util                                                 工具
│  │      index.js                                        入口文件
│  │      lib.js                                          库文件
│  │      local-storage.js                                存储数据文件
│  │      user.js                                         用户文件
│  │      verify.js                                       验证文件
│  │
│  └─views                                                页面组件
│          Index.vue                                      首页组件
│
└─tests                                                   测试
    └─unit                                                单元测试
            example.spec.js                               测试文件
```