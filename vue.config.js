/*
 * @Author: Bamboo
 * @AuthorEmail: bamboo8493@126.com
 * @AuthorDate: 2019-08-08 15:02:52
 * @AuthorDescription: vue-cli配置
 * @Modifier:
 * @ModifierEmail:
 * @ModifierDate: 2019-08-26 17:29:49
 * @ModifierDescription:
 */

const path = require('path')

const isProduction = ['production', 'prod'].includes(process.env.NODE_ENV)

/* gzip S */
const CompressionWebpackPlugin = require('compression-webpack-plugin')

// 还可以开启比 gzip 体验更好的 Zopfli
const zopfli = require('@gfx/zopfli')
const BrotliPlugin = require('brotli-webpack-plugin')

// 需要gzip压缩的文件后缀
const productionGzipExtensions = ['ts', 'js', 'css', 'json', 'txt', 'html', 'ico', 'svg']
const productionGzipReg = new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$', 'i')
/* gzip E */

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

// 访问https://unpkg.com获取最新版本
const cdn = {
  css: ['http://unpkg.com/element-ui@2.4.5/lib/theme-chalk/index.css'],
  js: [
    'http://unpkg.com/vue@2.6.10/dist/vue.min.js',
    'http://unpkg.com/vue-router@3.1.3/dist/vue-router.min.js',
    'http://unpkg.com/axios@0.19.0/dist/axios.min.js',
    'http://unpkg.com/element-ui@2.4.5/lib/index.js'
  ]
}

