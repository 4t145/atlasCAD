const path = require('path');
// webpack.config.js
module.exports = {
    mode: 'development',
    entry: {
        // 'app': path.resolve(__dirname, 'app') + '/scripts/app.js',
        'app': path.resolve(__dirname)+'/src/app.ts'
    },
    output: {
        filename: '[name].bundle.js'
    },
    resolve: {
        modules: [
            path.resolve(__dirname)
        ],
        extensions: ['.ts']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader'
            }
        ]
    }
}