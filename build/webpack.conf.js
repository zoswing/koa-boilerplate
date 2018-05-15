var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  entry: {
    server: './index.js'
  },
  output: {
    filename: 'bundle.js', // 打包后的文件名称
    path: path.resolve(__dirname, '../dist')
  },
  devtool: false,
  resolve: {
    extensions: ['.js', '.json']
  },
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       vendor: {
  //         // 抽离第三方插件
  //         test: /node_modules/, // 指定是node_modules下的第三方包
  //         chunks: 'initial',
  //         name: 'vendor', // 打包后的文件名，任意命名
  //         // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
  //         priority: 10
  //       },
  //     }
  //   }
  // },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        include: [resolve('/')]
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: 'html-loader'
          },
          {
            loader: 'markdown-loader',
            options: {}
          }
        ]
      },
      {
        test: /\.(ejs|js)$/,
        loader: 'ejs-loader',
        query: {
          variable: 'data',
          interpolate: '\\{\\{(.+?)\\}\\}',
          evaluate: '\\[\\[(.+?)\\]\\]'
        }
      }
    ]
  },
  plugins: [
    // ProvidePlugin的机制是：当webpack加载到某个js模块里，出现了未定义且名称符合
    // （字符串完全匹配）配置中key的变量时，会自动require配置中value所指定的js模块
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   },
    //   output: {
    //     comments: false,
    //     beautify: false
    //   },
    //   sourceMap: false
    // }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../app/public'),
        to: 'static',
        ignore: ['.*']
      }
    ]),
    new CleanWebpackPlugin('dist')
  ]
};
