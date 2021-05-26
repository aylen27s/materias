const {VueLoaderPlugin}= require('vue-loader')
module.exports = {
	entry : './app/index.js', 
	output:{
		path: __dirname + '/public',
		filename:'transform.js'
	},
	module: {
		rules:[
			{
				test:/\.js$/,
				exclude:/node_modules/,
				use:{
					loader:'babel-loader'
				}
			},
			{
				test:/\.vue$/,
				loader:'vue-loader'
			}
		]
	},
	plugins:[
		new VueLoaderPlugin()
	]
}