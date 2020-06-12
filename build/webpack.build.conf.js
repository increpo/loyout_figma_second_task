const MiniCssExtactPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetWebpaskPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

const cssLoaders = extra => {
  const loaders = [
    'style-loader',
    {
      loader: MiniCssExtactPlugin.loader,
      options: {
        hmr: false,
        reloadAll: true
      }
    },
    {
      loader: 'css-loader',
      options: { sourceMap: true }
    },
    {
      loader: 'postcss-loader',
      options: { sourceMap: true, config: {path: './build/postcss.config.js' } }
    }
  ]
  if (extra) {
    loaders.push(extra)
  }
  return loaders
}

const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const buildWebpackConfig = merge(baseWebpackConfig,
  {
    mode: 'production',
    optimization: {
      minimizer: [
        new OptimizeCssAssetWebpaskPlugin(),
        new TerserWebpackPlugin()
      ],
      splitChunks: {
        cacheGroups: {
          vendors: {
            name: 'vendors',
            test: /node_modules/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    },
    plugins: [
      new MiniCssExtactPlugin({
        filename: `${baseWebpackConfig.externals.paths.assets}/css/[name].[hash].css`
      })
    ],
    module: {
  		rules: [
  			{
  				test: /\.css$/,
  				use: cssLoaders()
  			},
  			{
  				test: /\.(scss|sass)$/,
  				use: cssLoaders(extra='sass-loader')
  			}
      ]
    }
  })

module.exports = new Promise((resolve, reject) => {
  resolve(buildWebpackConfig)
})
