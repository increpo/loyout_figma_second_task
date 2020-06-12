const MiniCssExtactPlugin = require('mini-css-extract-plugin')

const cssLoaders = extra => {
  const loaders = [
    'style-loader',
    {
      loader: MiniCssExtactPlugin.loader,
      options: {
        hmr: true,
        reloadAll: true
      }
    },
    {
      loader: 'css-loader',
      options: { sourceMap: true }
    }
  ]
  if (extra) {
    loaders.push(extra)
  }
  return loaders
}

const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const devWebpackConfig = merge(baseWebpackConfig,
  {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
      contentBase: baseWebpackConfig.externals.paths.dist,
      port: 8081,
  		overlay: {
          warnings: true,
          errors: true
      }
  	},
    optimization: {
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
      new webpack.SourceMapDevToolPlugin({
        filename: '[file].map'
      }),
      new MiniCssExtactPlugin({
        filename: `${baseWebpackConfig.externals.paths.assets}/css/[name].css`
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
        },
      ]
    }
  })

module.exports = new Promise((resolve, reject) => {
  resolve(devWebpackConfig)
})
