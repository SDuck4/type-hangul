const path = require('path');

module.exports = {
    target: 'web',
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: 'type-hangul.js',
        path: path.resolve(__dirname, 'dist'),
    },
};
