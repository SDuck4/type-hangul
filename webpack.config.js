const path = require("path");
const webpack = require("webpack");
const package = require("./package.json");

const banner = `type-hangul v${package.version}
https://github.com/SDuck4/type-hangul

MIT License
Copyright (c) 2020 Chae SeungWoo`;

const defaultConfig = {
	mode: "production",
	entry: "./src/index.ts",
	target: "web",
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: "ts-loader",
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: [".ts"]
	},
	output: {
		filename: "type-hangul.min.js",
		path: path.resolve(__dirname, "bin")
	},
	externals: {
		"hangul-js": "Hangul"
	},
	plugins: [new webpack.BannerPlugin(banner)],
	devtool: "source-map"
};

const bundleConfig = {
	...defaultConfig,
	output: {
		filename: "type-hangul.bundle.js",
		path: path.resolve(__dirname, "bin")
	},
	externals: []
};

module.exports = [defaultConfig, bundleConfig];
