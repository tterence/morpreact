import { resolve } from 'path';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import Hwp from 'html-webpack-plugin';
import { DefinePlugin } from 'webpack';

// Webpack Common Configuration

export const entry = { app: './src/client/index.js'};
export const output = {
    filename: '[name].bundle.js',
    chunkFilename: '[name].js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/'
};
export const module = {
    rules: [
        {
            test: /\.js$/,
            include: resolve(__dirname, 'src/client'),
            loader: 'babel-loader'
        },
        {
            test: /\.(png|svg|jpg|gif)$/,
            include: resolve(__dirname, 'assets'),
            loader: 'file-loader',
            options: {
                publicPath: 'assets'
            }
        }
    ]
};
export const plugins = [
    new CleanWebpackPlugin(),
    new Hwp({
        template: 'assets/template.html',
        favicon: 'assets/logo.ico',
        title,
        domain: serverEnv.domain,
        meta: {
            'theme-color': theme,
            description
        },
        manifest: 'manifest.json'
    }),
    new DefinePlugin({ 'serverEnv': JSON.stringify(serverEnv) })
];
export const resolve = {
    alias: {
        '~': process.cwd(),
        '§': `${process.cwd()}/src/client`
    }
}
