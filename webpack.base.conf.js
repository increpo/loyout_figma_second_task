const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtactPlugin = require('mini-css-extract-plugin')

const PATHS = {
	src: path.join(__dirname, './src'),
	dist: path.join(__dirname, './dist'),
	assets: 'assets'
}

module.exports = {
	externals: {
		paths: PATHS
	},
	entry: {
		main: PATHS.src
	},
	output: {
		filename: `${PATHS.assets}/js/[name].js`,
		path: PATHS.dist,
		publicPath: '/'
	},
	optimization: {
		splitChunks: {
			chunks: 'all'
		}
	},
	plugins: [
		new HTMLWebpackPlugin({
			hash: false,
			template: `${PATHS.src}/index.html`,
			filename: './index.html'
		}),
		new MiniCssExtactPlugin({
			filename: `${PATHS.assets}/css/[name].css`
		}),
		new CopyWebpackPlugin({
			patterns: [{
				from: `${PATHS.src}/img`,
				to: `${PATHS.assets}/img`
				},
			],
		}),
		new CleanWebpackPlugin()
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				use: ['babel-loader'],
				exclude: '/node_modules/'
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					MiniCssExtactPlugin.loader,
					{
						loader: 'css-loader',
						options: { sourceMap: true }
					},
					{
						loader: 'postcss-loader',
						options: { sourceMap: true, config: {path: 'src/js/postcss.config.js' } }
					}
				]
			},
			{
				test: /\.scss$/,
				use: [
					'style-loader',
					MiniCssExtactPlugin.loader,
					{
						loader: 'css-loader',
						options: { sourceMap: true }
					},
					{
						loader: 'sass-loader',
						options: { sourceMap: true }
					}
				]
			},
			{
				test: /\.(png|jpg|svg|gif)$/,
				use: [
					{
					loader: 'file-loader',
					options: {name: '[name].[ext]'}
				}]
			},
			{
				test: /\.(ttf|woff|woff2|eot)$/,
				use: ['file-loader']
			},
			{
				test: /\.xml$/,
				use: ['xml-loader']
			},
			{
				test: /\.csv$/,
				use: ['csv-loader']
			}
		]
	}
}
