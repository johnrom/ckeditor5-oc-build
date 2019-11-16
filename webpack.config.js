/* eslint-env node */
const path = require("path");
const { styles } = require("@ckeditor/ckeditor5-dev-utils");
const CKEditorWebpackPlugin = require("@ckeditor/ckeditor5-dev-webpack-plugin");

module.exports = {
	devtool: "source-map",
	performance: { hints: false },

	entry: path.resolve(__dirname, "src", "ckeditor.js"),

	output: {
		// The name under which the editor will be exported.f
		library: "OrchardCoreEditor",

		path: path.resolve(__dirname, "build"),
		filename: "ckeditor.js",
		libraryTarget: "umd",
		libraryExport: "default"
	},

	externals: {
		jquery: "jQuery"
	},

	plugins: [
		new CKEditorWebpackPlugin({
			language: "en"
		})
	],

	module: {
		rules: [
			{
				test: /\.svg$/,
				use: ["raw-loader"]
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: "style-loader",
						options: {
							injectType: "singletonStyleTag"
						}
					},
					{
						loader: "postcss-loader",
						options: styles.getPostCssConfig({
							themeImporter: {
								themePath: require.resolve(
									"@ckeditor/ckeditor5-theme-lark"
								)
							},
							minify: true
						})
					}
				]
			}
		]
	}
};
