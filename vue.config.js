const path = require('path')
function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: './',
    lintOnSave: false,
    assetsDir: 'static',
    productionSourceMap: false,
    chainWebpack(config) {
        // it can improve the speed of the first screen, it is recommended to turn on preload
        // it can improve the speed of the first screen, it is recommended to turn on preload
        config.plugin('preload').tap(() => [
            {
                rel: 'preload',
                // to ignore runtime.js
                // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
                fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
                include: 'initial',
                
            }
        ])

        // when there are many pages, it will cause too many meaningless requests
        config.plugins.delete('prefetch')

        // set svg-sprite-loader
        config.module
            .rule('svg')
            .exclude.add(resolve('src/icons'))
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]',
                title:'Alchemy Pay'
            })
            .end()
    },
    // chainWebpack: config => {
    //   config
    //     .plugin('html')
    //     .tap(args => {
    //       args[0].title= 'Alchemy Pay'
    //       return args
    //     })
    // }
}
