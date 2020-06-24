const path = require('path');
const webpack = require('webpack');
const package = require('./package.json');

const banner = `type-hangul v${package.version}
https://github.com/SDuck4/type-hangul

MIT License
Copyright (c) 2020 Chae SeungWoo`;

const defaultConfig = {
    mode: 'production',
    entry: './src/index.js',
    target: 'web',
    output: {
        filename: 'type-hangul.min.js',
        path: path.resolve(__dirname, 'dist'),
    },
    externals: {
        'hangul-js': 'Hangul',
    },
    plugins: [
        new webpack.BannerPlugin(banner),
    ],
};

const bundleConfig = {
    ...defaultConfig,
    output: {
        filename: 'type-hangul.bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    externals: [],
};

module.exports = [
    defaultConfig,
    bundleConfig,
];
