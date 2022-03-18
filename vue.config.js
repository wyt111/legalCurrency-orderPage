module.exports = {
    publicPath: './',
    lintOnSave: false,
    chainWebpack: config => {
      config
        .plugin('html')
        .tap(args => {
          args[0].title= 'History'
          return args
        })
    }
}
