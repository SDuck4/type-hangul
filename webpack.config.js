const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: 'type-hangul.js',
        path: path.resolve(__dirname, 'dist'),
    },
    target: 'web',
};
