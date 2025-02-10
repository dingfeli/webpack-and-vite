const path = require('path');

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
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'commonjs2'
    },
};
