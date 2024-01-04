const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressPlugin = require('progress-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');
const EslintWebpackPlugin = require('eslint-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const { argv } = require('process');

const projectEntry = process.env.PROJECT;
const projectName = projectEntry && projectEntry.split('/')[1];

const processEnv = process.env.NODE_ENV;
console.log(projectName, 'projectName', process.env.PROJECT);

// 环境变量配置
const envConfigPath = {
  dev: path.resolve(__dirname, '.env/.env.dev'), // 开发环境配置
  // test: path.resolve(__dirname, './env/.env.test'), // 测试环境配置
  // prod: path.resolve(__dirname, './env/.env.prod'), // 正式环境配置
};

module.exports = {
  // target: 'web',
  entry: projectEntry ? `./src/${projectEntry}/index.ts` : './src/index.js',
  mode: 'development',
  devServer: {
    static: './dist',
    // compress: true,
    hot: true,
    liveReload: false,
    open: true,
    port: 8686,
    onListening: (devServer) => {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }
    },
  },
  // devtool: 'sourcemap',
  mode: 'none',
  // optimization: {
  //   minimize: true,
  //   minimizer: [new TerserPlugin()],
  // },
  output: {
    // filename: '[name].[contenthash].bundle.js',
    // chunkFilename: (pathData) => {
    //   return pathData.chunk.name === 'main' ? '[name].js' : '[name]/[name].js';
    // },
    path: path.resolve(__dirname, `dist/${projectEntry ? projectEntry : '/'}`),
    // library: {
    //   name: `${projectName}`,
    //   type: 'umd',
    //   // umdNamedDefine: true,
    // },
    library: `${projectEntry ? projectName : 'index'}`,
    libraryTarget: 'umd', // 打包方式
    libraryExport: 'default', // 增加这个属性
    // globalObject: 'window', // 全局对象
    clean: true,
    // asyncChunks: false,
    // environment: {
    //   arrowFunction: false,
    //   const: false,
    //   destructuring: false,
    //   optionalChaining: false,
    //   globalThis: false,
    //   templateLiteral: false,
    // }
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension...
    extensions: ['.ts', '.js'],
  },
  module: {
    generator: {
      asset: {
        // publicPath: 'assets/',
        filename: 'images/[name][ext]',
      },
    },
    rules: [
      {
        test: /\.(png|jpg)$/i,
        type: 'asset/resource',
      },

      {
        test: /\.(?:js|mjs|cjs|es|umd)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env']],
          },
        },
        // include:/node-modules/,
        exclude: /node-modules/, // 要排除的文件
      },
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env']],
            },
          },
          { loader: 'ts-loader' },
        ],
        exclude: /node-modules/, // 要排除的文件
        // include: /node-modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '管理输出',
      template: './index.html',
    }),
    new ProgressPlugin(true),
    new EslintWebpackPlugin(),
    new Dotenv({
      path: envConfigPath[processEnv],
    }),
    // new BundleAnalyzerPlugin(),
  ],
};
