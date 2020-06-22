const path = require('path');
const webpack = require('webpack');

const banner = `type-hangul
https://github.com/SDuck4/type-hangul

MIT License
Copyright (c) 2020 Chae SeungWoo`;

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: 'type-hangul.js',
        path: path.resolve(__dirname, 'dist'),
    },
    target: 'web',
    plugins: [
        new webpack.BannerPlugin(banner),
    ],
};
