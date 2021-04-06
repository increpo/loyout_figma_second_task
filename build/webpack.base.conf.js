const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtactPlugin = require('mini-css-extract-plugin')
const {VueLoaderPlugin} = require('vue-loader')

//const isDev = process.env.NODE_ENV === 'development'

const PATHS = {
	src: path.join(__dirname, '../src'),
	dist: path.join(__dirname, '../dist'),
	assets: 'assets'
}

const PAGES_DIR = `${PATHS.src}/pug/pages`
const fs = require("fs")
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'))

//const PAGES = fs
//  .readdirSync(PAGES_DIR)
//  .filter(fileName => fileName.endsWith(".html"));

module.exports = {
	externals: {
		paths: PATHS
	},
	entry: {
		main: ['@babel/polyfill', `${PATHS.src}`],
//		formElements: ['@babel/polyfill', `${PATHS.src}/js/pages/formElements.js`]
	},
	output: {
		filename: `${PATHS.assets}/js/[name].[hash].js`,
		path: PATHS.dist,
		publicPath: '/'
	},
	plugins: [
//		new HTMLWebpackPlugin({
//			template: `${PATHS.src}/index.html`,
//			filename: './index.html'
//		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: `${PATHS.src}/assets/img`,
					to: `${PATHS.assets}/img`
				},
				{
					from: `${PATHS.src}/assets/fonts`,
					to: `${PATHS.assets}/fonts`
				},
			],
		}),
		new VueLoaderPlugin(),
		new CleanWebpackPlugin(),
		// new webpack.ProvidePlugin({
		// 	$: 'jquery',
		// 	jQuery: 'jquery'
		// }),
		// new webpack.ProvidePlugin({
		// 	$: "jquery/dist/jquery.min.js",
		// 	jQuery: "jquery/dist/jquery.min.js",
		// 	"window.jQuery": "jquery/dist/jquery.min.js"
		// }),
		...PAGES.map(page => new HTMLWebpackPlugin({
			template: `${PAGES_DIR}/${page}`, //.pug
			filename: `./${page.replace(/\.pug/,'.html')}`, //.html
//			chunks: `${PAGES_DIR}/js/pages/${page}.js`,
		}))
//		new HTMLWebpackPlugin({
//			template: './src/pug/index.pug',
//			filename: './index.html',
//		})
	],
	module: {
		rules: [
			{
				test: /\.m?js$/,
				use: [
					{
						loader:'babel-loader',
						options: {
							presets: [
								'@babel/preset-env'
							]
						}
					}],
				exclude: /(node_modules|bower_components)/
			},
			{
				test: /\.pug$/,
				use: ['pug-loader']
			},
			{
				test: /\.vue$/,
				use: [
					{
						loader: 'vue-loader',
						options: {
							loader: {
								scss: 'vue-style-loader!css-loader!sass-loader'
							}
						}
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
				test: /\.(ttf|woff(2)?|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
					loader: 'file-loader',
					options: {name: '[name].[ext]'}
				}]
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
	},
	resolve: {
		alias: {
			'~': 'src',
			'vue$': 'vue/dist/vue.js'
		}
	}
}
