const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    target: 'node',
    mode: 'development',
    entry: './src/main.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /[\\/]node_modules[\\/]vite-project[\\/]dist[\\/]some_file$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name]',
                        outputPath: 'assets/'
                    }
                }
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    externals: [
        // Exclude .node files from being processed by webpack
        function({ context, request }, callback) {
            if (/\.node$/.test(request)) {
                return callback(null, 'commonjs ' + request);
            }
            callback();
        }
    ],
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: 'node_modules/vite-project/dist/hello.node',
                    to: 'hello.node'
                }
            ]
        })
    ],
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'commonjs2'
    },
};