// in the development, use own LAN ip to running or debug
const interfaces = require('os').networkInterfaces()
const getLANIp = () => {
  for (let devName in interfaces) {
    let current_interface = interfaces[devName]

    for (let i = 0, len = current_interface.length; i < len; i++) {
      let alias = current_interface[i]

      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address
      }
    }
  }
}
const addStyleResource = rule => {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/assets/sass/variables.sass'),
        path.resolve(__dirname, './src/assets/sass/mixin.sass'),
      ],
    })
}
module.exports = {
  // 默认'/'，部署应用包时的基本 URL,
  // publicPath: isProduction ? process.env.VUE_APP_PUBLIC_PATH : './',
  publicPath: isProduction ? './' : './',

  // 'dist', 生产环境构建文件的目录
  // outputDir: process.env.outputDir || 'dist',

  // 相对于outputDir的静态资源(js、css、img、fonts)目录
  assetsDir: 'static',

  // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径
  // indexPath: './',

  // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码 (在生产构建时禁用 eslint-loader) !isProduction
  lintOnSave: !isProduction,

  // 是否使用包含运行时编译器的 Vue 构建版本
  runtimeCompiler: true,

  // 生产环境的 source map
  productionSourceMap: !isProduction,

  // 设置生成的 HTML 中 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性（注：仅影响构建时注入的标签）
  // crossorigin: undefined,

  // 在生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)
  // integrity: false,

  //是否为 Babel 或 TypeScript 使用 thread-loader。
  // 该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建，在适当的时候开启几个子进程去并发的执行压缩
  // parallel: require('os').cpus().length > 1,

  // 默认在生成的静态资源文件名中包含hash以控制缓存
  // filenameHashing: true,

  css: {
    // 当为true时，css文件名可省略 module 默认为 true
    requireModuleExtension: false,

    // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中,当作为一个库构建时，你也可以将其设置为 false 免得用户自己导入 CSS
    // 默认生产环境下是 true，开发环境下是 false
    extract: isProduction,
    /* extract: {
      filename: `${assetsDir}/css/[name].[hash:8].css`,
      chunkFilename: `${assetsDir}/css/[name].[hash:8].css`
    }, */

    // 开启 CSS source maps，一般不建议开启
    // sourceMap: false,

    // css预设器配置项
    loaderOptions: {
      /* css: {
        localIdentName: '[name]-[hash]',
        camelCase: 'only',
        requireModuleExtension: false
      }, */
      sass: {
        // prependData: `@import "@/assets/sass/component.sass"`
      },
      /* scss: {
        prependData: `@import "src/assets/scss/component.scss";`
      }, */
      /* postcss: {
        plugins: [
          require('postcss-plugin-px2rem')({
            //换算基数， 默认100  ，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多上px了。
            // rootValue: 100,

            //允许REM单位增长到的十进制数字。
            // unitPrecision: 5,

            //默认值是一个空数组，这意味着禁用白名单并启用所有属性。
            //propWhiteList: [],

            //黑名单
            // propBlackList: [],

            //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)/ 。如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
            exclude: /(node_module)/,

            //要忽略并保留为px的选择器
            selectorBlackList: ['.dt-pc'],

            //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
            // ignoreIdentifier: false,

            // （布尔值）替换包含REM的规则，而不是添加回退。
            // replace: true,

            //（布尔值）允许在媒体查询中转换px。
            mediaQuery: false,

            //设置要替换的最小像素值(3px会被转rem)。 默认 0
            minPixelValue: 3
          })
        ]
      } */
    }
  },

  devServer: {
    // 是否自动打开浏览器页面
    open: true,

    // 指定使用一个 host。默认是 localhost
    host: getLANIp(),

    // 端口地址
    port: 8080,

    // 使用https提供服务
    https: false,

    // 开启压缩
    compress: false,

    progress: true,

    // 让浏览器 overlay 同时显示警告和错误
    overlay: {
      warnings: true,
      errors: true
    },
    // 配置跨域处理
    proxy: {
      '/api': {
        // 目标 API 地址
        target: process.env.VUE_APP_API,
        //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样客户端和服务端进行数据的交互就不会有跨域问题
        changeOrigin: true

        //这里重写路径
        // pathRewrite: {'^/api': '/'}

        // 如果要代理 websockets
        // ws: true,
        // secure: false
      }
    },
    before: app => {}
  },

  // 向 PWA 插件传递选项
  // pwa: {},

  // 可以用来传递任何第三方插件选项
  // pluginOptions: {},

  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('sass').oneOf(type)))

    // 修复HMR
    config.resolve.symlinks(true)

    // 设置资源引用别名
    // config.resolve.alias.set('@img', resolve('src/assets/img'))

    // 自动化导入less文件
    // ;['vue-modules', 'vue', 'normal-modules', 'normal'].forEach(type =>
    //   addStyleResource(config.module.rule('less').oneOf(type))
    // )

    // 生产环境配置
    if (isProduction) {
      // 移除 prefetch 插件
      config.plugins.delete('prefetch')

      // 移除 preload 插件
      config.plugins.delete('preload')

      // 生产环境注入cdn
      config.plugin('html').tap(args => {
        // 修复 Lazy loading routes Error
        args[0].chunksSortMode = 'none'
        args[0].cdn = cdn
        return args
      })

      // 分割代码
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          vendor: {
            chunks: 'initial',
            test: /node_modules/,
            name: 'vendor',
            priority: 100,
            minSize: 0,
            minChunks: 2,
            maxInitialRequests: 5,
            reuseExistingChunk: true
          },
          common: {
            chunks: 'all',
            name: 'chunk-common', // 抽取公共文件的名字
            minSize: 0, // 单个文件最小size
            minChunks: 2 // 最小被引用多少次则被抽取
          }
        }

        // cacheGroups: {
        //   libs: {
        //     name: 'chunk-libs',
        //     test: /[\\/]node_modules[\\/]/,
        //     priority: 10,
        //     chunks: 'initial'
        //   },
        //   elementUI: {
        //     name: 'chunk-elementUI',
        //     priority: 20,
        //     test: /[\\/]node_modules[\\/]element-ui[\\/]/,
        //     chunks: 'all'
        //   },
        //   commons: {
        //     test: /[\\/]node_modules[\\/]/,
        //     // cacheGroupKey here is `commons` as the key of the cacheGroup
        //     name(module, chunks, cacheGroupKey) {
        //       const moduleFileName = module
        //         .identifier()
        //         .split('/')
        //         .reduceRight(item => item);
        //       const allChunksNames = chunks.map(item => item.name).join('~');
        //       return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
        //     },
        //     chunks: 'all'
        //   },
        //   vendor: {
        //     // 提升权重，先抽离第三方模块，再抽离公共模块，要不然执行抽离公共模块就截止不会往下执行
        //     priority: 1,
        //     test: /node_modules/,
        //     // 从入口开始查找模块
        //     chunks: 'initial',
        //     // 文件最小字节
        //     minSize: 0,
        //     // 引用次数
        //     minChunks: 2,
        //     reuseExistingChunk: true
        //   }
        // }
      })

      /**
       * 将包含chunks 映射关系的 list单独从 app.js里提取出来，
       * 因为每一个 chunk 的 id 基本都是基于内容 hash 出来的，
       * 所以你每次改动都会影响它，如果不将它提取出来的话，
       * 等于app.js每次都会改变。缓存就失效了
       */
      // config.optimization.runtimeChunk = {
      //   name: 'manifest'
      // };

      // 压缩图片
      // config.module
      // 	.rule('images')
      // 	.use('image-webpack-loader')
      // 	.loader('image-webpack-loader')
      // 	.options({
      // 		mozjpeg: { progressive: true, quality: 65 },
      // 		optipng: { enabled: false },
      // 		pngquant: { quality: '65-90', speed: 4 },
      // 		gifsicle: { interlaced: false },
      // 		webp: { quality: 75 }
      // 	})

      // 打包分析
      if (process.env.IS_ANALYZ) {
        config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
          {
            analyzerMode: 'static'
          }
        ])
      }
    }
  },

  configureWebpack: config => {
    const plugins = []

    if (isProduction) {
      config.mode = 'production'

      // 用cdn方式引入
      config.externals = {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        axios: 'axios',
        'element-ui': 'ELEMENT'
      }

      plugins.push(
        // 开启 Gzip 压缩
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          // algorithm: 'gzip',
          algorithm(input, compressionOptions, callback) {
            return zopfli.gzip(input, compressionOptions, callback)
          },
          compressionOptions: {
            numiterations: 15
          },
          test: productionGzipReg,
          threshold: 10240,
          minRatio: 0.8
        }),
        new BrotliPlugin({
          test: productionGzipReg,
          minRatio: 0.99
        })
      )
    } else {
      config.mode = 'development'
    }

    config.plugins = [...config.plugins]

    Object.assign(config, {
      // 开发生产共同配置
      resolve: {
        extensions: ['.ts', '.tsx', '.js', '.vue', '.json'],
        alias: {
          vue$: 'vue/dist/vue.js',
          '@': path.resolve(__dirname, './src')
        }
      }
    })
  }
}
