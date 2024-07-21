const path = require('path');

module.exports = {
  entry: './js/main.js', // 你的入口文件
  output: {
    filename: 'bundle.js', // 输出文件名
    path: path.resolve(__dirname, 'dist'), // 输出路径
  },
  module: {
    rules: [
      {
        test: /\.js$/, // 匹配.js文件
        exclude: /node_modules/, // 排除node_modules目录
        use: {
          loader: 'babel-loader', // 使用babel-loader
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js'], // 自动解析确定的扩展名
  },
};
